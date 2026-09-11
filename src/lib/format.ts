// Currency / number formatting helpers ported from aria-project-console.html

export function fmtInr(n: number): string {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr"
  if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + " L"
  return "₹" + n.toLocaleString("en-IN")
}

export function fmtInrOrDash(n: number): string {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr"
  if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + " L"
  if (!n) return "—"
  return "₹" + n.toLocaleString("en-IN")
}

export function fmtCr(n: number): string {
  const sign = n < 0 ? "−" : ""
  return sign + "₹" + Math.abs(n).toFixed(2) + " Cr"
}

export function pctLabel(p: number): string {
  return Math.round(p * 100) + "%"
}

export const MONTH_ABBR = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

// Sort key for "dd-Mon-yy" strings (used by Milestone Tracker due dates);
// empty/undefined sorts to the far future, matching the original dashboard.
export function mileDateSerial(s: string | undefined): number {
  if (!s) return 99999999
  const parts = s.split("-")
  const monthIdx = MONTH_ABBR.indexOf(parts[1])
  if (parts.length !== 3 || monthIdx === -1) return 99999999
  const d = new Date(2000 + parseInt(parts[2], 10), monthIdx, parseInt(parts[0], 10))
  return d.getTime()
}

export function parseAosDate(d: string | undefined): { month: number; year: number } | null {
  const parts = (d || "").split("-")
  if (parts.length !== 3) return null
  const mIdx = MONTH_ABBR.indexOf(parts[1])
  if (mIdx === -1) return null
  let yr = parseInt(parts[2], 10)
  yr = yr < 100 ? 2000 + yr : yr
  return { month: mIdx, year: yr }
}
