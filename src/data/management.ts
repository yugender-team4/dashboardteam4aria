// Auto-ported from aria-project-console.html
// Management Summary + cross-view reference data (categories, cash-flow runway,
// partner/CP breakdowns, milestone splits, construction block status).

export interface CategorySummary {
  name: string
  flats: number
  sft: number
  aos: number
  recv: number
  due: number
  dueRecv: number
  dueOut: number
  exec: number
  pend: number
}

export const categories: CategorySummary[] = [
  { name: "OTP", flats: 121, sft: 231030, aos: 108.79, recv: 107.14, due: 108.79, dueRecv: 107.14, dueOut: 1.65, exec: 82, pend: 39 },
  { name: "OTP-Others", flats: 13, sft: 23215, aos: 11.28, recv: 3.01, due: 11.28, dueRecv: 3.01, dueOut: 8.27, exec: 1, pend: 12 },
  { name: "EOI", flats: 355, sft: 673685, aos: 467.07, recv: 86.81, due: 141.68, dueRecv: 85.57, dueOut: 56.11, exec: 149, pend: 206 },
  { name: "After EOI", flats: 128, sft: 238100, aos: 176.13, recv: 27.03, due: 51.38, dueRecv: 26.53, dueOut: 24.84, exec: 28, pend: 100 },
  { name: "MGT", flats: 194, sft: 366860, aos: 168.87, recv: 139.48, due: 168.87, dueRecv: 139.48, dueOut: 29.4, exec: 12, pend: 182 },
]

export const catTotal = {
  flats: 811,
  sft: 1532890,
  aos: 932.15,
  recv: 363.47,
  due: 481.99,
  dueRecv: 361.73,
  dueOut: 120.26,
  exec: 272,
  pend: 539,
}

export interface RunwayPoint {
  m: string
  closing: number
}

export const runway: RunwayPoint[] = [
  { m: "Feb-26", closing: 19.37 }, { m: "Mar-26", closing: 39.22 }, { m: "Apr-26", closing: 80.43 },
  { m: "May-26", closing: 87.46 }, { m: "Jun-26", closing: 89.34 }, { m: "Jul-26", closing: 53.5 },
  { m: "Aug-26", closing: 61.42 }, { m: "Sep-26", closing: 196.04 }, { m: "Oct-26", closing: 206.82 },
  { m: "Nov-26", closing: 185.74 }, { m: "Dec-26", closing: 199.71 }, { m: "Jan-27", closing: 173.93 },
  { m: "Feb-27", closing: 168.2 }, { m: "Mar-27", closing: 141.71 }, { m: "Apr-27", closing: 170.29 },
  { m: "May-27", closing: 158.47 }, { m: "Jun-27", closing: 177.63 }, { m: "Jul-27", closing: 156.69 },
  { m: "Aug-27", closing: 191.08 }, { m: "Sep-27", closing: 174.59 }, { m: "Oct-27", closing: 175.81 },
  { m: "Nov-27", closing: 192.75 }, { m: "Dec-27", closing: 159.28 }, { m: "Jan-28", closing: 176.69 },
  { m: "Feb-28", closing: 151.43 }, { m: "Mar-28", closing: 125.44 }, { m: "Apr-28", closing: 121.54 },
  { m: "May-28", closing: 107.29 }, { m: "Jun-28", closing: 66.6 }, { m: "Jul-28", closing: 51.67 },
  { m: "Aug-28", closing: 34.95 }, { m: "Sep-28", closing: 10.41 }, { m: "Oct-28", closing: -9.43 },
  { m: "Nov-28", closing: -12.33 }, { m: "Dec-28", closing: 6.46 }, { m: "Jan-29", closing: 7.54 },
  { m: "Feb-29", closing: 21.11 }, { m: "Mar-29", closing: 28.56 }, { m: "Apr-29", closing: 15.96 },
  { m: "May-29", closing: 13.02 }, { m: "Jun-29", closing: -16.14 }, { m: "Jul-29", closing: -28.25 },
  { m: "Aug-29", closing: -37.92 }, { m: "Sep-29", closing: -60.12 }, { m: "Oct-29", closing: -83.66 },
  { m: "Nov-29", closing: -94.44 }, { m: "Dec-29", closing: -115.36 }, { m: "Jan-30", closing: -126.58 },
  { m: "Feb-30", closing: -132.8 }, { m: "Mar-30", closing: -144.73 }, { m: "Apr-30", closing: -154.99 },
  { m: "May-30", closing: -170.25 }, { m: "Jun-30", closing: -182.05 }, { m: "Jul-30", closing: -191.46 },
  { m: "Aug-30", closing: -189.97 }, { m: "Sep-30", closing: -185.14 }, { m: "Oct-30", closing: -177.01 },
  { m: "Nov-30", closing: -163.83 }, { m: "Dec-30", closing: -149.64 },
]

