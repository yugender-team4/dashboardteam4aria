import { Fragment, useMemo, useState } from "react"

import { KpiCard } from "@/components/dashboard/kpi"
import { Pill } from "@/components/dashboard/pill"
import { SectionCard } from "@/components/dashboard/section-card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BUDGET_ITEMS, budgetSummary, type BudgetCategory } from "@/data/budget"
import { budgetCategoryRollups, budgetItemsByCategory, fmtRate } from "@/lib/budget-helpers"
import { fmtCr, fmtInr } from "@/lib/format"
import { cn } from "@/lib/utils"

function rowKey(sNo: string, description: string) {
  return `${sNo}__${description}`
}

export function OutflowBreakdown() {
  const rollups = useMemo(() => budgetCategoryRollups(), [])
  const [selectedCategory, setSelectedCategory] = useState<BudgetCategory>(rollups[0].category)
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const items = useMemo(() => budgetItemsByCategory(selectedCategory), [selectedCategory])
  const selectedRollup = rollups.find((r) => r.category === selectedCategory)!

  return (
    <SectionCard
      title="Outflow breakdown — project cost budget"
      hint={`₹${(budgetSummary.grandTotal / 1e7).toFixed(2)} Cr grand total budget across ${BUDGET_ITEMS.length} line items, from the ARIA cost sheet (19-Jan-26). Click a category to filter, click a line item for its rate detail.`}
    >
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {rollups.map((r) => (
          <KpiCard
            key={r.category}
            label={r.category.toUpperCase()}
            value={fmtCr(r.amount / 1e7)}
            sub={`${r.itemCount} item${r.itemCount === 1 ? "" : "s"} · ${r.pctOfGrandTotal.toFixed(1)}%`}
            dotColor={r.color}
            active={selectedCategory === r.category}
            onClick={() => {
              setSelectedCategory(r.category)
              setExpandedRow(null)
            }}
          />
        ))}
      </div>

      <div className="mb-2.5 flex items-center gap-2 text-[12.5px]">
        <i className="inline-block size-2.5 rounded-sm" style={{ background: selectedRollup.color }} />
        <span className="font-semibold">{selectedRollup.category}</span>
        <span className="text-muted-foreground">
          — {fmtCr(selectedRollup.amount / 1e7)} across {selectedRollup.itemCount} line item
          {selectedRollup.itemCount === 1 ? "" : "s"}
        </span>
      </div>

      <div className="overflow-hidden rounded-[12px] border border-border">
        <div className="max-h-[420px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Budget amount</TableHead>
                <TableHead className="text-right">Actual (Tally)</TableHead>
                <TableHead className="text-right">% of category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((it) => {
                const key = rowKey(it.sNo, it.description)
                const expanded = expandedRow === key
                const pctOfCategory = selectedRollup.amount ? (100 * it.amount) / selectedRollup.amount : 0
                const diffColor =
                  it.diffVsNyla === null
                    ? undefined
                    : it.diffVsNyla < 0
                      ? "var(--good)"
                      : "var(--critical)"
                return (
                  <Fragment key={key}>
                    <TableRow
                      className="cursor-pointer"
                      aria-expanded={expanded}
                      onClick={() => setExpandedRow(expanded ? null : key)}
                    >
                      <TableCell className="text-muted-foreground">{it.sNo}</TableCell>
                      <TableCell className="font-medium">
                        <span className="mr-1.5 inline-block text-muted-foreground">{expanded ? "▾" : "▸"}</span>
                        {it.description}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">{fmtInr(it.amount)}</TableCell>
                      <TableCell className="text-right">
                        <Pill variant="neutral">Pending Tally upload</Pill>
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">{pctOfCategory.toFixed(1)}%</TableCell>
                    </TableRow>
                    {expanded && (
                      <TableRow className={cn("bg-surface-2 hover:bg-surface-2")}>
                        <TableCell colSpan={5} className="whitespace-normal">
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 py-1.5 text-[12px] sm:grid-cols-4">
                            <div>
                              <div className="text-muted-foreground">Rate / sft (BUA)</div>
                              <div className="font-mono font-semibold tabular-nums">{fmtRate(it.rateBua)}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Rate / sft (sale area)</div>
                              <div className="font-mono font-semibold tabular-nums">{fmtRate(it.rateSale)}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">NYLA benchmark rate</div>
                              <div className="font-mono font-semibold tabular-nums">{fmtRate(it.rateNyla)}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">vs. NYLA (₹/sft)</div>
                              <div className="font-mono font-semibold tabular-nums" style={{ color: diffColor }}>
                                {it.diffVsNyla === null
                                  ? "—"
                                  : `${it.diffVsNyla > 0 ? "+" : ""}₹${it.diffVsNyla.toFixed(2)}`}
                              </div>
                            </div>
                          </div>
                          <div className="mt-1 text-[11px] text-muted-foreground">
                            Actual spend to date will appear here once the Tally actuals workbook is connected from
                            SharePoint.
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </SectionCard>
  )
}
