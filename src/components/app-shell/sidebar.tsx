import { cn } from "@/lib/utils"
import { moduleDotClass, useNavItems, type NavItemDef, type ViewId } from "@/lib/nav"

interface SidebarProps {
  activeView: ViewId
  onSelectView: (view: ViewId) => void
  open: boolean
  onClose: () => void
}

export function Sidebar({ activeView, onSelectView, open, onClose }: SidebarProps) {
  const navItems = useNavItems()
  const leadership = navItems.filter((n) => n.group === "Leadership")
  const modules = navItems.filter((n) => n.group === "Modules")

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "flex w-[240px] shrink-0 flex-col border-r border-border bg-sidebar",
          "fixed inset-y-0 left-0 z-40 -translate-x-full transition-transform duration-200 ease-out",
          "md:sticky md:top-0 md:h-screen md:translate-x-0",
          open && "translate-x-0"
        )}
      >
        <div className="flex items-center gap-2.5 px-[18px] pt-5 pb-4">
          <div className="flex size-[34px] shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent-eng to-accent-crm font-display text-[12px] font-extrabold text-white">
            ARIA
          </div>
          <div className="leading-tight">
            <div className="font-display text-[14.5px] font-extrabold tracking-tight">
              Project&nbsp;Console
            </div>
            <div className="font-mono text-[10.6px] tracking-wide text-muted-foreground">
              TEAM4 LIFE SPACES
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-1.5">
          <div className="px-[10px] pt-4 pb-1.5 text-[10.5px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
            Leadership
          </div>
          {leadership.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              active={activeView === item.id}
              onClick={() => {
                onSelectView(item.id)
                onClose()
              }}
            />
          ))}

          <div className="px-[10px] pt-4 pb-1.5 text-[10.5px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
            Modules
          </div>
          {modules.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              active={activeView === item.id}
              onClick={() => {
                onSelectView(item.id)
                onClose()
              }}
            />
          ))}
        </nav>

        <div className="flex flex-col gap-2 border-t border-border px-4 pt-3 pb-4">
          <div className="text-[10.3px] leading-relaxed text-muted-foreground">
            Bookings position <b className="font-semibold text-text-secondary">as on 09-Sep-2026</b>
            <br />
            Collections &amp; milestones{" "}
            <b className="font-semibold text-text-secondary">as on 05-Sep-2026</b>
          </div>
        </div>
      </aside>
    </>
  )
}

function NavButton({
  item,
  active,
  onClick,
}: {
  item: NavItemDef
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left text-[13.5px] font-medium text-text-secondary",
        "hover:bg-sidebar-accent hover:text-foreground",
        active && "bg-card font-semibold text-foreground shadow-card"
      )}
    >
      <span
        className={cn(
          "size-[7px] shrink-0 rounded-full bg-muted-foreground",
          active && moduleDotClass[item.id]
        )}
      />
      {item.label}
      {typeof item.count === "number" && (
        <span
          className={cn(
            "ml-auto rounded-full border border-border bg-background px-[7px] py-px font-mono text-[10.5px] text-muted-foreground",
            item.alert &&
              "border-critical/35 bg-critical-soft font-bold text-critical"
          )}
        >
          {item.count}
        </span>
      )}
    </button>
  )
}
