import { cn } from "@/lib/utils"
import type { BlockStatus } from "@/data/management"
import { stageNodes } from "@/data/management"

export function BlockStepper({ blocks }: { blocks: BlockStatus[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((b) => {
        const stageLabel =
          b.stage === 0 ? "Not started" : b.stage === 1 ? "Foundation complete" : `${stageNodes[b.stage - 1]} complete`
        const dueBadge = b.due > 0 ? `₹${b.due.toFixed(2)} Cr due now` : "No amount currently due"

        return (
          <div key={b.block}>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-1.5 text-[12.5px]">
              <span className="font-semibold">Block {b.block}</span>
              <span className="text-text-secondary">
                {stageLabel} · next: {b.next}
                {b.overdue && (
                  <span className="ml-1.5 rounded-full bg-critical-soft px-1.5 py-0.5 text-[10.5px] font-semibold text-critical">
                    delayed
                  </span>
                )}{" "}
                · {dueBadge}
              </span>
            </div>
            <div className="flex items-center">
              {stageNodes.map((label, i) => {
                const idx = i + 1
                const done = idx <= b.stage
                const next = idx === b.stage + 1
                return (
                  <div key={label} className="flex flex-1 items-center last:flex-none">
                    <div
                      title={label}
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center rounded-full border-[2.5px] border-border-strong bg-card",
                        done && "border-accent-eng bg-accent-eng",
                        next && "border-accent-eng",
                        next && b.overdue && "border-critical"
                      )}
                    >
                      {done && <span className="size-[5px] rounded-full bg-card" />}
                    </div>
                    {i < stageNodes.length - 1 && (
                      <div className={cn("h-[2px] flex-1", done ? "bg-accent-eng" : "bg-border-strong")} />
                    )}
                  </div>
                )
              })}
            </div>
            <div className="mt-0.5 flex justify-between font-mono text-[9px] text-muted-foreground">
              <span>{stageNodes[0]}</span>
              <span>{stageNodes[stageNodes.length - 1]}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
