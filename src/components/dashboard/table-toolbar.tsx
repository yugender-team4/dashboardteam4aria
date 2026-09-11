import { Search } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FilterSelectDef {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  placeholder: string
}

interface TableToolbarProps {
  search: string
  onSearchChange: (v: string) => void
  searchPlaceholder?: string
  selects?: FilterSelectDef[]
  countLabel: string
  onReset: () => void
}

export function TableToolbar({
  search,
  onSearchChange,
  searchPlaceholder = "Search customer, flat no. or CP…",
  selects = [],
  countLabel,
  onReset,
}: TableToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 border-b border-border px-[18px] py-3">
      <div className="flex h-9 min-w-[200px] flex-1 items-center gap-2 rounded-md border border-input px-3 text-sm text-muted-foreground">
        <Search className="size-3.5 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      {selects.map((sel, i) => (
        <Select key={i} value={sel.value} onValueChange={sel.onChange}>
          <SelectTrigger size="sm" className="min-w-[130px]">
            <SelectValue placeholder={sel.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {sel.options.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}

      <div className="flex-1" />

      <span className="font-mono text-[11.5px] whitespace-nowrap text-muted-foreground">{countLabel}</span>
      <button
        type="button"
        onClick={onReset}
        className="rounded-md border border-border px-2.5 py-1.5 text-[11.5px] font-semibold text-text-secondary hover:border-border-strong hover:text-foreground"
      >
        Reset filters
      </button>
    </div>
  )
}
