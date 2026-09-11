import { useMemo, useState } from "react"

import { Callout } from "@/components/dashboard/callout"
import { FunnelBar } from "@/components/dashboard/funnel-bar"
import { KpiCard, KpiRow } from "@/components/dashboard/kpi"
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
import {
  MILE_DATA,
  MILE_STATUS_CLASS,
  MILE_STATUS_RANK,
  mileBlocksList,
  mileCats,
} from "@/data/milestones"
import { fmtInrOrDash, mileDateSerial, pctLabel } from "@/lib/format"

type Status = "all" | "Due now" | "Upcoming" | "Achieved" | "Not date-linked"

interface FilterState {
  search: string
  status: Status
  cat: string
  block: string
  overdueOnly: boolean
}

const initialFilters: FilterState = { search: "", status: "all", cat: "all", block: "all", overdueOnly: false }

const columns: { k: number; label: string; num?: boolean }[] = [
  { k: 0, label: "Block" },
  { k: 1, label: "Milestone" },
  { k: 2, label: "Payment %", num: true },
  { k: 3, label: "Due Date" },
  { k: 4, label: "Status" },
  { k: 5, label: "Category" },
  { k: 6, label: "Amount", num: true },
]

export function MilestoneTrackerView() {
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [sort, setSort] = useState<{ key: number; dir: 1 | -1 } | null>(null)
  const [activeKpi, setActiveKpi] = useState<number | null>(null)

  const mileTotal = MILE_DATA.length
  const { counts, sums } = useMemo(() => {
    const c: Record<string, number> = { Achieved: 0, "Due now": 0, Upcoming: 0, "Not date-linked": 0 }
    const s: Record<string, number> = { Achieved: 0, "Due now": 0, Upcoming: 0, "Not date-linked": 0 }
    MILE_DATA.forEach((r) => {
      c[r[4]]++
      s[r[4]] += r[6]
    })
    return { counts: c, sums: s }
  }, [])

  function applyKpi(i: number, status: Status, overdueOnly: boolean) {
    setActiveKpi(i)
    setFilters((f) => ({ ...f, status, overdueOnly }))
  }

  const filtered = useMemo(() => {
    let rows = MILE_DATA.filter((r) => {
      if (filters.overdueOnly && r[10] !== 1) return false
      if (filters.status !== "all" && r[4] !== filters.status) return false
      if (filters.cat !== "all" && r[5] !== filters.cat) return false
      if (filters.block !== "all" && r[0] !== filters.block) return false
      if (filters.search) {
        const hay = `${r[0]} ${r[1]}`.toLowerCase()
        if (!hay.includes(filters.search)) return false
      }
      return true
    })
    if (sort) {
      const k = sort.key
      rows = rows.slice().sort((a, b) => {
        let va: string | number = a[k]
        let vb: string | number = b[k]
        if (k === 3) {
          va = mileDateSerial(a[3])
          vb = mileDateSerial(b[3])
        } else if (typeof va === "string" && typeof vb === "string") {
          return va.toLowerCase().localeCompare(vb.toLowerCase()) * sort.dir
        }
        return ((va as number) - (vb as number)) * sort.dir
      })
    } else {
      rows = rows.slice().sort((a, b) => {
        if (a[10] !== b[10]) return b[10] - a[10]
        const ra = MILE_STATUS_RANK[a[4]]
        const rb = MILE_STATUS_RANK[b[4]]
        if (ra !== rb) return ra - rb
        return mileDateSerial(a[3]) - mileDateSerial(b[3])
      })
    }
    return rows
  }, [filters, sort])

  function toggleSort(k: number) {
    setSort((cur) => (cur?.key === k ? { key: k, dir: cur.dir === 1 ? -1 : 1 } : { key: k, dir: 1 }))
  }

  const kpiDefs: { label: string; value: number; sub: string; color: string; onSelect: () => void }[] = [
    {
      label: "TOTAL MILESTONES",
      value: mileTotal,
      sub: "14 stages × 7 blocks",
      color: "var(--foreground)",
      onSelect: () => applyKpi(0, "all", false),
    },
    {
      label: "DUE NOW",
      value: counts["Due now"],
      sub: `${fmtInrOrDash(sums["Due now"])} payable`,
      color: "var(--warning)",
      onSelect: () => applyKpi(1, "Due now", false),
    },
    {
      label: "ACHIEVED",
      value: counts["Achieved"],
      sub: `${fmtInrOrDash(sums["Achieved"])} still receivable`,
      color: "var(--good)",
      onSelect: () => applyKpi(2, "Achieved", false),
    },
    {
      label: "UPCOMING",
      value: counts["Upcoming"],
      sub: `${fmtInrOrDash(sums["Upcoming"])} projected`,
      color: "var(--accent-eng)",
      onSelect: () => applyKpi(3, "Upcoming", false),
    },
    {
      label: "OVERDUE",
      value: 1,
      sub: "Block D · Foundation · 121d late",
      color: "var(--critical)",
      onSelect: () => applyKpi(4, "all", true),
    },
  ]

  const funnelOrder: Status[] = ["Achieved", "Due now", "Upcoming", "Not date-linked"]
  const funnelColors: Record<string, string> = {
    Achieved: "var(--good)",
    "Due now": "var(--warning)",
    Upcoming: "var(--accent-eng)",
    "Not date-linked": "var(--muted-foreground)",
  }

  return (
    <div>
      <PageHead
        eyebrow="Milestone Tracker · Construction & payment schedule"
        swatchClassName="bg-accent-eng"
        title="Block-by-block milestone status"
        description="All 98 milestone instances (14 payment stages × 7 blocks) that make up the ₹566.24 Cr project balance receivable — from booking-linked calls through structural stages to registration."
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
        segments={funnelOrder.map((s) => ({ label: s, value: counts[s], color: funnelColors[s] }))}
      />

      <Callout variant="warning" icon="⏱️" title="1 milestone is running behind baseline">
        Block D&apos;s <b>Foundation</b> milestone was originally scheduled for 01-Jun-2026 and is now tracking to
        30-Sep-2026 — 121 days behind. No other block currently shows a recorded delay. Click{" "}
        <b>&ldquo;Overdue&rdquo;</b> to isolate it.
      </Callout>

      <div className="mb-4 overflow-hidden rounded-[14px] border border-border bg-card shadow-card">
        <div className="flex flex-wrap items-center gap-2.5 border-b border-border px-[18px] py-3">
          <ToggleGroup
            type="single"
            variant="outline"
            value={filters.status}
            onValueChange={(v) => v && setFilters((f) => ({ ...f, status: v as Status }))}
          >
            <ToggleGroupItem value="all" className="px-3 text-[12px] font-semibold">
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="Due now" className="px-3 text-[12px] font-semibold">
              Due now
            </ToggleGroupItem>
            <ToggleGroupItem value="Upcoming" className="px-3 text-[12px] font-semibold">
              Upcoming
            </ToggleGroupItem>
            <ToggleGroupItem value="Achieved" className="px-3 text-[12px] font-semibold">
              Achieved
            </ToggleGroupItem>
            <ToggleGroupItem value="Not date-linked" className="px-3 text-[12px] font-semibold">
              Not date-linked
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <TableToolbar
          search={filters.search}
          onSearchChange={(v) => setFilters((f) => ({ ...f, search: v.toLowerCase() }))}
          searchPlaceholder="Search block or milestone…"
          selects={[
            {
              value: filters.cat,
              onChange: (v) => setFilters((f) => ({ ...f, cat: v })),
              placeholder: "Category",
              options: [{ value: "all", label: "All categories" }, ...mileCats.map((c) => ({ value: c, label: c }))],
            },
            {
              value: filters.block,
              onChange: (v) => setFilters((f) => ({ ...f, block: v })),
              placeholder: "Block",
              options: [
                { value: "all", label: "All blocks" },
                ...mileBlocksList.map((b) => ({ value: b, label: `Block ${b}` })),
              ],
            },
          ]}
          countLabel={`Showing ${filtered.length} of ${MILE_DATA.length} milestones`}
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
                <TableRow key={`${r[0]}-${r[1]}-${i}`}>
                  <TableCell className="font-medium">Block {r[0]}</TableCell>
                  <TableCell>{r[1]}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">{pctLabel(r[2])}</TableCell>
                  <TableCell className="font-mono tabular-nums">{r[3] || "—"}</TableCell>
                  <TableCell>
                    <div className="flex flex-col items-start gap-1">
                      <Pill variant={MILE_STATUS_CLASS[r[4]] || "neutral"}>{r[4]}</Pill>
                      {r[10] === 1 && <span className="text-[10.5px] font-semibold text-critical">⚠ overdue</span>}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{r[5]}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">{fmtInrOrDash(r[6])}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filtered.length === 0 && (
            <div className="py-10 text-center text-sm text-muted-foreground">No milestones match these filters.</div>
          )}
        </div>
      </div>
    </div>
  )
}
