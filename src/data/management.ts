// Auto-ported from aria-project-console.html
// Management Summary + cross-view reference data (categories, cash-flow runway,
// partner/CP breakdowns, milestone splits, construction block status).
//
// NOTE: All figures below have been intentionally blanked (zeroed / emptied) pending a
// full data reset. Row-identity fields used as React keys or grouping labels (name,
// block, cat, stage, label, m) are preserved so tables and charts keep rendering
// correctly; only the associated numbers/amounts have been cleared.

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
  { name: "OTP", flats: 0, sft: 0, aos: 0, recv: 0, due: 0, dueRecv: 0, dueOut: 0, exec: 0, pend: 0 },
  { name: "OTP-Others", flats: 0, sft: 0, aos: 0, recv: 0, due: 0, dueRecv: 0, dueOut: 0, exec: 0, pend: 0 },
  { name: "EOI", flats: 0, sft: 0, aos: 0, recv: 0, due: 0, dueRecv: 0, dueOut: 0, exec: 0, pend: 0 },
  { name: "After EOI", flats: 0, sft: 0, aos: 0, recv: 0, due: 0, dueRecv: 0, dueOut: 0, exec: 0, pend: 0 },
  { name: "MGT", flats: 0, sft: 0, aos: 0, recv: 0, due: 0, dueRecv: 0, dueOut: 0, exec: 0, pend: 0 },
]

export const catTotal = {
  flats: 0,
  sft: 0,
  aos: 0,
  recv: 0,
  due: 0,
  dueRecv: 0,
  dueOut: 0,
  exec: 0,
  pend: 0,
}

export interface RunwayPoint {
  m: string
  closing: number
}

export const runway: RunwayPoint[] = [
  { m: "Feb-26", closing: 0 }, { m: "Mar-26", closing: 0 }, { m: "Apr-26", closing: 0 },
  { m: "May-26", closing: 0 }, { m: "Jun-26", closing: 0 }, { m: "Jul-26", closing: 0 },
  { m: "Aug-26", closing: 0 }, { m: "Sep-26", closing: 0 }, { m: "Oct-26", closing: 0 },
  { m: "Nov-26", closing: 0 }, { m: "Dec-26", closing: 0 }, { m: "Jan-27", closing: 0 },
  { m: "Feb-27", closing: 0 }, { m: "Mar-27", closing: 0 }, { m: "Apr-27", closing: 0 },
  { m: "May-27", closing: 0 }, { m: "Jun-27", closing: 0 }, { m: "Jul-27", closing: 0 },
  { m: "Aug-27", closing: 0 }, { m: "Sep-27", closing: 0 }, { m: "Oct-27", closing: 0 },
  { m: "Nov-27", closing: 0 }, { m: "Dec-27", closing: 0 }, { m: "Jan-28", closing: 0 },
  { m: "Feb-28", closing: 0 }, { m: "Mar-28", closing: 0 }, { m: "Apr-28", closing: 0 },
  { m: "May-28", closing: 0 }, { m: "Jun-28", closing: 0 }, { m: "Jul-28", closing: 0 },
  { m: "Aug-28", closing: 0 }, { m: "Sep-28", closing: 0 }, { m: "Oct-28", closing: 0 },
  { m: "Nov-28", closing: 0 }, { m: "Dec-28", closing: 0 }, { m: "Jan-29", closing: 0 },
  { m: "Feb-29", closing: 0 }, { m: "Mar-29", closing: 0 }, { m: "Apr-29", closing: 0 },
  { m: "May-29", closing: 0 }, { m: "Jun-29", closing: 0 }, { m: "Jul-29", closing: 0 },
  { m: "Aug-29", closing: 0 }, { m: "Sep-29", closing: 0 }, { m: "Oct-29", closing: 0 },
  { m: "Nov-29", closing: 0 }, { m: "Dec-29", closing: 0 }, { m: "Jan-30", closing: 0 },
  { m: "Feb-30", closing: 0 }, { m: "Mar-30", closing: 0 }, { m: "Apr-30", closing: 0 },
  { m: "May-30", closing: 0 }, { m: "Jun-30", closing: 0 }, { m: "Jul-30", closing: 0 },
  { m: "Aug-30", closing: 0 }, { m: "Sep-30", closing: 0 }, { m: "Oct-30", closing: 0 },
  { m: "Nov-30", closing: 0 }, { m: "Dec-30", closing: 0 },
]

export const issues: string[] = []

export interface Partner {
  name: string
  units: number
  sft: number
  reg: number
  mgt: number
}

export const partners: Partner[] = [
  { name: "Mirana", units: 0, sft: 0, reg: 0, mgt: 0 },
  { name: "Yula", units: 0, sft: 0, reg: 0, mgt: 0 },
  { name: "Prosper", units: 0, sft: 0, reg: 0, mgt: 0 },
  { name: "Saini", units: 0, sft: 0, reg: 0, mgt: 0 },
]

