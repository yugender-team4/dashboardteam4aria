interface BulletDatum {
  name: string
  total: number
  actual: number
}

interface BulletBarProps {
  data: BulletDatum[]
  totalLabel: string
  actualLabel: string
  unit?: string
  totalColor?: string
  actualColor?: string
}

export function BulletBar({
  data,
  totalLabel,
  actualLabel,
  unit = " Cr",
  totalColor = "var(--surface-2)",
  actualColor = "var(--foreground)",
}: BulletBarProps) {
  const maxV = Math.max(...data.map((d) => d.total)) * 1.12

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-4 text-[11.5px] text-text-secondary">
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: totalColor }} />
          {totalLabel}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: actualColor }} />
          {actualLabel}
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {data.map((d) => {
          const totalPct = (d.total / maxV) * 100
          const actualPct = (d.actual / maxV) * 100
          return (
            <div key={d.name} className="flex items-center gap-3">
              <div className="w-[92px] shrink-0 truncate text-[12.5px] font-medium">{d.name}</div>
              <div className="relative h-[22px] flex-1 overflow-hidden rounded-md" style={{ background: totalColor }}>
                <div
                  className="absolute inset-y-0 left-0"
                  style={{ width: `${Math.min(Math.max(totalPct, 1), 100)}%`, background: totalColor }}
                />
                <div
                  className="absolute inset-y-0 left-0"
                  style={{ width: `${Math.min(Math.max(actualPct, 1), 100)}%`, background: actualColor }}
                />
                <div className="absolute inset-y-0 right-2 flex items-center text-[11px] font-mono font-semibold whitespace-nowrap">
                  ₹{d.total.toFixed(2)}
                  {unit}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
