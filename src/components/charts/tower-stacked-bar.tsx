import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { useData } from "@/lib/data-context"
import { CATEGORY_PALETTE } from "@/lib/crm-helpers"

interface TooltipPayloadItem {
  dataKey: string
  value: number
  color: string
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }) {
  if (!active || !payload?.length) return null
  const nonZero = payload.filter((p) => p.value)
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-card">
      <div className="mb-1 font-semibold">{label}</div>
      {nonZero.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-1.5 text-muted-foreground">
          <i className="inline-block size-2 rounded-sm" style={{ background: p.color }} />
          {p.dataKey}: {p.value} unit{p.value === 1 ? "" : "s"}
        </div>
      ))}
    </div>
  )
}

export function TowerStackedBar() {
  const { aosData, aosCats, aosBlocksList } = useData()

  const catColor = useMemo(() => {
    const m: Record<string, string> = {}
    aosCats.forEach((c, i) => {
      m[c] = CATEGORY_PALETTE[i % CATEGORY_PALETTE.length]
    })
    return m
  }, [aosCats])

  const chartData = useMemo(() => {
    const byBlock: Record<string, Record<string, number>> = {}
    aosBlocksList.forEach((b) => {
      byBlock[b] = {}
      aosCats.forEach((c) => (byBlock[b][c] = 0))
    })
    aosData.forEach((r) => {
      if (byBlock[r[0]]) byBlock[r[0]][r[2]] = (byBlock[r[0]][r[2]] || 0) + 1
    })
    return aosBlocksList
      .map((b) => {
        const row: Record<string, number | string> = { block: `Block ${b}` }
        let total = 0
        aosCats.forEach((c) => {
          row[c] = byBlock[b][c]
          total += byBlock[b][c]
        })
        row.total = total
        return row
      })
      .sort((a, b) => (b.total as number) - (a.total as number))
  }, [aosData, aosBlocksList, aosCats])

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 8, left: 0, bottom: 4 }}>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="block"
            tick={{ fontSize: 10.5, fill: "var(--muted-foreground)" }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
          />
          <YAxis tick={{ fontSize: 10.5, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={30} />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--surface-2)" }} />
          {aosCats.map((c) => (
            <Bar key={c} dataKey={c} stackId="a" fill={catColor[c]} isAnimationActive={false} />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-1.5 flex flex-wrap gap-3.5 text-[11.5px] text-text-secondary">
        {aosCats.map((c) => (
          <span key={c} className="inline-flex items-center gap-1.5">
            <i className="inline-block size-2.5 rounded-sm" style={{ background: catColor[c] }} />
            {c}
          </span>
        ))}
      </div>
    </>
  )
}
