import { useMemo, useState } from "react"

import { Callout } from "@/components/dashboard/callout"
import { FlowTrendChart } from "@/components/dashboard/flow-trend-chart"
import { FunnelBar } from "@/components/dashboard/funnel-bar"
import { KpiCard, KpiRow } from "@/components/dashboard/kpi"
import { OutflowBreakdown } from "@/components/dashboard/outflow-breakdown"
import { PageHead } from "@/components/dashboard/page-head"
import { Pill } from "@/components/dashboard/pill"
import { TableToolbar } from "@/components/dashboard/table-toolbar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useData } from "@/lib/data-context"
import { cn } from "@/lib/utils"
import { fmtCr } from "@/lib/format"

type TypeFilter = "all" | "1" | "0"

interface FilterState {
  search: string
  type: TypeFilter
  year: string
  deficitOnly: boolean
}

const initialFilters: FilterState = { search: "", type: "all", year: "all", deficitOnly: false }

const columns: { k: number; label: string; num?: boolean }[] = [
  { k: 0, label: "Month" },
  { k: 11, label: "Type" },
  { k: 1, label: "Opening", num: true },
  { k: 2, label: "Inflow (Existing)", num: true },
  { k: 3, label: "Inflow (Future Sales)", num: true },
  { k: 5, label: "Total Inflow", num: true },
  { k: 8, label: "Outflow", num: true },
  { k: 10, label: "Net Movement", num: true },
  { k: 9, label: "Closing", num: true },
]

