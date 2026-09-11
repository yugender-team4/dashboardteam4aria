// Auto-ported from aria-project-console.html (Milestone Tracker)
// Row shape: [Block, Milestone, PctOfAOS, DueDate, Status, Category, AmountDue, MonthLabel, FYLabel, PeriodOrder, IsOverdue]
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
  ["A","Within 21 Days From The Date Of Booking",0.2,"","Not date-linked","Other than OTP",1073396,"Not date-linked","Not date-linked",0,0],
  ["A","Foundation",0.08,"12-Dec-27","Upcoming","Other than OTP",1229358,"Dec-27","FY 27-28",16,0],
  ["A","2nd Basement",0.08,"31-Jan-28","Upcoming","Other than OTP",1229358,"Jan-28","FY 27-28",17,0],
  ["A","Podium",0.08,"13-Apr-28","Upcoming","Other than OTP",1229358,"Apr-28","FY 28-29",20,0],
  ["A","Transfer Slab",0.08,"12-Aug-28","Upcoming","Other than OTP",1229358,"Aug-28","FY 28-29",24,0],
  ["A","8th Floor Structure",0.08,"05-Dec-28","Upcoming","Other than OTP",1229358,"Dec-28","FY 28-29",28,0],
  ["A","16th Floor Structure",0.08,"31-Jan-29","Upcoming","Other than OTP",1229358,"Jan-29","FY 28-29",29,0],
  ["A","24th Floor Structure",0.08,"25-Mar-29","Upcoming","Other than OTP",1229358,"Mar-29","FY 28-29",31,0],
  ["A","32nd Floor Structure",0.08,"14-May-29","Upcoming","Other than OTP",1229358,"May-29","FY 29-30",33,0],
  ["A","40th Floor Structure",0.05,"01-Jul-29","Upcoming","Other than OTP",768349,"Jul-29","FY 29-30",35,0],
  ["A","48th Floor Structure",0.03,"20-Aug-29","Upcoming","Other than OTP",461009,"Aug-29","FY 29-30",36,0],
  ["A","Flooring And Electrical Works",0.03,"18-Nov-28","Upcoming","Other than OTP",461009,"Nov-28","FY 28-29",27,0],
  ["A","Registration",0.05,"","Not date-linked","Other than OTP",768349,"Not date-linked","Not date-linked",99,0],
  ["B","Within 21 Days From The Date Of Booking",0.2,"","Not date-linked","Other than OTP",0,"Not date-linked","Not date-linked",0,0],
  ["B","Foundation",0.08,"03-Sep-27","Upcoming","Other than OTP",1801881,"Sep-27","FY 27-28",13,0],
  ["B","2nd Basement",0.08,"27-Oct-27","Upcoming","Other than OTP",2630721,"Oct-27","FY 27-28",14,0],
  ["B","Podium",0.08,"08-Jan-28","Upcoming","Other than OTP",2630721,"Jan-28","FY 27-28",17,0],
  ["B","Transfer Slab",0.08,"08-May-28","Upcoming","Other than OTP",2630721,"May-28","FY 28-29",21,0],
  ["B","8th Floor Structure",0.08,"31-Aug-28","Upcoming","Other than OTP",2630721,"Aug-28","FY 28-29",24,0],
  ["B","16th Floor Structure",0.08,"27-Oct-28","Upcoming","Other than OTP",2630721,"Oct-28","FY 28-29",26,0],
  ["B","24th Floor Structure",0.08,"19-Dec-28","Upcoming","Other than OTP",2630721,"Dec-28","FY 28-29",28,0],
  ["B","32nd Floor Structure",0.08,"05-Feb-29","Upcoming","Other than OTP",2630721,"Feb-29","FY 28-29",30,0],
  ["B","40th Floor Structure",0.05,"27-Mar-29","Upcoming","Other than OTP",1644200,"Mar-29","FY 28-29",31,0],
  ["B","48th Floor Structure",0.03,"15-May-29","Upcoming","Other than OTP",986520,"May-29","FY 29-30",33,0],
  ["B","Flooring And Electrical Works",0.03,"14-Aug-28","Upcoming","Other than OTP",986520,"Aug-28","FY 28-29",24,0],
  ["B","Registration",0.05,"","Not date-linked","Other than OTP",1644200,"Not date-linked","Not date-linked",99,0],
  ["C","Within 21 Days From The Date Of Booking",0.2,"","Not date-linked","Other than OTP",0,"Not date-linked","Not date-linked",0,0],
  ["C","Foundation",0.08,"08-Sep-27","Upcoming","Other than OTP",0,"Sep-27","FY 27-28",13,0],
  ["C","2nd Basement",0.08,"19-Oct-27","Upcoming","Other than OTP",0,"Oct-27","FY 27-28",14,0],
  ["C","Podium",0.08,"09-Dec-27","Upcoming","Other than OTP",0,"Dec-27","FY 27-28",16,0],
  ["C","Transfer Slab",0.08,"27-Feb-28","Upcoming","Other than OTP",0,"Feb-28","FY 27-28",18,0],
  ["C","8th Floor Structure",0.08,"28-Jul-28","Upcoming","Other than OTP",0,"Jul-28","FY 28-29",23,0],
  ["C","16th Floor Structure",0.08,"21-Sep-28","Upcoming","Other than OTP",0,"Sep-28","FY 28-29",25,0],
  ["C","24th Floor Structure",0.08,"09-Nov-28","Upcoming","Other than OTP",0,"Nov-28","FY 28-29",27,0],
  ["C","32nd Floor Structure",0.08,"28-Dec-28","Upcoming","Other than OTP",0,"Dec-28","FY 28-29",28,0],
  ["C","40th Floor Structure",0.05,"16-Feb-29","Upcoming","Other than OTP",0,"Feb-29","FY 28-29",30,0],
  ["C","48th Floor Structure",0.03,"05-Apr-29","Upcoming","Other than OTP",0,"Apr-29","FY 29-30",32,0],
  ["C","Flooring And Electrical Works",0.03,"14-Jul-28","Upcoming","Other than OTP",0,"Jul-28","FY 28-29",23,0],
  ["C","Registration",0.05,"","Not date-linked","Other than OTP",0,"Not date-linked","Not date-linked",99,0],
  ["D","Within 21 Days From The Date Of Booking",0.2,"","Not date-linked","Other than OTP",81489324,"Not date-linked","Not date-linked",0,0],
  ["D","Foundation",0.08,"30-Sep-26","Upcoming","Other than OTP",170022488,"Sep-26","FY 26-27",1,1],
  ["D","2nd Basement",0.08,"05-Oct-26","Upcoming","Other than OTP",185351361,"Oct-26","FY 26-27",2,0],
  ["D","Podium",0.08,"16-Dec-26","Upcoming","Other than OTP",185585152,"Dec-26","FY 26-27",4,0],
  ["D","Transfer Slab",0.08,"15-Apr-27","Upcoming","Other than OTP",185585152,"Apr-27","FY 27-28",8,0],
  ["D","8th Floor Structure",0.08,"09-Aug-27","Upcoming","Other than OTP",185585152,"Aug-27","FY 27-28",12,0],
  ["D","16th Floor Structure",0.08,"05-Oct-27","Upcoming","Other than OTP",185585152,"Oct-27","FY 27-28",14,0],
  ["D","24th Floor Structure",0.08,"27-Nov-27","Upcoming","Other than OTP",185585152,"Nov-27","FY 27-28",15,0],
  ["D","32nd Floor Structure",0.08,"15-Jan-28","Upcoming","Other than OTP",185585152,"Jan-28","FY 27-28",17,0],
  ["D","40th Floor Structure",0.05,"04-Mar-28","Upcoming","Other than OTP",115990720,"Mar-28","FY 27-28",19,0],
  ["D","48th Floor Structure",0.03,"23-Apr-28","Upcoming","Other than OTP",69594432,"Apr-28","FY 28-29",20,0],
  ["D","Flooring And Electrical Works",0.03,"23-Jul-27","Upcoming","Other than OTP",69594432,"Jul-27","FY 27-28",11,0],
  ["D","Registration",0.05,"","Not date-linked","Other than OTP",115990720,"Not date-linked","Not date-linked",99,0],
  ["E","Within 21 Days From The Date Of Booking",0.2,"","Not date-linked","Other than OTP",98380058,"Not date-linked","Not date-linked",0,0],
  ["E","Foundation",0.08,"02-May-26","Achieved","Other than OTP",103191131,"May-26","FY 26-27",0,0],
  ["E","2nd Basement",0.08,"13-Jun-26","Achieved","Other than OTP",139832466,"Jun-26","FY 26-27",0,0],
  ["E","Podium",0.08,"20-Oct-26","Upcoming","Other than OTP",145835282,"Oct-26","FY 26-27",2,0],
  ["E","Transfer Slab",0.08,"18-Feb-27","Upcoming","Other than OTP",145835282,"Feb-27","FY 26-27",6,0],
  ["E","8th Floor Structure",0.08,"14-Jun-27","Upcoming","Other than OTP",145835282,"Jun-27","FY 27-28",10,0],
  ["E","16th Floor Structure",0.08,"10-Aug-27","Upcoming","Other than OTP",145835282,"Aug-27","FY 27-28",12,0],
  ["E","24th Floor Structure",0.08,"03-Oct-27","Upcoming","Other than OTP",145835282,"Oct-27","FY 27-28",14,0],
  ["E","32nd Floor Structure",0.08,"19-Nov-27","Upcoming","Other than OTP",145835282,"Nov-27","FY 27-28",15,0],
  ["E","40th Floor Structure",0.05,"08-Jan-28","Upcoming","Other than OTP",91147051,"Jan-28","FY 27-28",17,0],
  ["E","48th Floor Structure",0.03,"25-Feb-28","Upcoming","Other than OTP",54688231,"Feb-28","FY 27-28",18,0],
  ["E","Flooring And Electrical Works",0.03,"28-May-27","Upcoming","Other than OTP",54688231,"May-27","FY 27-28",9,0],
  ["E","Registration",0.05,"","Not date-linked","Other than OTP",91147051,"Not date-linked","Not date-linked",99,0],
  ["F","Within 21 Days From The Date Of Booking",0.2,"","Not date-linked","Other than OTP",103949559,"Not date-linked","Not date-linked",0,0],
  ["F","Foundation",0.08,"22-Apr-26","Achieved","Other than OTP",128659968,"Apr-26","FY 26-27",0,0],
  ["F","2nd Basement",0.08,"23-Jul-26","Achieved","Other than OTP",168129249,"Jul-26","FY 26-27",0,0],
  ["F","Podium",0.08,"19-Sep-26","Upcoming","Other than OTP",175000749,"Sep-26","FY 26-27",1,0],
  ["F","Transfer Slab",0.08,"25-Dec-26","Upcoming","Other than OTP",175000749,"Dec-26","FY 26-27",4,0],
  ["F","8th Floor Structure",0.08,"26-Apr-27","Upcoming","Other than OTP",175000749,"Apr-27","FY 27-28",8,0],
  ["F","16th Floor Structure",0.08,"19-Jun-27","Upcoming","Other than OTP",175000749,"Jun-27","FY 27-28",10,0],
  ["F","24th Floor Structure",0.08,"08-Aug-27","Upcoming","Other than OTP",175000749,"Aug-27","FY 27-28",12,0],
  ["F","32nd Floor Structure",0.08,"26-Sep-27","Upcoming","Other than OTP",175000749,"Sep-27","FY 27-28",13,0],
  ["F","40th Floor Structure",0.05,"14-Nov-27","Upcoming","Other than OTP",109375468,"Nov-27","FY 27-28",15,0],
  ["F","48th Floor Structure",0.03,"03-Jan-28","Upcoming","Other than OTP",65625281,"Jan-28","FY 27-28",17,0],
  ["F","Flooring And Electrical Works",0.03,"11-Apr-27","Upcoming","Other than OTP",65625281,"Apr-27","FY 27-28",8,0],
  ["F","Registration",0.05,"","Not date-linked","Other than OTP",109375468,"Not date-linked","Not date-linked",99,0],
  ["G","Within 21 Days From The Date Of Booking",0.2,"","Not date-linked","Other than OTP",0,"Not date-linked","Not date-linked",0,0],
  ["G","Foundation",0.08,"01-Nov-26","Upcoming","Other than OTP",0,"Nov-26","FY 26-27",3,0],
  ["G","2nd Basement",0.08,"25-Dec-26","Upcoming","Other than OTP",0,"Dec-26","FY 26-27",4,0],
  ["G","Podium",0.08,"11-Jan-27","Upcoming","Other than OTP",0,"Jan-27","FY 26-27",5,0],
  ["G","Transfer Slab",0.08,"20-Apr-27","Upcoming","Other than OTP",0,"Apr-27","FY 27-28",8,0],
  ["G","8th Floor Structure",0.08,"19-Aug-27","Upcoming","Other than OTP",0,"Aug-27","FY 27-28",12,0],
  ["G","16th Floor Structure",0.08,"13-Oct-27","Upcoming","Other than OTP",0,"Oct-27","FY 27-28",14,0],
  ["G","24th Floor Structure",0.08,"01-Dec-27","Upcoming","Other than OTP",0,"Dec-27","FY 27-28",16,0],
  ["G","32nd Floor Structure",0.08,"19-Jan-28","Upcoming","Other than OTP",0,"Jan-28","FY 27-28",17,0],
  ["G","40th Floor Structure",0.05,"09-Mar-28","Upcoming","Other than OTP",0,"Mar-28","FY 27-28",19,0],
  ["G","48th Floor Structure",0.03,"26-Apr-28","Upcoming","Other than OTP",0,"Apr-28","FY 28-29",20,0],
  ["G","Flooring And Electrical Works",0.03,"05-Aug-27","Upcoming","Other than OTP",0,"Aug-27","FY 27-28",12,0],
  ["G","Registration",0.05,"","Not date-linked","Other than OTP",0,"Not date-linked","Not date-linked",99,0],
  ["A","OTP / MGT / OTP-Others (full balance due)",0,"","Due now","OTP",10983499,"Due immediately","Due immediately",0,0],
  ["B","OTP / MGT / OTP-Others (full balance due)",0,"","Due now","OTP",31720594,"Due immediately","Due immediately",0,0],
  ["C","OTP / MGT / OTP-Others (full balance due)",0,"","Due now","OTP",121603383,"Due immediately","Due immediately",0,0],
  ["D","OTP / MGT / OTP-Others (full balance due)",0,"","Due now","OTP",84327434,"Due immediately","Due immediately",0,0],
  ["E","OTP / MGT / OTP-Others (full balance due)",0,"","Due now","OTP",45045500,"Due immediately","Due immediately",0,0],
  ["F","OTP / MGT / OTP-Others (full balance due)",0,"","Due now","OTP",99518920,"Due immediately","Due immediately",0,0],
  ["G","OTP / MGT / OTP-Others (full balance due)",0,"","Due now","OTP",0,"Due immediately","Due immediately",0,0]
]

export const mileCats: string[] = Array.from(new Set(MILE_DATA.map((r) => r[5]))).sort()
export const mileBlocksList: string[] = Array.from(new Set(MILE_DATA.map((r) => r[0]))).sort()

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
