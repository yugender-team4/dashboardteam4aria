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
import { AOS_STAGE_CLASS, AOS_STAGE_LABEL } from "@/data/aos"
import { useData } from "@/lib/data-context"
import { fmtInr } from "@/lib/format"

interface FilterState {
  search: string
  stage: "all" | "0" | "1" | "2"
  cat: string
  block: string
  priorityOnly: boolean
}

const initialFilters: FilterState = { search: "", stage: "all", cat: "all", block: "all", priorityOnly: false }

const columns: { k: number; label: string; num?: boolean }[] = [
  { k: 0, label: "Block" },
  { k: 1, label: "Flat No." },
  { k: 2, label: "Category" },
  { k: 3, label: "Customer" },
  { k: 5, label: "AOS Value", num: true },
  { k: 6, label: "Received", num: true },
  { k: 7, label: "% Recv", num: true },
  { k: 9, label: "Stage" },
  { k: 8, label: "CP / Source" },
  { k: 11, label: "Notes" },
]

export function AosTrackerView() {
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [sort, setSort] = useState<{ key: number; dir: 1 | -1 } | null>(null)
  const [activeKpi, setActiveKpi] = useState<number | null>(null)
  const { aosData: AOS_DATA, aosBlocksList, aosCats } = useData()

  const { aosTotal, counts, priorityCount, priorityValue } = useMemo(() => {
    const c = [0, 0, 0]
    let pCount = 0
    let pValue = 0
    AOS_DATA.forEach((r) => {
      c[r[9]]++
      if (r[10]) {
        pCount++
        pValue += r[6]
      }
    })
    return { aosTotal: AOS_DATA.length, counts: c, priorityCount: pCount, priorityValue: pValue }
  }, [AOS_DATA])

  function applyKpi(i: number, stage: FilterState["stage"], priorityOnly: boolean) {
    setActiveKpi(i)
    setFilters((f) => ({ ...f, stage, priorityOnly }))
  }

  const filtered = useMemo(() => {
    let rows = AOS_DATA.filter((r) => {
      if (filters.priorityOnly && r[10] !== 1) return false
      if (filters.stage !== "all" && String(r[9]) !== filters.stage) return false
      if (filters.cat !== "all" && r[2] !== filters.cat) return false
      if (filters.block !== "all" && r[0] !== filters.block) return false
      if (filters.search) {
        const hay = `${r[3]} ${r[1]} ${r[8]}`.toLowerCase()
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
      rows = rows.slice().sort((a, b) => {
        if (a[10] !== b[10]) return b[10] - a[10]
        if (a[9] !== b[9]) return a[9] - b[9]
        return b[7] - a[7]
      })
    }
    return rows
  }, [AOS_DATA, filters, sort])

  function toggleSort(k: number) {
    setSort((cur) => (cur?.key === k ? { key: k, dir: cur.dir === 1 ? -1 : 1 } : { key: k, dir: 1 }))
  }

  const kpiDefs = [
    { label: "TOTAL BOOKED", value: aosTotal, sub: "all sale categories", color: "var(--foreground)" },
    {
      label: "NOT PREPARED",
      value: counts[0],
      sub: `${(Math.round((1000 * counts[0]) / aosTotal) / 10).toFixed(1)}% of bookings`,
      color: "var(--muted-foreground)",
    },
    {
      label: "PENDING MGT SIGNATURE",
      value: counts[1],
      sub: `${(Math.round((1000 * counts[1]) / aosTotal) / 10).toFixed(1)}% of bookings`,
      color: "var(--warning)",
    },
    {
      label: "EXECUTED",
      value: counts[2],
      sub: `${(Math.round((1000 * counts[2]) / aosTotal) / 10).toFixed(1)}% of bookings`,
      color: "var(--good)",
    },
    {
      label: "NEEDS ATTENTION",
      value: priorityCount,
      sub: `${fmtInr(priorityValue)} already received`,
      color: "var(--critical)",
    },
  ]

  return (
    <div>
      <PageHead
        eyebrow="AOS Tracker · Agreement of Sale execution"
        swatchClassName="bg-warning"
        title="Unit-by-unit AOS status"
        description="All 811 booked units, tracked from AOS preparation through customer signature to final execution by MGT."
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
            onClick={() =>
              i === 0
                ? applyKpi(0, "all", false)
                : i === 4
                  ? applyKpi(4, "all", true)
                  : applyKpi(i, String(i - 1) as FilterState["stage"], false)
            }
          />
        ))}
      </KpiRow>

      <FunnelBar
        segments={[
          { label: AOS_STAGE_LABEL[0], value: counts[0], color: "var(--muted-foreground)" },
          { label: AOS_STAGE_LABEL[1], value: counts[1], color: "var(--warning)" },
          { label: AOS_STAGE_LABEL[2], value: counts[2], color: "var(--good)" },
        ]}
      />

      <Callout variant="critical" title={`${priorityCount} units have collected 20%+ of value with the AOS still not fully executed`}>
        Together these units account for roughly {fmtInr(priorityValue)} already received against agreements that are
        either not yet prepared or awaiting the MGT counter-signature. Click the <b>&ldquo;Needs attention&rdquo;</b>{" "}
        tile to filter to just these.
      </Callout>

      <div className="mb-4 overflow-hidden rounded-[14px] border border-border bg-card shadow-card">
        <div className="flex flex-wrap items-center gap-2.5 border-b border-border px-[18px] py-3">
          <ToggleGroup
            type="single"
            variant="outline"
            value={filters.stage}
            onValueChange={(v) => v && setFilters((f) => ({ ...f, stage: v as FilterState["stage"] }))}
          >
            <ToggleGroupItem value="all" className="px-3 text-[12px] font-semibold">
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="0" className="px-3 text-[12px] font-semibold">
              Not prepared
            </ToggleGroupItem>
            <ToggleGroupItem value="1" className="px-3 text-[12px] font-semibold">
              Pending MGT
            </ToggleGroupItem>
            <ToggleGroupItem value="2" className="px-3 text-[12px] font-semibold">
              Executed
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <TableToolbar
          search={filters.search}
          onSearchChange={(v) => setFilters((f) => ({ ...f, search: v.toLowerCase() }))}
          selects={[
            {
              value: filters.cat,
              onChange: (v) => setFilters((f) => ({ ...f, cat: v })),
              placeholder: "Category",
              options: [{ value: "all", label: "All categories" }, ...aosCats.map((c) => ({ value: c, label: c }))],
            },
            {
              value: filters.block,
              onChange: (v) => setFilters((f) => ({ ...f, block: v })),
              placeholder: "Block",
              options: [
                { value: "all", label: "All blocks" },
                ...aosBlocksList.map((b) => ({ value: b, label: `Block ${b}` })),
              ],
            },
          ]}
          countLabel={`Showing ${filtered.length} of ${AOS_DATA.length} units`}
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
              {filtered.map((r, i) => {
                const stage = r[9]
                const stageTxt = AOS_STAGE_LABEL[stage]
                const stageCls = AOS_STAGE_CLASS[stage]
                return (
                  <TableRow key={`${r[0]}-${r[1]}-${i}`}>
                    <TableCell>{r[0]}</TableCell>
                    <TableCell className="font-medium">{r[1]}</TableCell>
                    <TableCell>{r[2]}</TableCell>
                    <TableCell>
                      {r[3] || "—"}
                      <div className="text-[10.8px] text-muted-foreground">{r[4]}</div>
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">{fmtInr(r[5])}</TableCell>
                    <TableCell className="text-right font-mono tabular-nums">{fmtInr(r[6])}</TableCell>
                    <TableCell className="text-right font-mono tabular-nums">{Math.round(r[7] * 100)}%</TableCell>
                    <TableCell>
                      <div className="flex flex-col items-start gap-1">
                        <Pill variant={stageCls}>{stageTxt}</Pill>
                        {r[10] === 1 && (
                          <span className="text-[10.5px] font-semibold text-critical">⚠ needs attention</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{r[8] || "—"}</TableCell>
                    <TableCell className="text-muted-foreground">{r[11] || "—"}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          {filtered.length === 0 && (
            <div className="py-10 text-center text-sm text-muted-foreground">No units match these filters.</div>
          )}
        </div>
      </div>
    </div>
  )
}
