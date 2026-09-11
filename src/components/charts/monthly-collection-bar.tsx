import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { useData } from "@/lib/data-context"
import { fmtCr } from "@/lib/format"

interface ChartDatum {
  month: string
  collected: number
}

interface TooltipPayloadItem {
  payload: ChartDatum
}

function ChartTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-card">
      <div className="mb-1 font-semibold">{d.month}</div>
      <div className="text-muted-foreground">Collected: {fmtCr(d.collected)}</div>
    </div>
  )
}

export function MonthlyCollectionBar() {
  const { flowData } = useData()
  const chartData = useMemo<ChartDatum[]>(
    () => flowData.filter((r) => r[11] === 1).map((r) => ({ month: r[0], collected: r[5] })),
    [flowData]
  )

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 10.5, fill: "var(--muted-foreground)" }}
          axisLine={{ stroke: "var(--border)" }}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => fmtCr(v)}
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          width={70}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--surface-2)" }} />
        <Bar dataKey="collected" fill="var(--accent-crm)" radius={[4, 4, 0, 0]} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  )
}
