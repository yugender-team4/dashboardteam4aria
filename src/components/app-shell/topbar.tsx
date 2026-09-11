import { Menu, Moon, RefreshCw, Sun } from "lucide-react"

import { cn } from "@/lib/utils"
import type { Theme } from "@/hooks/use-theme"

interface TopbarProps {
  onOpenMenu: () => void
  dataAsOf: string
  onRefresh: () => void
  isRefreshing: boolean
  refreshError: boolean
  theme: Theme
  onToggleTheme: () => void
}

export function Topbar({
  onOpenMenu,
  dataAsOf,
  onRefresh,
  isRefreshing,
  refreshError,
  theme,
  onToggleTheme,
}: TopbarProps) {
  return (
    <div className="sticky top-0 z-10 flex items-center gap-3.5 border-b border-border bg-background px-4 py-3 md:px-7">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Toggle navigation"
        className="flex size-[34px] items-center justify-center rounded-lg border border-border bg-card text-foreground md:hidden"
      >
        <Menu className="size-4" />
      </button>

      <div className="flex-1" />

      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "rounded-full border border-border bg-card px-3 py-1.5 font-mono text-[11.5px] whitespace-nowrap text-text-secondary",
            refreshError && "border-critical text-critical"
          )}
        >
          {dataAsOf}
        </span>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="Refresh live data from SharePoint"
          title="Pull latest data from SharePoint"
          className={cn(
            "flex h-[34px] w-auto items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-[12.5px] font-semibold text-text-secondary",
            "hover:border-border-strong hover:text-foreground disabled:cursor-default disabled:opacity-60",
            refreshError && "border-critical text-critical"
          )}
        >
          <RefreshCw className={cn("size-4", isRefreshing && "animate-spin")} />
          <span>{isRefreshing ? "Refreshing…" : "Refresh"}</span>
        </button>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title="Toggle light / dark"
          className="flex size-[34px] items-center justify-center rounded-lg border border-border bg-card text-text-secondary hover:border-border-strong hover:text-foreground"
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
      </div>
    </div>
  )
}
