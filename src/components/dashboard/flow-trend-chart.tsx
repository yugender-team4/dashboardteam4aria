import { useMemo, useState } from "react"
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { SectionCard } from "@/components/dashboard/section-card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useData } from "@/lib/data-context"
import { fmtCr } from "@/lib/format"
import type { FlowRow } from "@/data/flow"

type Granularity = "monthly" | "quarterly" | "yearly"

interface Period {
  label: string
  opening: number
  inflowExisting: number
  inflowFuture: number
  otherReceipts: number
  totalInflow: number
  outflow: number
  closing: number
  actualShare: number // 0..1, fraction of the period's months that are "actual"
}

function quarterLabel(month: string): string {
  const [mon, yy] = month.split("-")
  const idx = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(mon)
  const q = Math.floor(idx / 3) + 1
  return `Q${q}-${yy}`
}

function yearLabel(month: string): string {
  return `20${month.split("-")[1]}`
}

function aggregate(rows: FlowRow[], granularity: Granularity): Period[] {
  if (granularity === "monthly") {
    return rows.map((r) => ({
      label: r[0],
      opening: r[1],
      inflowExisting: r[2],
      inflowFuture: r[3],
      otherReceipts: r[4],
      totalInflow: r[5],
      outflow: r[8],
      closing: r[9],
      actualShare: r[11],
    }))
  }
  const keyFn = granularity === "quarterly" ? quarterLabel : yearLabel
  const buckets = new Map<string, FlowRow[]>()
  rows.forEach((r) => {
    const key = keyFn(r[0])
    if (!buckets.has(key)) buckets.set(key, [])
    buckets.get(key)!.push(r)
  })
  return Array.from(buckets.entries()).map(([label, bucketRows]) => {
    const first = bucketRows[0]
    const last = bucketRows[bucketRows.length - 1]
    const sum = (i: number) => bucketRows.reduce((s, r) => s + (r[i] as number), 0)
    const actualCount = bucketRows.reduce((s, r) => s + r[11], 0)
    return {
      label,
      opening: first[1],
      inflowExisting: sum(2),
      inflowFuture: sum(3),
      otherReceipts: sum(4),
      totalInflow: sum(5),
      outflow: sum(8),
      closing: last[9],
      actualShare: actualCount / bucketRows.length,
    }
  })
}

interface TrendTooltipItem {
  payload: Period
}

function TrendTooltip({ active, payload }: { active?: boolean; payload?: TrendTooltipItem[] }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-card">
      <div className="mb-1 font-semibold">
        {d.label} · {d.actualShare === 1 ? "Actual" : d.actualShare === 0 ? "Projected" : "Mixed"}
      </div>
      <div className="space-y-0.5 text-muted-foreground">
        <div>Total inflow: {fmtCr(d.totalInflow)}</div>
        <div>Outflow: {fmtCr(d.outflow)}</div>
        <div className="font-semibold text-foreground">Closing: {fmtCr(d.closing)}</div>
      </div>
    </div>
  )
}

interface SourceTooltipItem {
  payload: Period
}

function SourceTooltip({ active, payload }: { active?: boolean; payload?: SourceTooltipItem[] }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-card">
      <div className="mb-1 font-semibold">{d.label}</div>
      <div className="space-y-0.5 text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <i className="inline-block size-2 rounded-sm" style={{ background: "var(--good)" }} />
          Existing sales: {fmtCr(d.inflowExisting)}
        </div>
        <div className="flex items-center gap-1.5">
          <i className="inline-block size-2 rounded-sm" style={{ background: "var(--chart-2)" }} />
          Future sales: {fmtCr(d.inflowFuture)}
        </div>
        <div className="flex items-center gap-1.5">
          <i className="inline-block size-2 rounded-sm" style={{ background: "var(--chart-4)" }} />
          Other receipts: {fmtCr(d.otherReceipts)}
        </div>
      </div>
    </div>
  )
}

