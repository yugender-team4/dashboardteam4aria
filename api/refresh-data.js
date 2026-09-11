// /api/refresh-data — pulls live data from the ARIA SharePoint workbooks via
// Microsoft Graph (client-credentials / app-only auth) and returns it in the
// exact shape the dashboard's client-side JS expects, so the page can
// re-render without a rebuild/redeploy.
//
// Required Vercel environment variables:
//   AZURE_TENANT_ID
//   AZURE_CLIENT_ID
//   AZURE_CLIENT_SECRET
//   ARIA_DRIVE_ID            e.g. b!5cEu-D--b0e-6JgXIzoX4dI-BhU3S0JLq3kvY_RbDbvJI-mjxRadRI5am_EsajwL
//   ARIA_BOOKINGS_ITEM_ID    e.g. 4F224234-6C48-449E-8ABC-4EAAE3FF8C80   (Flat Bookings workbook)
//   ARIA_INFLOW_ITEM_ID      e.g. CF15EAE3-0340-464B-9C59-B4EAAE6DAE1E  (Inflow workbook)

const GRAPH = 'https://graph.microsoft.com/v1.0';

async function getAccessToken() {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;
  if (!tenantId || !clientId || !clientSecret) {
    throw httpError(500, 'missing_config', 'AZURE_TENANT_ID / AZURE_CLIENT_ID / AZURE_CLIENT_SECRET are not set in Vercel env vars.');
  }
  const resp = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials'
    })
  });
  const json = await resp.json();
  if (!resp.ok) throw httpError(502, 'auth_failed', json.error_description || JSON.stringify(json));
  return json.access_token;
}

function httpError(status, code, message) {
  const e = new Error(message);
  e.status = status;
  e.code = code;
  return e;
}

async function graphRange(token, driveId, itemId, sheet, address) {
  const url = `${GRAPH}/drives/${encodeURIComponent(driveId)}/items/${encodeURIComponent(itemId)}/workbook/worksheets('${encodeURIComponent(sheet)}')/range(address='${address}')?$select=address,values,text`;
  const resp = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const json = await resp.json();
  if (!resp.ok) throw httpError(502, 'graph_error', `${sheet}!${address}: ${json.error && json.error.message ? json.error.message : JSON.stringify(json)}`);
  return json; // { values: [[...]], text: [[...]], ... }
}

function num(v) {
  if (v === '' || v === null || v === undefined) return 0;
  const n = Number(v);
  return isNaN(n) ? 0 : n;
}

function str(v) {
  if (v === null || v === undefined) return '';
  // Graph returns a numeric 0 (not '' or null) for blank cells in some
  // text-ish columns (e.g. CP Name) depending on the cell's number format.
  // None of the text fields we read (Block, Flat No, Category, Name,
  // CP Name, Remarks, month labels) are ever legitimately "0", so treat a
  // bare numeric zero as blank rather than showing the literal text "0".
  if (typeof v === 'number' && v === 0) return '';
  return String(v).trim();
}

// Excel serial date -> "05-Jun-26" (matches the format already baked into the dashboard)
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtDate(cellValue, cellText) {
  let d = null;
  if (typeof cellValue === 'number' && cellValue > 0) {
    // Excel serial date (days since 1899-12-30)
    d = new Date(Date.UTC(1899, 11, 30) + cellValue * 86400000);
  } else if (cellText) {
    const m = String(cellText).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/); // M/D/YYYY as displayed
    if (m) d = new Date(Date.UTC(+m[3], +m[1] - 1, +m[2]));
  }
  if (!d || isNaN(d.getTime())) return '';
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const mon = MONTHS[d.getUTCMonth()];
  const yy = String(d.getUTCFullYear()).slice(-2);
  return `${dd}-${mon}-${yy}`;
}

/*
 * AOS Tracker row derivation — reverse-engineered from the Statement sheet
 * and validated against all 811 previously-baked rows with zero mismatches:
 *
 *   stage   = 2 (Executed)               if column M (AOS Status) is set
 *           = 1 (Pending MGT Signature)  else if column W (AOS Status - Not
 *                                             Signed by MGT) is set
 *           = 0 (Not Prepared)           otherwise
 *   priority (‘needs attention’) = 1     if stage < 2 AND % received >= 0.20
 *                                 = 0     otherwise (incl. always 0 once Executed)
 *
 * Range fetched: Statement!B6:AN818 (columns B..AN, rows 6..818 — the same
 * range every SUMIFS/COUNTIF formula in the workbook itself uses).
 * Column offsets below are relative to B (index 0).
 */
const COL = {
  BLOCK: 0,        // B
  FLATNO: 1,        // C
  CATEGORY: 4,       // F
  AOS_STATUS: 11,      // M
  NAME: 12,      // N
  DATE: 13,      // O
  AOS_VALUE: 14,      // P
  RECEIVED: 15,      // Q
  PCT: 16,      // R
  CP_NAME: 18,      // T
  SIGNED_MGT: 20,      // V
  NOT_SIGNED_MGT: 21, // W
  REMARKS: 36,      // AL
  REMARKS2: 37       // AM
};

