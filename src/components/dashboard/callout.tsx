import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface CalloutProps {
  variant: "critical" | "warning"
  icon?: ReactNode
  title: ReactNode
  children: ReactNode
}

export function Callout({ variant, icon = "⚠️", title, children }: CalloutProps) {
  return (
    <div
      className={cn(
        "mb-4 flex items-start gap-3 rounded-xl border p-3.5",
        variant === "critical" && "border-critical/30 bg-critical-soft",
        variant === "warning" && "border-warning/30 bg-warning-soft"
      )}
    >
      <div className="shrink-0 text-base leading-none">{icon}</div>
      <div>
        <div className="mb-0.5 text-[13px] font-bold">{title}</div>
        <div className="text-[12.4px] leading-relaxed text-text-secondary">{children}</div>
      </div>
    </div>
  )
}