export interface ChannelPartner {
  name: string
  flats: number
  aos: number
  recv: number
}

export const cps: ChannelPartner[] = [
  { name: "Gennxt Realty", flats: 0, aos: 0, recv: 0 },
  { name: "Gangaji Pavan Kumar", flats: 0, aos: 0, recv: 0 },
  { name: "Yellow Yards Technologies LLP", flats: 0, aos: 0, recv: 0 },
  { name: "Prop Mission Private Limited", flats: 0, aos: 0, recv: 0 },
  { name: "Nagam Neeraja", flats: 0, aos: 0, recv: 0 },
  { name: "Nookala Sravan Kumar", flats: 0, aos: 0, recv: 0 },
  { name: "Jangili Ramya Sree", flats: 0, aos: 0, recv: 0 },
  { name: "Navigate Home Private Limited", flats: 0, aos: 0, recv: 0 },
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
  { cat: "EOI — Below milestone block", flats: 0, sft: 0, aos: 0, recv: 0, dueOut: 0 },
  { cat: "EOI — Above milestone block", flats: 0, sft: 0, aos: 0, recv: 0, dueOut: 0 },
  { cat: "After EOI — Below milestone block", flats: 0, sft: 0, aos: 0, recv: 0, dueOut: 0 },
  { cat: "After EOI — Above milestone block", flats: 0, sft: 0, aos: 0, recv: 0, dueOut: 0 },
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
  { block: "A", stage: 0, next: "", nextDate: "", due: 0, overdue: false },
  { block: "B", stage: 0, next: "", nextDate: "", due: 0, overdue: false },
  { block: "C", stage: 0, next: "", nextDate: "", due: 0, overdue: false },
  { block: "D", stage: 0, next: "", nextDate: "", due: 0, overdue: false },
  { block: "E", stage: 0, next: "", nextDate: "", due: 0, overdue: false },
  { block: "F", stage: 0, next: "", nextDate: "", due: 0, overdue: false },
  { block: "G", stage: 0, next: "", nextDate: "", due: 0, overdue: false },
]

export const stageNodes: string[] = [
  "Foundation", "2nd Basement", "Podium", "Transfer Slab", "Superstructure", "Finishing", "Registration",
]

export interface StageDue {
  stage: string
  amt: number
}

export const stageDue: StageDue[] = [
  { stage: "Within 21 Days of Booking (20% call)", amt: 0 },
  { stage: "On Commencement of Foundation (8% call)", amt: 0 },
  { stage: "On Commencement of 2nd Basement (8% call)", amt: 0 },
  { stage: "OTP / MGT / OTP-Others — full balance due", amt: 0 },
]

export interface OtherFinanceItem {
  label: string
  amount: string
  warning?: boolean
}

export const otherFinanceItems: OtherFinanceItem[] = [
  { label: "Excess amount received (to be adjusted)", amount: "—" },
  { label: "Commission payable balance (175 CP deals)", amount: "—" },
  { label: "Cancellation / refund balance (137 cases)", amount: "—" },
  { label: "Unreconciled bank receipts (Suspense)", amount: "—" },
  { label: "Registration charges receivable (MGT)", amount: "—" },
]

export const managementKpis = {
  aosValue: 0,
  received: 0,
  receivedPctOfAos: 0,
  futureReceivable: 0,
  dueOutstanding: 0,
  calledTotal: 0,
  executed: 0,
  totalBooked: 0,
  executedPct: 0,
  inventorySoldPct: 0,
  builderUnits: 0,
}

export const cashFlowDeficit = {
  firstDeficitMonth: "",
  monthsFromNow: 0,
  troughAmount: 0,
  troughMonth: "",
}

export const crmSalesKpis = {
  avgRealisationPerSft: 0,
  cpSourcedBookings: 0,
  cpSourcedPct: 0,
  cancellations: 0,
  reBooked: 0,
  reBookedPct: 0,
  activePartners: 0,
}

export const engineeringKpis = {
  totalSalableSft: 0,
  totalUnits: 0,
  totalBlocks: 0,
  builderSharePct: 0,
  builderShareUnits: 0,
  builderShareOf: 0,
  blocksUnderConstruction: 0,
  blocksUnderConstructionOf: 0,
  activeBlocksLabel: "",
  totalBalanceReceivable: 0,
  milestoneDueNow: 0,
}

export const inventory = {
  totalSalableSft: 0,
  builderShareSft: 0,
  builderSharePctOfTotal: 0,
  soldSft: 0,
  soldPctOfBuilder: 0,
  balanceSft: 0,
  balancePctOfBuilder: 0,
  landownerShareLabel: "",
}

export const engineeringDelayCallout = {
  block: "",
  originalDate: "",
  currentDate: "",
  delayDays: 0,
}
