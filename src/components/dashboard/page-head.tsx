import type { ReactNode } from "react"

interface PageHeadProps {
  eyebrow: string
  swatchClassName?: string
  title: string
  description: ReactNode
  actions?: ReactNode
}

export function PageHead({ eyebrow, swatchClassName = "bg-foreground", title, description, actions }: PageHeadProps) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="mb-1.5 flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
          <span className={`size-2 rounded-[2px] ${swatchClassName}`} />
          {eyebrow}
        </div>
        <h1 className="text-[22px]">{title}</h1>
        <div className="mt-1 max-w-[64ch] text-[13px] text-text-secondary">{description}</div>
      </div>
      {actions}
    </div>
  )
}
