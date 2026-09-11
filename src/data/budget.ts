// Auto-ported from ARIA Cost sheet (Meeting held on 19-01-26, Team4 corporate office)
// Row shape: [sNo, description, amount, rateBua, rateSale, rateNyla, diffVsNyla, category]
//
// NOTE: Description, amount and all rate/diff figures have been intentionally blanked
// (zeroed) pending a full data reset. sNo and category are preserved — they are row
// identity / grouping keys, not financial data — so category rollups keep working.
export type BudgetCategory =
  "Structure"
  | "Finishes"
  | "MEP"
  | "External"
  | "Soft Costs"
  | "Contingency & Statutory"

export interface BudgetItem {
  sNo: string
  description: string
  amount: number
  rateBua: number | string | null
  rateSale: number | string | null
  rateNyla: number | string | null
  diffVsNyla: number | null
  category: BudgetCategory
}

export const BUDGET_ITEMS: BudgetItem[] = [
  { sNo: "1", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Structure" },
  { sNo: "2", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Structure" },
  { sNo: "3", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Structure" },
  { sNo: "4", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Structure" },
  { sNo: "5", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Structure" },
  { sNo: "6", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Finishes" },
  { sNo: "7", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Finishes" },
  { sNo: "8", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Finishes" },
  { sNo: "9", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Finishes" },
  { sNo: "10", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Finishes" },
  { sNo: "11", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Finishes" },
  { sNo: "12", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Finishes" },
  { sNo: "13", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "MEP" },
  { sNo: "14", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "MEP" },
  { sNo: "15", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "MEP" },
  { sNo: "16", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "MEP" },
  { sNo: "17", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "MEP" },
  { sNo: "18", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "MEP" },
  { sNo: "19", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "MEP" },
  { sNo: "20", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "MEP" },
  { sNo: "21", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "MEP" },
  { sNo: "22", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "MEP" },
  { sNo: "23", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "MEP" },
  { sNo: "24", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "MEP" },
  { sNo: "25", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "MEP" },
  { sNo: "26", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "MEP" },
  { sNo: "27", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "MEP" },
  { sNo: "28", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "External" },
  { sNo: "29", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "External" },
  { sNo: "30", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "External" },
  { sNo: "31", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "External" },
  { sNo: "32", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "External" },
  { sNo: "33", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "External" },
  { sNo: "34", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "External" },
  { sNo: "35", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "External" },
  { sNo: "36", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "External" },
  { sNo: "b", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Soft Costs" },
  { sNo: "c", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Soft Costs" },
  { sNo: "d", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Soft Costs" },
  { sNo: "e", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Soft Costs" },
  { sNo: "f", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Soft Costs" },
  { sNo: "g", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Soft Costs" },
  { sNo: "h", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Soft Costs" },
  { sNo: "39", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Contingency & Statutory" },
  { sNo: "40", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Contingency & Statutory" },
  { sNo: "41", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Contingency & Statutory" },
  { sNo: "42", description: "", amount: 0, rateBua: 0, rateSale: 0, rateNyla: 0, diffVsNyla: 0, category: "Contingency & Statutory" },
]

export const budgetSummary = {
  buaSft: 0,
  salableSftAria: 0,
  salableSftNyla: 0,
  totalConstruction: 0,
  netTotal: 0,
  grandTotal: 0,
}

export const budgetCategoryOrder: BudgetCategory[] = [
  "Structure",
  "Finishes",
  "MEP",
  "External",
  "Soft Costs",
  "Contingency & Statutory",
]
