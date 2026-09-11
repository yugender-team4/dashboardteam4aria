import { BUDGET_ITEMS, budgetCategoryOrder, budgetSummary, type BudgetCategory } from "@/data/budget"

export const BUDGET_CATEGORY_COLOR: Record<BudgetCategory, string> = {
  Structure: "var(--chart-2)",
  Finishes: "var(--chart-1)",
  MEP: "var(--chart-4)",
  External: "var(--chart-3)",
  "Soft Costs": "var(--serious)",
  "Contingency & Statutory": "var(--chart-5)",
}

export interface CategoryRollup {
  category: BudgetCategory
  amount: number
  itemCount: number
  pctOfGrandTotal: number
  color: string
}

export function budgetCategoryRollups(): CategoryRollup[] {
  const totals = new Map<BudgetCategory, { amount: number; count: number }>()
  BUDGET_ITEMS.forEach((it) => {
    const cur = totals.get(it.category) ?? { amount: 0, count: 0 }
    cur.amount += it.amount
    cur.count += 1
    totals.set(it.category, cur)
  })
  return budgetCategoryOrder.map((cat) => {
    const t = totals.get(cat) ?? { amount: 0, count: 0 }
    return {
      category: cat,
      amount: t.amount,
      itemCount: t.count,
      pctOfGrandTotal: (100 * t.amount) / budgetSummary.grandTotal,
      color: BUDGET_CATEGORY_COLOR[cat],
    }
  })
}

export function budgetItemsByCategory(category: BudgetCategory) {
  return BUDGET_ITEMS.filter((it) => it.category === category).sort((a, b) => b.amount - a.amount)
}

// A rate value can be a number, a note like "Not in NYLA", or null (no ARIA equivalent).
export function fmtRate(v: number | string | null): string {
  if (v === null) return "—"
  if (typeof v === "string") return v
  return `₹${v.toFixed(2)}`
}
