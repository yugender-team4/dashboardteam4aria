import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface SectionCardProps {
  title: ReactNode
  hint?: ReactNode
  legend?: ReactNode
  tight?: boolean
  children: ReactNode
  className?: string
}

export function SectionCard({ title, hint, legend, tight, children, className }: SectionCardProps) {
  return (
    <div className={cn("mb-4 overflow-hidden rounded-[14px] border border-border bg-card shadow-card", className)}>
      <div className="flex items-start justify-between gap-2.5 px-[18px] pt-4 pb-1">
        <div>
          <h2 className="text-[15px] font-bold">{title}</h2>
          {hint && <div className="mt-0.5 text-[11.5px] text-muted-foreground">{hint}</div>}
        </div>
        {legend && <div className="flex flex-wrap gap-3.5 text-[11.5px] text-text-secondary">{legend}</div>}
      </div>
      <div className={cn("px-[18px] pb-[18px]", tight ? "pt-0.5" : "pt-2")}>{children}</div>
    </div>
  )
}