function buildAosData(range) {
  const values = range.values || [];
  const texts = range.text || [];
  const out = [];
  for (let i = 0; i < values.length; i++) {
    const row = values[i];
    const txtRow = texts[i] || [];
    const flatNo = str(row[COL.FLATNO]);
    if (!flatNo) continue; // skip blank/trailer rows

    const executed = row[COL.AOS_STATUS] || row[COL.SIGNED_MGT];
    const pending = row[COL.NOT_SIGNED_MGT];
    const stage = executed ? 2 : (pending ? 1 : 0);
    const pct = num(row[COL.PCT]);
    const priority = (stage < 2 && pct >= 0.20) ? 1 : 0;

    const remarks = str(row[COL.REMARKS]);
    const remarks2 = str(row[COL.REMARKS2]);
    const notes = [remarks, remarks2].filter(Boolean).join(' / ');

    out.push([
      str(row[COL.BLOCK]),
      flatNo,
      str(row[COL.CATEGORY]),
      str(row[COL.NAME]),
      fmtDate(row[COL.DATE], txtRow[COL.DATE]),
      num(row[COL.AOS_VALUE]),
      num(row[COL.RECEIVED]),
      Math.round(pct * 100) / 100,
      str(row[COL.CP_NAME]),
      stage,
      priority,
      notes
    ]);
  }
  return out;
}

/*
 * Inflow & Outflow (FLOW_DATA) — read directly from the Inflow workbook's
 * own computed cells (Summary!A4:J62). Every figure here is Excel's own
 * formula output, so there is no re-derivation risk except two small,
 * verified conventions:
 *   outflow = opening + totalInflow - closing   (keeps the running balance
 *             consistent regardless of which of Budget/Actual/Other-outflow
 *             columns is populated for that row — verified against all
 *             previously-baked rows)
 *   net     = closing - opening
 *   actual  = 1 for the first 7 rows (Feb-26..Aug-26), which is where the
 *             sheet's own formulas switch from "actual outflow" columns to
 *             a pure projection formula (Summary!J11 changes from
 *             "=F11-I11" to "=F11-G11") — a fixed structural fact about
 *             this workbook, not a moving "today" comparison.
 *
 * Column H ("Actual Outflow related to Budget") is fetched but, as of
 * Sep-2026, is genuinely blank for every row in the live workbook — it
 * never appears in any of the sheet's own Closing Balance formulas either.
 * It's still read here (rather than silently dropped) so that the moment
 * someone populates it in SharePoint, it starts flowing through without a
 * code change.
 */
function buildFlowData(range) {
  const values = range.values || [];
  const texts = range.text || [];
  const out = [];
  let idx = 0;
  for (let r = 0; r < values.length; r++) {
    const row = values[r];
    const txtRow = texts[r] || [];
    // The Month column is a real date cell formatted as "Mmm-yy" in Excel;
    // range.values returns its raw serial number, so prefer the displayed
    // text (range.text) and only fall back to the raw value if text is
    // unavailable for some reason.
    const month = str(txtRow[0]) || str(row[0]);
    if (!month) continue;
    const opening = num(row[1]) / 1e7;   // paise->Cr not needed; values are already ₹, convert to Cr
    const inflowExisting = num(row[2]) / 1e7;
    const inflowFuture = num(row[3]) / 1e7;
    const otherReceipts = num(row[4]) / 1e7;
    const totalInflow = num(row[5]) / 1e7;
    const budgetOutflow = num(row[6]) / 1e7;
    const actualOutflowBudget = num(row[7]) / 1e7; // Column H — blank/0 today, see note above
    const otherThanBudget = num(row[8]) / 1e7;
    const closing = num(row[9]) / 1e7;
    const outflow = opening + totalInflow - closing;
    const net = closing - opening;
    const actual = idx < 7 ? 1 : 0;
    out.push([
      month, round2(opening), round2(inflowExisting), round2(inflowFuture), round2(otherReceipts),
      round2(totalInflow), round2(budgetOutflow), round2(otherThanBudget), round2(outflow),
      round2(closing), round2(net), actual, idx, round2(actualOutflowBudget)
    ]);
    idx++;
  }
  return out;
}

function round2(n) { return Math.round(n * 100) / 100; }

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const driveId = process.env.ARIA_DRIVE_ID;
    const bookingsItemId = process.env.ARIA_BOOKINGS_ITEM_ID;
    const inflowItemId = process.env.ARIA_INFLOW_ITEM_ID;
    if (!driveId || !bookingsItemId || !inflowItemId) {
      throw httpError(500, 'missing_config', 'ARIA_DRIVE_ID / ARIA_BOOKINGS_ITEM_ID / ARIA_INFLOW_ITEM_ID are not set in Vercel env vars.');
    }

    const token = await getAccessToken();

    const [statementRange, summaryRange] = await Promise.all([
      graphRange(token, driveId, bookingsItemId, 'Statement', 'B6:AN818'),
      graphRange(token, driveId, inflowItemId, 'Summary', 'A4:J62')
    ]);

    const aosData = buildAosData(statementRange);
    const flowData = buildFlowData(summaryRange);

    res.status(200).json({
      ok: true,
      generatedAt: new Date().toISOString(),
      aosData,
      flowData
    });
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({
      ok: false,
      code: err.code || 'unknown_error',
      error: err.message || String(err)
    });
  }
}

// Exposed for local unit testing only (Vercel still uses the default export as the handler function).
export { buildAosData, buildFlowData, fmtDate };