export const issues: string[] = [
  "Total builder SFT does not reconcile even after removing MGT (landowner) flats — under review with the estimation team.",
  "Average SFT per the finance workings does not match the figure used by the sales team.",
  "Sales team is forecasting bookings through Apr-2032, while project cost has only been estimated through Dec-2030 — planning horizons need to be aligned.",
  "Sales team reports 181 unsold units (−3,21,985 sft) versus the 1,607 units / 30,04,485 sft shown by the inventory workings — needs reconciliation.",
]

export interface Partner {
  name: string
  units: number
  sft: number
  reg: number
  mgt: number
}

export const partners: Partner[] = [
  { name: "Mirana", units: 46, sft: 89725, reg: 22, mgt: 35.18 },
  { name: "Yula", units: 51, sft: 93190, reg: 20, mgt: 36.34 },
  { name: "Prosper", units: 53, sft: 99055, reg: 4, mgt: 34.46 },
  { name: "Saini", units: 44, sft: 84890, reg: 27, mgt: 35.65 },
]

export interface ChannelPartner {
  name: string
  flats: number
  aos: number
  recv: number
}

export const cps: ChannelPartner[] = [
  { name: "Gennxt Realty", flats: 36, aos: 43.37, recv: 15.74 },
  { name: "Gangaji Pavan Kumar", flats: 7, aos: 8.52, recv: 4.22 },
  { name: "Yellow Yards Technologies LLP", flats: 9, aos: 7.51, recv: 5.45 },
  { name: "Prop Mission Private Limited", flats: 7, aos: 6.92, recv: 2.92 },
  { name: "Nagam Neeraja", flats: 4, aos: 5.43, recv: 1.25 },
  { name: "Nookala Sravan Kumar", flats: 3, aos: 4.5, recv: 1.05 },
  { name: "Jangili Ramya Sree", flats: 3, aos: 4.17, recv: 0.88 },
  { name: "Navigate Home Private Limited", flats: 6, aos: 4.1, recv: 3.19 },
]

export interface MilestoneSplit {
  cat: string
  flats: number
  sft: number
  aos: number
  recv: number
  dueOut: number
}

export const milestoneSplit: MilestoneSplit[] = [
  { cat: "EOI — Below milestone block", flats: 267, sft: 513010, aos: 355.03, recv: 63.16, dueOut: 56.1 },
  { cat: "EOI — Above milestone block", flats: 88, sft: 160675, aos: 112.04, recv: 23.65, dueOut: 0.004 },
  { cat: "After EOI — Below milestone block", flats: 99, sft: 185175, aos: 136.81, recv: 18.7, dueOut: 24.84 },
  { cat: "After EOI — Above milestone block", flats: 29, sft: 52925, aos: 39.33, recv: 8.33, dueOut: 0 },
]

export interface BlockStatus {
  block: string
  stage: number
  next: string
  nextDate: string
  due: number
  overdue: boolean
}

