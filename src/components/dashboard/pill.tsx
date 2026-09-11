import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

const variantClass = {
  good: "bg-good-soft text-good",
  warning: "bg-warning-soft text-warning",
  critical: "bg-critical-soft text-critical",
  neutral: "bg-surface-2 text-text-secondary",
}

export function Pill({ variant, children }: { variant: keyof typeof variantClass; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap",
        variantClass[variant]
      )}
    >
      <i className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  )
}
