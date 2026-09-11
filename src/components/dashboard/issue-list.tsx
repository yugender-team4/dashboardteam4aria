export function IssueList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col">
      {items.map((text, i) => (
        <div
          key={i}
          className="flex gap-2.5 border-b border-border py-2.5 last:border-b-0 last:pb-0"
        >
          <div className="flex size-5 shrink-0 items-center justify-center rounded-md bg-surface-2 font-mono text-[10.5px] font-semibold text-text-secondary">
            {i + 1}
          </div>
          <div className="text-[12.7px] leading-relaxed text-ink-soft">{text}</div>
        </div>
      ))}
    </div>
  )
}
