import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { blocks } from "@/data/management"

const chartData = blocks.map((b) => ({
  block: `Block ${b.block}`,
  due: b.due,
  overdue: b.overdue,
  next: b.next,
}))

interface TooltipPayloadItem {
  payload: (typeof chartData)[number]
}

function ChartTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-card">
      <div className="mb-1 font-semibold">{d.block}</div>
      <div className="text-muted-foreground">Due now: ₹{d.due.toFixed(2)} Cr</div>
      <div className="text-muted-foreground">Next: {d.next}</div>
    </div>
  )
}

export function BlockDueBar() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 8, right: 40, left: 8, bottom: 4 }}
      >
        <CartesianGrid horizontal={false} stroke="var(--border)" />
        <XAxis
          type="number"
          domain={[0, 55]}
          ticks={[0, 10, 20, 30, 40, 50]}
          tick={{ fontSize: 10.5, fill: "var(--muted-foreground)" }}
          axisLine={{ stroke: "var(--border)" }}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="block"
          tick={{ fontSize: 11.5, fill: "var(--foreground)" }}
          axisLine={false}
          tickLine={false}
          width={64}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--surface-2)" }} />
        <Bar dataKey="due" radius={[0, 5, 5, 0]} isAnimationActive={false} background={{ fill: "var(--surface-2)" }}>
          {chartData.map((d) => (
            <Cell key={d.block} fill={d.overdue ? "var(--critical)" : "var(--accent-eng)"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