export const blocks: BlockStatus[] = [
  { block: "A", stage: 0, next: "Foundation", nextDate: "12-Dec-2027", due: 1.21, overdue: false },
  { block: "B", stage: 0, next: "Foundation", nextDate: "03-Sep-2027", due: 3.17, overdue: false },
  { block: "C", stage: 0, next: "Foundation", nextDate: "08-Sep-2027", due: 12.16, overdue: false },
  { block: "D", stage: 0, next: "Foundation", nextDate: "30-Sep-2026 (121d delayed)", due: 16.58, overdue: true },
  { block: "E", stage: 2, next: "Podium", nextDate: "20-Oct-2026", due: 38.64, overdue: false },
  { block: "F", stage: 2, next: "Podium", nextDate: "19-Sep-2026", due: 50.03, overdue: false },
  { block: "G", stage: 0, next: "Foundation", nextDate: "01-Nov-2026", due: 0.0, overdue: false },
]

export const stageNodes: string[] = [
  "Foundation", "2nd Basement", "Podium", "Transfer Slab", "Superstructure", "Finishing", "Registration",
]

export interface StageDue {
  stage: string
  amt: number
}

export const stageDue: StageDue[] = [
  { stage: "Within 21 Days of Booking (20% call)", amt: 28.49 },
  { stage: "On Commencement of Foundation (8% call)", amt: 23.19 },
  { stage: "On Commencement of 2nd Basement (8% call)", amt: 30.8 },
  { stage: "OTP / MGT / OTP-Others — full balance due", amt: 39.32 },
]

export interface OtherFinanceItem {
  label: string
  amount: string
  warning?: boolean
}

export const otherFinanceItems: OtherFinanceItem[] = [
  { label: "Excess amount received (to be adjusted)", amount: "₹1.74 Cr" },
  { label: "Commission payable balance (175 CP deals)", amount: "₹0.94 Cr" },
  { label: "Cancellation / refund balance (137 cases)", amount: "₹2.61 Cr" },
  { label: "Unreconciled bank receipts (Suspense)", amount: "₹0.75 Cr", warning: true },
  { label: "Registration charges receivable (MGT)", amount: "₹0.62 Cr" },
]

export const managementKpis = {
  aosValue: 932.15,
  received: 363.47,
  receivedPctOfAos: 39.0,
  futureReceivable: 568.68,
  dueOutstanding: 120.26,
  calledTotal: 481.99,
  executed: 272,
  totalBooked: 811,
  executedPct: 33.5,
  inventorySoldPct: 33.8,
  builderUnits: 2418,
}

export const cashFlowDeficit = {
  firstDeficitMonth: "Oct-2028",
  monthsFromNow: 25,
  troughAmount: -191,
  troughMonth: "mid-2030",
}

export const crmSalesKpis = {
  avgRealisationPerSft: 6081,
  cpSourcedBookings: 175,
  cpSourcedPct: 21.6,
  cancellations: 137,
  reBooked: 59,
  reBookedPct: 43,
  activePartners: 81,
}

export const engineeringKpis = {
  totalSalableSft: 5946110,
  totalUnits: 3100,
  totalBlocks: 7,
  builderSharePct: 33.8,
  builderShareUnits: 811,
  builderShareOf: 2418,
  blocksUnderConstruction: 2,
  blocksUnderConstructionOf: 7,
  activeBlocksLabel: "Blocks E & F active",
  totalBalanceReceivable: 566.24,
  milestoneDueNow: 121.79,
}

export const inventory = {
  totalSalableSft: 5946110,
  builderShareSft: 4537375,
  builderSharePctOfTotal: 76.3,
  soldSft: 1532890,
  soldPctOfBuilder: 25.8,
  balanceSft: 3004485,
  balancePctOfBuilder: 50.5,
  landownerShareLabel:
    "Landowner share: 8,21,065 sft (Sivaramaraju) + 5,87,670 sft (others) = 14,08,735 sft, excluded from builder salable.",
}

export const engineeringDelayCallout = {
  block: "D",
  originalDate: "01-Jun-2026",
  currentDate: "30-Sep-2026",
  delayDays: 121,
}
