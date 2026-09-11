import { useMemo } from "react"

import { MonthlyCollectionBar } from "@/components/charts/monthly-collection-bar"
import { KpiCard, KpiRow } from "@/components/dashboard/kpi"
import { SectionCard } from "@/components/dashboard/section-card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useData } from "@/lib/data-context"
import { fmtCr } from "@/lib/format"

export function MonthlyReport() {
  const { flowData: FLOW_DATA } = useData()
  const actualRows = useMemo(() => FLOW_DATA.filter((r) => r[11] === 1), [FLOW_DATA])

  const totals = useMemo(() => {
    let totalCollected = 0
    let fromExisting = 0
    let fromFuture = 0
    let otherReceipts = 0
    actualRows.forEach((r) => {
      totalCollected += r[5]
      fromExisting += r[2]
      fromFuture += r[3]
      otherReceipts += r[4]
    })
    const avgMonthly = actualRows.length ? totalCollected / actualRows.length : 0
    return { totalCollected, fromExisting, fromFuture, otherReceipts, avgMonthly }
  }, [actualRows])

  let cum = 0
  const rows = actualRows.map((r) => {
    cum += r[5]
    return { month: r[0], existing: r[2], future: r[3], other: r[4], total: r[5], cum }
  })

  return (
    <div>
      <KpiRow>
        <KpiCard
          label="TOTAL COLLECTED TO DATE"
          value={fmtCr(totals.totalCollected)}
          sub={`${actualRows.length} months of actuals`}
        />
        <KpiCard label="FROM EXISTING SALES" value={fmtCr(totals.fromExisting)} sub="bookings already made" />
        <KpiCard label="OTHER RECEIPTS" value={fmtCr(totals.otherReceipts)} sub="non-sales inflows" />
        <KpiCard label="AVG. MONTHLY COLLECTION" value={fmtCr(totals.avgMonthly)} sub="per actual month" />
      </KpiRow>

      <SectionCard title="Monthly collection trend" hint="Total collected per month · actual months only">
        <MonthlyCollectionBar />
      </SectionCard>

      <SectionCard
        title="Overall collection — month by month"
        hint="Actual bank collections, month by month (from the Inflow & Outflow model)"
        tight
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead className="text-right">Existing sales</TableHead>
              <TableHead className="text-right">Future sales</TableHead>
              <TableHead className="text-right">Other receipts</TableHead>
              <TableHead className="text-right">Total collection</TableHead>
              <TableHead className="text-right">Cumulative</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.month}>
                <TableCell className="font-medium">{r.month}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">{fmtCr(r.existing)}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">{fmtCr(r.future)}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">{fmtCr(r.other)}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">{fmtCr(r.total)}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">{fmtCr(r.cum)}</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-surface-2 font-bold">
              <TableCell>Total</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{fmtCr(totals.fromExisting)}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{fmtCr(totals.fromFuture)}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{fmtCr(totals.otherReceipts)}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{fmtCr(totals.totalCollected)}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{fmtCr(cum)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  )
}
