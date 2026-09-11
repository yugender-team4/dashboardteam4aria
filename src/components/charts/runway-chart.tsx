import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { ACTUAL_CUTOFF } from "@/data/flow"
import { runway } from "@/data/management"

const chartData = runway.map((r, i) => ({
  m: r.m,
  actual: i <= ACTUAL_CUTOFF ? r.closing : null,
  projected: i >= ACTUAL_CUTOFF ? r.closing : null,
  deficit: Math.min(r.closing, 0),
  isActual: i <= ACTUAL_CUTOFF,
}))

const xTicks = chartData.filter((d, i) => i === 0 || d.m.startsWith("Jan-")).map((d) => d.m)
const todayLabel = runway[ACTUAL_CUTOFF + 1]?.m

interface TooltipPayloadItem {
  payload: (typeof chartData)[number]
}

function ChartTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-card">
      <div className="mb-1 font-semibold">
        {d.m} · {d.isActual ? "Actual" : "Projected"}
      </div>
      <div className="text-muted-foreground">
        Closing balance: ₹{(d.actual ?? d.projected)?.toFixed(2)} Cr
      </div>
    </div>
  )
}

export function RunwayChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis
          dataKey="m"
          ticks={xTicks}
          interval={0}
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          axisLine={{ stroke: "var(--border)" }}
          tickLine={false}
        />
        <YAxis
          domain={[-220, 240]}
          ticks={[-200, -100, 0, 100, 200]}
          tickFormatter={(v) => `₹${v}`}
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          width={44}
        />
        <Tooltip content={<ChartTooltip />} />
        <ReferenceLine y={0} stroke="var(--border-strong)" />
        <Area
          dataKey="deficit"
          baseValue={0}
          fill="var(--critical-soft)"
          stroke="none"
          isAnimationActive={false}
        />
        <Line
          dataKey="actual"
          stroke="var(--foreground)"
          strokeWidth={2.25}
          dot={false}
          connectNulls
          isAnimationActive={false}
        />
        <Line
          dataKey="projected"
          stroke="var(--foreground)"
          strokeOpacity={0.55}
          strokeWidth={2}
          strokeDasharray="5 4"
          dot={false}
          connectNulls
          isAnimationActive={false}
        />
        {todayLabel && (
          <ReferenceLine
            x={todayLabel}
            stroke="var(--accent-crm)"
            strokeDasharray="2 3"
            label={{ value: "Today", position: "insideTopLeft", fill: "var(--accent-crm-ink)", fontSize: 11 }}
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  )
}
