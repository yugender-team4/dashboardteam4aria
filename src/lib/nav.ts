import { blocks } from "@/data/management"
import { useData } from "@/lib/data-context"

export type ViewId = "mgmt" | "crm" | "eng" | "aos" | "mile" | "flow"

export interface NavItemDef {
  id: ViewId
  label: string
  group: "Leadership" | "Modules"
  count?: number
  alert?: boolean
}

const engBlockCount = blocks.length
const mileOverdueCount = blocks.filter((b) => b.overdue).length

// Nav badge counts mirror the exact metrics the original dashboard's
// per-view KPI tiles computed (see aosRecomputeAndRender / mileKpiDefs /
// flowRecomputeAndRender in the legacy aria-project-console.html). They are
// recomputed from live data after a SharePoint refresh.
export function useNavItems(): NavItemDef[] {
  const { aosData, flowData } = useData()
  const aosPriorityCount = aosData.filter((r) => r[10]).length
  const flowDeficitMonths = flowData.filter((r) => r[9] < 0).length

  return [
    { id: "mgmt", label: "Management", group: "Leadership" },
    { id: "crm", label: "CRM & Sales", group: "Modules", count: aosData.length },
    { id: "eng", label: "Engineering", group: "Modules", count: engBlockCount },
    { id: "aos", label: "AOS Tracker", group: "Modules", count: aosPriorityCount, alert: true },
    { id: "mile", label: "Milestone Tracker", group: "Modules", count: mileOverdueCount, alert: true },
    { id: "flow", label: "Inflow & Outflow", group: "Modules", count: flowDeficitMonths, alert: true },
  ]
}

export const moduleDotClass: Record<ViewId, string> = {
  mgmt: "bg-foreground",
  crm: "bg-accent-crm",
  eng: "bg-accent-eng",
  aos: "bg-warning",
  mile: "bg-accent-eng",
  flow: "bg-good",
}

export const viewTitles: Record<ViewId, string> = {
  mgmt: "Management summary",
  crm: "CRM & Sales",
  eng: "Engineering",
  aos: "AOS Tracker",
  mile: "Milestone Tracker",
  flow: "Inflow & Outflow",
}