export function InflowOutflowView() {
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [sort, setSort] = useState<{ key: number; dir: 1 | -1 } | null>(null)
  const [activeKpi, setActiveKpi] = useState<number | null>(null)
  const { flowData: FLOW_DATA, flowYears } = useData()

  const kpis = useMemo(() => {
    let totalInflow = 0
    let totalOutflow = 0
    let deficitMonths = 0
    let actualInflow = 0
    let actualOutflow = 0
    let actualBudgetOutflow = 0
    let lastActualIdx = 0
    FLOW_DATA.forEach((r, i) => {
      totalInflow += r[5]
      totalOutflow += r[8]
      if (r[11]) {
        actualInflow += r[5]
        actualOutflow += r[8]
        actualBudgetOutflow += r[6]
        lastActualIdx = i
      }
    })
    return {
      totalInflow,
      totalOutflow,
      deficitMonths,
      currentClosing: FLOW_DATA[lastActualIdx][9],
      currentLabel: FLOW_DATA[lastActualIdx][0],
      actualNet: actualInflow - actualOutflow,
      actualOutflow,
      actualBudgetOutflow,
      actualMonthsLabel: `${FLOW_DATA[0][0]} → ${FLOW_DATA[lastActualIdx][0]}`,
    }
  }, [FLOW_DATA])

  function applyKpi(i: number, type: TypeFilter, deficitOnly: boolean) {
    setActiveKpi(i)
    setFilters((f) => ({ ...f, type, deficitOnly }))
  }

  const filtered = useMemo(() => {
    let rows = FLOW_DATA.filter((r) => {
      if (filters.deficitOnly && r[9] >= 0) return false
      if (filters.type !== "all" && String(r[11]) !== filters.type) return false
      if (filters.year !== "all" && `20${r[0].split("-")[1]}` !== filters.year) return false
      if (filters.search) {
        const hay = `${r[0]} 20${r[0].split("-")[1]}`.toLowerCase()
        if (!hay.includes(filters.search)) return false
      }
      return true
    })
    if (sort) {
      rows = rows.slice().sort((a, b) => {
        const va = a[sort.key]
        const vb = b[sort.key]
        if (typeof va === "string" && typeof vb === "string") {
          return va.toLowerCase().localeCompare(vb.toLowerCase()) * sort.dir
        }
        return ((va as number) - (vb as number)) * sort.dir
      })
    } else {
      rows = rows.slice().sort((a, b) => a[12] - b[12])
    }
    return rows
  }, [FLOW_DATA, filters, sort])

  function toggleSort(k: number) {
    setSort((cur) => (cur?.key === k ? { key: k, dir: cur.dir === 1 ? -1 : 1 } : { key: k, dir: 1 }))
  }

  const monthCount = FLOW_DATA.length
  const surplusMonths = monthCount - kpis.deficitMonths

  const kpiDefs: { label: string; value: string; sub: string; color: string; onSelect: () => void }[] = [
    {
      label: "TOTAL INFLOW (MODELLED)",
      value: fmtCr(kpis.totalInflow),
      sub: "Feb-26 → Dec-30",
      color: "var(--good)",
      onSelect: () => applyKpi(0, "all", false),
    },
    {
      label: "TOTAL OUTFLOW (MODELLED)",
      value: fmtCr(kpis.totalOutflow),
      sub: "Feb-26 → Dec-30",
      color: "var(--accent-eng)",
      onSelect: () => applyKpi(1, "all", false),
    },
    {
      label: "CURRENT POSITION",
      value: fmtCr(kpis.currentClosing),
      sub: `Closing balance, ${kpis.currentLabel}`,
      color: "var(--foreground)",
      onSelect: () => applyKpi(2, "all", false),
    },
    {
      label: "ACTUAL TO DATE",
      value: fmtCr(kpis.actualNet),
      sub: "Net, actual months",
      color: "var(--good)",
      onSelect: () => applyKpi(3, "1", false),
    },
    {
      label: "DEFICIT MONTHS",
      value: `${kpis.deficitMonths} / ${monthCount}`,
      sub: "closing balance negative",
      color: "var(--critical)",
      onSelect: () => applyKpi(4, "all", true),
    },
  ]

  return (
    <div>
      <PageHead
        eyebrow="Inflow & Outflow Tracker · Cash flow model"
        swatchClassName="bg-good"
        title="Monthly cash movement, Feb-2026 → Dec-2030"
        description="All 59 modelled months from the ARIA cash flow model — opening balance, inflow from existing and future sales, outflow, and closing position. Feb–Aug 2026 are actuals; everything after is the projected model."
      />

      <KpiRow>
        {kpiDefs.map((d, i) => (
          <KpiCard
            key={d.label}
            label={d.label}
            value={d.value}
            sub={d.sub}
            color={d.color}
            dotColor={d.color}
            active={activeKpi === i}
            onClick={d.onSelect}
          />
        ))}
      </KpiRow>

      <FunnelBar
        segments={[
          { label: "Surplus months", value: surplusMonths, color: "var(--good)" },
          { label: "Deficit months", value: kpis.deficitMonths, color: "var(--critical)" },
        ]}
      />

      <Callout variant="critical" title={`${kpis.deficitMonths} of ${monthCount} modelled months show a negative closing balance`}>
        The deficit first appears around <b>Oct-2028</b> and recurs intermittently through <b>Dec-2030</b>, troughing
        near ₹191 Cr short in mid-2030. Click <b>&ldquo;Deficit months&rdquo;</b> below to see just these.
      </Callout>

      <FlowTrendChart />

      <Callout
        variant={kpis.actualOutflow <= kpis.actualBudgetOutflow ? "good" : "warning"}
        title={`Actual outflow to date (${kpis.actualMonthsLabel}): ${fmtCr(kpis.actualOutflow)} vs ${fmtCr(kpis.actualBudgetOutflow)} budgeted`}
      >
        Real cash outflow across the {kpis.actualMonthsLabel} actual months is{" "}
        <b>{fmtCr(Math.abs(kpis.actualOutflow - kpis.actualBudgetOutflow))}</b>{" "}
        {kpis.actualOutflow <= kpis.actualBudgetOutflow ? "under" : "over"} the modelled Budget Outflow for the same
        months. This is an aggregate comparison only — the workbook&rsquo;s &ldquo;Actual Outflow related to
        Budget&rdquo; column (which would give a category-level view) is currently blank in SharePoint; the
        breakdown below will populate automatically once that column or a Tally actuals export is filled in.
      </Callout>

      <OutflowBreakdown />

      <div className="mb-2.5 px-0.5 text-[11.5px] font-semibold tracking-[0.06em] text-muted-foreground uppercase">
        Modelled monthly cash flow
      </div>

      <div className="mb-4 overflow-hidden rounded-[14px] border border-border bg-card shadow-card">
        <div className="flex flex-wrap items-center gap-2.5 border-b border-border px-[18px] py-3">
          <ToggleGroup
            type="single"
            variant="outline"
            value={filters.type}
            onValueChange={(v) => v && setFilters((f) => ({ ...f, type: v as TypeFilter }))}
          >
            <ToggleGroupItem value="all" className="px-3 text-[12px] font-semibold">
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="1" className="px-3 text-[12px] font-semibold">
              Actual
            </ToggleGroupItem>
            <ToggleGroupItem value="0" className="px-3 text-[12px] font-semibold">
              Projected
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <TableToolbar
          search={filters.search}
          onSearchChange={(v) => setFilters((f) => ({ ...f, search: v.toLowerCase() }))}
          searchPlaceholder="Search month, e.g. Jan or 2028…"
          selects={[
            {
              value: filters.year,
              onChange: (v) => setFilters((f) => ({ ...f, year: v })),
              placeholder: "Year",
              options: [{ value: "all", label: "All years" }, ...flowYears.map((y) => ({ value: y, label: y }))],
            },
          ]}
          countLabel={`Showing ${filtered.length} of ${FLOW_DATA.length} months`}
          onReset={() => {
            setFilters(initialFilters)
            setSort(null)
            setActiveKpi(null)
          }}
        />

        <div className="max-h-[560px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((c) => (
                  <TableHead
                    key={c.k}
                    className={`cursor-pointer select-none ${c.num ? "text-right" : ""}`}
                    onClick={() => toggleSort(c.k)}
                  >
                    {c.label} <span className="text-muted-foreground">▾</span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r, i) => (
                <TableRow key={`${r[0]}-${i}`} className={cn(r[9] < 0 && "bg-critical-soft/40")}>
                  <TableCell className="font-medium">{r[0]}</TableCell>
                  <TableCell>
                    <Pill variant={r[11] ? "good" : "neutral"}>{r[11] ? "Actual" : "Projected"}</Pill>
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">{fmtCr(r[1])}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">{fmtCr(r[2])}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">{fmtCr(r[3])}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">{fmtCr(r[5])}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">{fmtCr(r[8])}</TableCell>
                  <TableCell
                    className="text-right font-mono tabular-nums"
                    style={{ color: r[10] < 0 ? "var(--critical)" : "var(--good)" }}
                  >
                    {fmtCr(r[10])}
                  </TableCell>
                  <TableCell
                    className="text-right font-mono font-bold tabular-nums"
                    style={{ color: r[9] < 0 ? "var(--critical)" : "var(--foreground)" }}
                  >
                    {fmtCr(r[9])}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filtered.length === 0 && (
            <div className="py-10 text-center text-sm text-muted-foreground">No months match these filters.</div>
          )}
        </div>
      </div>
    </div>
  )
}
