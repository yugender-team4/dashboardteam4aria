// Auto-ported from aria-project-console.html (Milestone Tracker)
// Row shape: [Block, Milestone, PctOfAOS, DueDate, Status, Category, AmountDue, MonthLabel, FYLabel, PeriodOrder, IsOverdue]
//
// NOTE: These rows have been intentionally blanked (all values zeroed / emptied, Status reset
// to the neutral "Not date-linked" state) pending a full data reset. Row count and tuple shape
// are preserved so the dashboard keeps rendering correctly.
export type MileRow = [
  string, // Block
  string, // Milestone
  number, // PctOfAOS
  string, // DueDate (dd-MMM-yy, or "" when not date-linked)
  string, // Status: 'Achieved' | 'Due now' | 'Upcoming' | 'Not date-linked'
  string, // Category
  number, // AmountDue
  string, // MonthLabel
  string, // FYLabel
  number, // PeriodOrder (chronological sort key)
  number  // IsOverdue (0/1)
]

export const MILE_DATA: MileRow[] = [
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0],
  ["","",0,"","Not date-linked","",0,"","",0,0]
]

export const mileCats: string[] = []
export const mileBlocksList: string[] = []

export const MILE_STATUS_CLASS: Record<string, "good" | "warning" | "neutral"> = {
  Achieved: "good",
  "Due now": "warning",
  Upcoming: "neutral",
  "Not date-linked": "neutral",
}

export const MILE_STATUS_RANK: Record<string, number> = {
  "Due now": 0,
  Achieved: 1,
  Upcoming: 2,
  "Not date-linked": 3,
}
