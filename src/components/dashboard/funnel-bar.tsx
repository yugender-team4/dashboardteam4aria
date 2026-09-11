interface FunnelSegment {
  label: string
  value: number
  color: string
}

export function FunnelBar({ segments }: { segments: FunnelSegment[] }) {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1
  return (
    <div className="mb-4 flex h-2.5 overflow-hidden rounded-full shadow-card">
      {segments.map((seg) => (
        <span
          key={seg.label}
          title={`${seg.label}: ${seg.value}`}
          style={{ width: `${(100 * seg.value) / total}%`, background: seg.color }}
        />
      ))}
    </div>
  )
}
