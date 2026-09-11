import { useMemo, useState } from "react"

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
import { fmtInr } from "@/lib/format"

interface FilterState {
  search: string
  cat: string
  block: string
}

const initialFilters: FilterState = { search: "", cat: "all", block: "all" }
type SortKey = number | "balance"

export function CollectionReport() {
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 } | null>(null)
  const { aosData: AOS_DATA, aosBlocksList, aosCats } = useData()

  const { totalValue, totalReceived } = useMemo(() => {
    let v = 0
    let r = 0
    AOS_DATA.forEach((row) => {
      v += row[5]
      r += row[6]
    })
    return { totalValue: v, totalReceived: r }
  }, [AOS_DATA])
  const pct = totalValue ? (100 * totalReceived) / totalValue : 0

  const byTower = useMemo(() => {
    const acc: Record<string, { units: number; tsc: number; recv: number }> = {}
    aosBlocksList.forEach((b) => (acc[b] = { units: 0, tsc: 0, recv: 0 }))
    AOS_DATA.forEach((r) => {
      const d = acc[r[0]]
      if (!d) return
      d.units++
      d.tsc += r[5]
      d.recv += r[6]
    })
    const rows = aosBlocksList
      .map((b) => {
        const d = acc[b]
        const bal = d.tsc - d.recv
        const p = d.tsc ? (100 * d.recv) / d.tsc : 0
        return { b, d, bal, p }
      })
      .sort((a, c) => c.d.tsc - a.d.tsc)
    const totals = rows.reduce(
      (t, r) => ({ units: t.units + r.d.units, tsc: t.tsc + r.d.tsc, recv: t.recv + r.d.recv }),
      { units: 0, tsc: 0, recv: 0 }
    )
    const totPct = totals.tsc ? (100 * totals.recv) / totals.tsc : 0
    return { rows, totals, totPct }
  }, [AOS_DATA, aosBlocksList])

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
        const va = sort.key === "balance" ? a[5] - a[6] : a[sort.key]
        const vb = sort.key === "balance" ? b[5] - b[6] : b[sort.key]
        if (typeof va === "string" && typeof vb === "string") {
          return va.toLowerCase().localeCompare(vb.toLowerCase()) * sort.dir
        }
        return ((va as number) - (vb as number)) * sort.dir
      })
    }
    return rows
  }, [AOS_DATA, filters, sort])

  function toggleSort(k: SortKey) {
    setSort((cur) => (cur?.key === k ? { key: k, dir: cur.dir === 1 ? -1 : 1 } : { key: k, dir: 1 }))
  }

  const columns: { k: SortKey; label: string; num?: boolean }[] = [
    { k: 0, label: "Block" },
    { k: 1, label: "Flat No." },
    { k: 2, label: "Category" },
    { k: 3, label: "Customer" },
    { k: 5, label: "AOS Value", num: true },
    { k: 6, label: "Received", num: true },
    { k: 7, label: "% Collected", num: true },
    { k: "balance", label: "Balance due", num: true },
  ]

  return (
    <div>
      <KpiRow>
        <KpiCard label="TOTAL AOS VALUE" value={fmtInr(totalValue)} sub={`across ${AOS_DATA.length} units`} />
        <KpiCard label="TOTAL RECEIVED" value={fmtInr(totalReceived)} sub={`${pct.toFixed(1)}% collected`} />
        <KpiCard label="BALANCE DUE" value={fmtInr(Math.max(0, totalValue - totalReceived))} sub="across booked units" />
      </KpiRow>

      <SectionCard title="Collection by tower" hint="TSC (AOS value), received and balance due, by block" tight>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Block</TableHead>
              <TableHead className="text-right">Units</TableHead>
              <TableHead className="text-right">TSC (AOS value)</TableHead>
              <TableHead className="text-right">Received</TableHead>
              <TableHead className="text-right">Balance due</TableHead>
              <TableHead className="text-right">% collected</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {byTower.rows.map((r) => (
              <TableRow key={r.b}>
                <TableCell className="font-medium">Block {r.b}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">{r.d.units}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">{fmtInr(r.d.tsc)}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">{fmtInr(r.d.recv)}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">{fmtInr(Math.max(0, r.bal))}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">{r.p.toFixed(1)}%</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-surface-2 font-bold">
              <TableCell>Total</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{byTower.totals.units}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{fmtInr(byTower.totals.tsc)}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{fmtInr(byTower.totals.recv)}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">
                {fmtInr(Math.max(0, byTower.totals.tsc - byTower.totals.recv))}
              </TableCell>
              <TableCell className="text-right font-mono tabular-nums">{byTower.totPct.toFixed(1)}%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
              {filtered.map((r, i) => {
                const balance = r[5] - r[6]
                return (
                  <TableRow key={`${r[0]}-${r[1]}-${i}`}>
                    <TableCell>{r[0]}</TableCell>
                    <TableCell className="font-medium">{r[1]}</TableCell>
                    <TableCell>{r[2]}</TableCell>
                    <TableCell>{r[3] || "—"}</TableCell>
                    <TableCell className="text-right font-mono tabular-nums">{fmtInr(r[5])}</TableCell>
                    <TableCell className="text-right font-mono tabular-nums">{fmtInr(r[6])}</TableCell>
                    <TableCell className="text-right font-mono tabular-nums">{Math.round(r[7] * 100)}%</TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {fmtInr(Math.max(0, balance))}
                    </TableCell>
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
