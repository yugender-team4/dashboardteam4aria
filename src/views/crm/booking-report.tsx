import { useMemo, useState } from "react"

import { HeatmapTable } from "@/components/charts/heatmap-table"
import { TowerStackedBar } from "@/components/charts/tower-stacked-bar"
import { KpiCard, KpiRow } from "@/components/dashboard/kpi"
import { SectionCard } from "@/components/dashboard/section-card"
import { TableToolbar } from "@/components/dashboard/table-toolbar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useData } from "@/lib/data-context"
import { fmtInr, MONTH_ABBR, parseAosDate } from "@/lib/format"

interface FilterState {
  search: string
  cat: string
  block: string
}

const initialFilters: FilterState = { search: "", cat: "all", block: "all" }

export function BookingReport() {
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [sort, setSort] = useState<{ key: number; dir: 1 | -1 } | null>(null)
  const { aosData: AOS_DATA, aosBlocksList, aosCats } = useData()

  const totalUnits = AOS_DATA.length
  const totalValue = useMemo(() => AOS_DATA.reduce((s, r) => s + r[5], 0), [AOS_DATA])
  const avgValue = totalUnits ? totalValue / totalUnits : 0

  const filtered = useMemo(() => {
    let rows = AOS_DATA.filter((r) => {
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
    }
    return rows
  }, [AOS_DATA, filters, sort])

  const heatmap = useMemo(() => {
    const counts: Record<number, number[]> = {}
    const years: number[] = []
    AOS_DATA.forEach((r) => {
      const d = parseAosDate(r[4])
      if (!d) return
      if (!counts[d.year]) {
        counts[d.year] = new Array(12).fill(0)
        years.push(d.year)
      }
      counts[d.year][d.month]++
    })
    years.sort((a, b) => a - b)
    return { years, counts }
  }, [AOS_DATA])

  function toggleSort(k: number) {
    setSort((cur) => (cur?.key === k ? { key: k, dir: cur.dir === 1 ? -1 : 1 } : { key: k, dir: 1 }))
  }

  const columns: { k: number; label: string; num?: boolean }[] = [
    { k: 0, label: "Block" },
    { k: 1, label: "Flat No." },
    { k: 2, label: "Category" },
    { k: 3, label: "Customer" },
    { k: 5, label: "AOS Value", num: true },
    { k: 8, label: "CP / Source" },
  ]

  return (
    <div>
      <KpiRow>
        <KpiCard label="TOTAL UNITS BOOKED" value={totalUnits} sub="all sale categories" />
        <KpiCard label="TOTAL AOS VALUE" value={fmtInr(totalValue)} sub="booked to date" />
        <KpiCard label="AVG. UNIT VALUE" value={fmtInr(avgValue)} sub="per booked unit" />
        <KpiCard label="SALE CATEGORIES" value={aosCats.length} sub={`${aosBlocksList.length} blocks covered`} />
      </KpiRow>

      <SectionCard title="Tower-wise bookings" hint="Stacked by sale category · hover a segment for detail">
        <TowerStackedBar />
      </SectionCard>

      <SectionCard title="Peak booking months" hint="Booking intensity by month & year" tight>
        {heatmap.years.length ? (
          <HeatmapTable
            rowLabels={heatmap.years.map(String)}
            colLabels={MONTH_ABBR}
            matrix={heatmap.years.map((y) => heatmap.counts[y])}
          />
        ) : (
          <div className="py-6 text-center text-sm text-muted-foreground">No booking dates available.</div>
        )}
      </SectionCard>

      <div className="mb-4 overflow-hidden rounded-[14px] border border-border bg-card shadow-card">
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
          }}
        />
        <div className="max-h-[520px] overflow-auto">
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
                  <TableCell>{r[0]}</TableCell>
                  <TableCell className="font-medium">{r[1]}</TableCell>
                  <TableCell>{r[2]}</TableCell>
                  <TableCell>
                    {r[3] || "—"}
                    <div className="text-[10.8px] text-muted-foreground">Booked {r[4] || "—"}</div>
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">{fmtInr(r[5])}</TableCell>
                  <TableCell className="text-muted-foreground">{r[8] || "Direct"}</TableCell>
                </TableRow>
              ))}
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
