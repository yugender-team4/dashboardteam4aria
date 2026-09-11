import { useMemo } from "react"

import { HeatmapTable } from "@/components/charts/heatmap-table"
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
import { catTotal, categories, managementKpis, milestoneSplit } from "@/data/management"
import { useData } from "@/lib/data-context"

const BUCKETS = ["0–10%", "10–20%", "20–30%", "30–40%", "40–50%", "50–60%", "60–70%", "70–80%", "80–90%", "90–100%"]

export function PresentReport() {
  const { aosData: AOS_DATA, aosBlocksList } = useData()
  const stageHeatmap = useMemo(() => {
    const byBlock: Record<string, number[]> = {}
    aosBlocksList.forEach((b) => (byBlock[b] = new Array(10).fill(0)))
    AOS_DATA.forEach((r) => {
      const idx = Math.min(9, Math.max(0, Math.floor((r[7] || 0) * 10)))
      if (byBlock[r[0]]) byBlock[r[0]][idx]++
    })
    return byBlock
  }, [AOS_DATA, aosBlocksList])

  return (
    <div>
      <KpiRow>
        <KpiCard
          label="AMOUNT RECEIVED"
          value={`₹${managementKpis.received.toFixed(2)} Cr`}
          sub={`${managementKpis.receivedPctOfAos.toFixed(1)}% of AOS value`}
        />
        <KpiCard label="AMOUNT CALLED" value={`₹${managementKpis.calledTotal.toFixed(2)} Cr`} sub="invoiced to date" />
        <KpiCard
          label="DUE & OUTSTANDING"
          value={`₹${managementKpis.dueOutstanding.toFixed(2)} Cr`}
          sub="of amount called"
        />
        <KpiCard
          label="FUTURE RECEIVABLE"
          value={`₹${managementKpis.futureReceivable.toFixed(2)} Cr`}
          sub="over life of project"
        />
      </KpiRow>

      <SectionCard
        title="Collection stage heatmap"
        hint="Customer count by tower & % of unit value collected (deciles) · darker = more customers"
        tight
      >
        <HeatmapTable
          rowLabels={aosBlocksList.map((b) => `Block ${b}`)}
          colLabels={BUCKETS}
          matrix={aosBlocksList.map((b) => stageHeatmap[b])}
        />
      </SectionCard>

      <SectionCard title="Bookings by category" hint="Present collection & receivable, by category" tight>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Flats</TableHead>
              <TableHead className="text-right">SFT sold</TableHead>
              <TableHead className="text-right">AOS value</TableHead>
              <TableHead className="text-right">Received</TableHead>
              <TableHead className="text-right">Due outstanding</TableHead>
              <TableHead className="text-right">Executed / pending</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((c) => (
              <TableRow key={c.name}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">{c.flats}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">{c.sft.toLocaleString("en-IN")}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">₹{c.aos.toFixed(2)} Cr</TableCell>
                <TableCell className="text-right font-mono tabular-nums">₹{c.recv.toFixed(2)} Cr</TableCell>
                <TableCell className="text-right font-mono tabular-nums">₹{c.dueOut.toFixed(2)} Cr</TableCell>
                <TableCell className="text-right font-mono tabular-nums">
                  {c.exec} / {c.pend}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-surface-2 font-bold">
              <TableCell>Total</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{catTotal.flats}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{catTotal.sft.toLocaleString("en-IN")}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">₹{catTotal.aos.toFixed(2)} Cr</TableCell>
              <TableCell className="text-right font-mono tabular-nums">₹{catTotal.recv.toFixed(2)} Cr</TableCell>
              <TableCell className="text-right font-mono tabular-nums">₹{catTotal.dueOut.toFixed(2)} Cr</TableCell>
              <TableCell className="text-right font-mono tabular-nums">
                {catTotal.exec} / {catTotal.pend}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </SectionCard>

      <SectionCard
        title="EOI / After-EOI — below vs. above milestone block"
        hint="% of block payment (20% A–D · 36% E–F) collected"
        tight
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Segment</TableHead>
              <TableHead className="text-right">Flats</TableHead>
              <TableHead className="text-right">AOS value</TableHead>
              <TableHead className="text-right">Received</TableHead>
              <TableHead className="text-right">Due</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {milestoneSplit.map((m) => (
              <TableRow key={m.cat}>
                <TableCell className="font-medium">{m.cat}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">{m.flats}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">₹{m.aos.toFixed(2)} Cr</TableCell>
                <TableCell className="text-right font-mono tabular-nums">₹{m.recv.toFixed(2)} Cr</TableCell>
                <TableCell className="text-right font-mono tabular-nums">₹{m.dueOut.toFixed(2)} Cr</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  )
}
