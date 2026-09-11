import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function KpiRow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(192px,1fr))]">
      {children}
    </div>
  )
}

interface KpiCardProps {
  label: string
  value: ReactNode
  sub?: ReactNode
  delta?: { text: string; direction: "up" | "down" | "flat" }
  color?: string
  active?: boolean
  onClick?: () => void
  dotColor?: string
}

export function KpiCard({ label, value, sub, delta, color, active, onClick, dotColor }: KpiCardProps) {
  const clickable = Boolean(onClick)
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-xl border border-border bg-card px-4 pt-4 pb-3.5 shadow-card",
        clickable && "cursor-pointer transition-colors hover:border-border-strong",
        active && "border-accent-eng shadow-[0_0_0_1px_var(--accent-eng)]"
      )}
    >
      <div className="flex items-center text-[11px] font-semibold tracking-wide text-muted-foreground">
        {dotColor && <i className="mr-1.5 inline-block size-2 rounded-[2px]" style={{ background: dotColor }} />}
        {label}
      </div>
      <div
        className="mt-1.5 font-display text-2xl font-extrabold tracking-tight tabular-nums"
        style={color ? { color } : undefined}
      >
        {value}
      </div>
      {delta && (
        <div
          className={cn(
            "mt-1.5 flex items-center gap-1 text-[11.5px] font-semibold",
            delta.direction === "up" && "text-good",
            delta.direction === "down" && "text-critical",
            delta.direction === "flat" && "text-muted-foreground"
          )}
        >
          {delta.direction === "up" ? "▲" : delta.direction === "down" ? "▼" : "—"} {delta.text}
        </div>
      )}
      {sub && <div className="mt-1.5 text-[11px] text-muted-foreground">{sub}</div>}
    </div>
  )
}
