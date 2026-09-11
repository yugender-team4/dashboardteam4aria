import { useState, type ReactNode } from "react"

import { Sidebar } from "@/components/app-shell/sidebar"
import { Topbar } from "@/components/app-shell/topbar"
import { useTheme } from "@/hooks/use-theme"
import { useData } from "@/lib/data-context"
import type { ViewId } from "@/lib/nav"

interface AppShellProps {
  activeView: ViewId
  onSelectView: (view: ViewId) => void
  children: ReactNode
}

export function AppShell({ activeView, onSelectView, children }: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { refresh, isRefreshing, refreshError, dataAsOfLabel } = useData()

  return (
    <div className="flex min-h-screen">
      <Sidebar
        activeView={activeView}
        onSelectView={onSelectView}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          onOpenMenu={() => setMenuOpen(true)}
          dataAsOf={dataAsOfLabel}
          onRefresh={refresh}
          isRefreshing={isRefreshing}
          refreshError={Boolean(refreshError)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <div className="mx-auto w-full max-w-[1320px] flex-1 px-4 pt-6 pb-16 md:px-7">
          {children}
        </div>

        <footer className="flex flex-wrap justify-between gap-2 px-4 pt-2 pb-10 text-[11.3px] text-muted-foreground md:px-7">
          <span>ARIA Project Console · Team4 Life Spaces · internal use only</span>
          <span className="font-mono">
            Sources: Flat Bookings Dashboard (09-Sep-2026) · Inflow &amp; Due Dashboard (05-Sep-2026)
          </span>
        </footer>
      </div>
    </div>
  )
}
