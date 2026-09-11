// Auto-ported from aria-project-console.html (Inflow & Outflow / Cash flow)
// Row shape: [month, opening, inflowExisting, inflowFuture, otherReceipts, totalInflow, budgetOutflow, otherThanBudget, outflow, closing, net, actual, periodOrder, actualOutflowBudget]
//
// NOTE: All monetary columns have been intentionally blanked (zeroed) pending a full data
// reset. Month labels, the actual/projected flag, and period order are preserved (they are
// structural — not financial data) so charts and grouping logic keep working. Row count and
// tuple shape are preserved; live data will repopulate this via /api/refresh-data.
export type FlowRow = [
  string, // month (e.g. "Feb-26")
  number, // opening
  number, // inflowExisting
  number, // inflowFuture
  number, // otherReceipts
  number, // totalInflow
  number, // budgetOutflow
  number, // otherThanBudget
  number, // outflow
  number, // closing
  number, // net
  number, // actual (1 = actual, 0 = projected)
  number, // periodOrder
  number  // actualOutflowBudget (Actual Outflow related to Budget, col H of Summary sheet — currently blank/0 in the source workbook for every month; wired through so it starts showing the moment the sheet is populated)
]

export const FLOW_DATA: FlowRow[] = [
  ["Feb-26",0,0,0,0,0,0,0,0,0,0,1,0,0],
  ["Mar-26",0,0,0,0,0,0,0,0,0,0,1,1,0],
  ["Apr-26",0,0,0,0,0,0,0,0,0,0,1,2,0],
  ["May-26",0,0,0,0,0,0,0,0,0,0,1,3,0],
  ["Jun-26",0,0,0,0,0,0,0,0,0,0,1,4,0],
  ["Jul-26",0,0,0,0,0,0,0,0,0,0,1,5,0],
  ["Aug-26",0,0,0,0,0,0,0,0,0,0,1,6,0],
  ["Sep-26",0,0,0,0,0,0,0,0,0,0,0,7,0],
  ["Oct-26",0,0,0,0,0,0,0,0,0,0,0,8,0],
  ["Nov-26",0,0,0,0,0,0,0,0,0,0,0,9,0],
  ["Dec-26",0,0,0,0,0,0,0,0,0,0,0,10,0],
  ["Jan-27",0,0,0,0,0,0,0,0,0,0,0,11,0],
  ["Feb-27",0,0,0,0,0,0,0,0,0,0,0,12,0],
  ["Mar-27",0,0,0,0,0,0,0,0,0,0,0,13,0],
  ["Apr-27",0,0,0,0,0,0,0,0,0,0,0,14,0],
  ["May-27",0,0,0,0,0,0,0,0,0,0,0,15,0],
  ["Jun-27",0,0,0,0,0,0,0,0,0,0,0,16,0],
  ["Jul-27",0,0,0,0,0,0,0,0,0,0,0,17,0],
  ["Aug-27",0,0,0,0,0,0,0,0,0,0,0,18,0],
  ["Sep-27",0,0,0,0,0,0,0,0,0,0,0,19,0],
  ["Oct-27",0,0,0,0,0,0,0,0,0,0,0,20,0],
  ["Nov-27",0,0,0,0,0,0,0,0,0,0,0,21,0],
  ["Dec-27",0,0,0,0,0,0,0,0,0,0,0,22,0],
  ["Jan-28",0,0,0,0,0,0,0,0,0,0,0,23,0],
  ["Feb-28",0,0,0,0,0,0,0,0,0,0,0,24,0],
  ["Mar-28",0,0,0,0,0,0,0,0,0,0,0,25,0],
  ["Apr-28",0,0,0,0,0,0,0,0,0,0,0,26,0],
  ["May-28",0,0,0,0,0,0,0,0,0,0,0,27,0],
  ["Jun-28",0,0,0,0,0,0,0,0,0,0,0,28,0],
  ["Jul-28",0,0,0,0,0,0,0,0,0,0,0,29,0],
  ["Aug-28",0,0,0,0,0,0,0,0,0,0,0,30,0],
  ["Sep-28",0,0,0,0,0,0,0,0,0,0,0,31,0],
  ["Oct-28",0,0,0,0,0,0,0,0,0,0,0,32,0],
  ["Nov-28",0,0,0,0,0,0,0,0,0,0,0,33,0],
  ["Dec-28",0,0,0,0,0,0,0,0,0,0,0,34,0],
  ["Jan-29",0,0,0,0,0,0,0,0,0,0,0,35,0],
  ["Feb-29",0,0,0,0,0,0,0,0,0,0,0,36,0],
  ["Mar-29",0,0,0,0,0,0,0,0,0,0,0,37,0],
  ["Apr-29",0,0,0,0,0,0,0,0,0,0,0,38,0],
  ["May-29",0,0,0,0,0,0,0,0,0,0,0,39,0],
  ["Jun-29",0,0,0,0,0,0,0,0,0,0,0,40,0],
  ["Jul-29",0,0,0,0,0,0,0,0,0,0,0,41,0],
  ["Aug-29",0,0,0,0,0,0,0,0,0,0,0,42,0],
  ["Sep-29",0,0,0,0,0,0,0,0,0,0,0,43,0],
  ["Oct-29",0,0,0,0,0,0,0,0,0,0,0,44,0],
  ["Nov-29",0,0,0,0,0,0,0,0,0,0,0,45,0],
  ["Dec-29",0,0,0,0,0,0,0,0,0,0,0,46,0],
  ["Jan-30",0,0,0,0,0,0,0,0,0,0,0,47,0],
  ["Feb-30",0,0,0,0,0,0,0,0,0,0,0,48,0],
  ["Mar-30",0,0,0,0,0,0,0,0,0,0,0,49,0],
  ["Apr-30",0,0,0,0,0,0,0,0,0,0,0,50,0],
  ["May-30",0,0,0,0,0,0,0,0,0,0,0,51,0],
  ["Jun-30",0,0,0,0,0,0,0,0,0,0,0,52,0],
  ["Jul-30",0,0,0,0,0,0,0,0,0,0,0,53,0],
  ["Aug-30",0,0,0,0,0,0,0,0,0,0,0,54,0],
  ["Sep-30",0,0,0,0,0,0,0,0,0,0,0,55,0],
  ["Oct-30",0,0,0,0,0,0,0,0,0,0,0,56,0],
  ["Nov-30",0,0,0,0,0,0,0,0,0,0,0,57,0],
  ["Dec-30",0,0,0,0,0,0,0,0,0,0,0,58,0]
]

export const ACTUAL_CUTOFF = 6 // index of Aug-26 (0=Feb-26) -> months 0..6 actual, 7+ projected

export const flowYears: string[] = Array.from(new Set(FLOW_DATA.map((r) => '20' + r[0].split('-')[1]))).sort()
