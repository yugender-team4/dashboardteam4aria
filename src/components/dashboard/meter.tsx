interface MeterProps {
  label: string
  value: string
  widthPct: number
  color: string
  border?: string
  valueColor?: string
}

export function Meter({ label, value, widthPct, color, border, valueColor }: MeterProps) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-[12.4px]">
        <span>{label}</span>
        <b className="font-mono tabular-nums" style={valueColor ? { color: valueColor } : undefined}>
          {value}
        </b>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-2">
        <span
          className="block h-full rounded-full"
          style={{ width: `${widthPct}%`, background: color, border: border ? `1px solid ${border}` : undefined }}
        />
      </div>
    </div>
  )
}