export function FlowTrendChart() {
  const { flowData } = useData()
  const [granularity, setGranularity] = useState<Granularity>("monthly")

  const periods = useMemo(() => aggregate(flowData, granularity), [flowData, granularity])

  const xTicks = useMemo(() => {
    if (granularity === "monthly") {
      return periods.filter((d, i) => i === 0 || d.label.startsWith("Jan-")).map((d) => d.label)
    }
    return periods.map((d) => d.label)
  }, [periods, granularity])

  return (
    <SectionCard
      title="Cash flow trend"
      hint="Total inflow, outflow, and closing balance across the modelled horizon — toggle granularity to zoom out."
      legend={
        <ToggleGroup
          type="single"
          variant="outline"
          value={granularity}
          onValueChange={(v) => v && setGranularity(v as Granularity)}
        >
          <ToggleGroupItem value="monthly" className="px-3 text-[11.5px] font-semibold">
            Monthly
          </ToggleGroupItem>
          <ToggleGroupItem value="quarterly" className="px-3 text-[11.5px] font-semibold">
            Quarterly
          </ToggleGroupItem>
          <ToggleGroupItem value="yearly" className="px-3 text-[11.5px] font-semibold">
            Yearly
          </ToggleGroupItem>
        </ToggleGroup>
      }
    >
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={periods} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="label"
            ticks={xTicks}
            interval={0}
            tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `₹${v}`}
            tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
            width={44}
          />
          <Tooltip content={<TrendTooltip />} cursor={{ fill: "var(--surface-2)" }} />
          <Bar dataKey="totalInflow" name="Total inflow" fill="var(--good)" radius={[3, 3, 0, 0]} isAnimationActive={false} />
          <Bar dataKey="outflow" name="Outflow" fill="var(--accent-eng)" radius={[3, 3, 0, 0]} isAnimationActive={false} />
          <Line
            dataKey="closing"
            name="Closing balance"
            stroke="var(--foreground)"
            strokeWidth={2.25}
            dot={false}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="mb-1 flex flex-wrap gap-3.5 text-[11.5px] text-text-secondary">
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block size-2.5 rounded-sm" style={{ background: "var(--good)" }} />
          Total inflow
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block size-2.5 rounded-sm" style={{ background: "var(--accent-eng)" }} />
          Outflow
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block h-0.5 w-3 self-center rounded-sm" style={{ background: "var(--foreground)" }} />
          Closing balance
        </span>
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <div className="mb-2.5 px-0.5 text-[11.5px] font-semibold tracking-[0.06em] text-muted-foreground uppercase">
          Inflow source breakdown
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart data={periods} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="label"
              ticks={xTicks}
              interval={0}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `₹${v}`}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<SourceTooltip />} cursor={{ fill: "var(--surface-2)" }} />
            <Bar dataKey="inflowExisting" name="Existing sales" stackId="src" fill="var(--good)" isAnimationActive={false} />
            <Bar dataKey="inflowFuture" name="Future sales" stackId="src" fill="var(--chart-2)" isAnimationActive={false} />
            <Bar
              dataKey="otherReceipts"
              name="Other receipts"
              stackId="src"
              fill="var(--chart-4)"
              radius={[3, 3, 0, 0]}
              isAnimationActive={false}
          />
            <Area dataKey="totalInflow" fill="none" stroke="none" isAnimationActive={false} />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3.5 text-[11.5px] text-text-secondary">
          <span className="inline-flex items-center gap-1.5">
            <i className="inline-block size-2.5 rounded-sm" style={{ background: "var(--good)" }} />
            Existing sales
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="inline-block size-2.5 rounded-sm" style={{ background: "var(--chart-2)" }} />
            Future sales
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="inline-block size-2.5 rounded-sm" style={{ background: "var(--chart-4)" }} />
            Other receipts
          </span>
        </div>
      </div>
    </SectionCard>
  )
}
