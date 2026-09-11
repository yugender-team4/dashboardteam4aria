import { useState } from "react"

import { AppShell } from "@/components/app-shell/app-shell"
import type { ViewId } from "@/lib/nav"
import { AosTrackerView } from "@/views/aos-tracker-view"
import { CrmSalesView } from "@/views/crm-sales-view"
import { EngineeringView } from "@/views/engineering-view"
import { InflowOutflowView } from "@/views/inflow-outflow-view"
import { ManagementView } from "@/views/management-view"
import { MilestoneTrackerView } from "@/views/milestone-tracker-view"

function App() {
  const [view, setView] = useState<ViewId>("mgmt")

  return (
    <AppShell activeView={view} onSelectView={setView}>
      {view === "mgmt" && <ManagementView />}
      {view === "crm" && <CrmSalesView />}
      {view === "eng" && <EngineeringView />}
      {view === "aos" && <AosTrackerView />}
      {view === "mile" && <MilestoneTrackerView />}
      {view === "flow" && <InflowOutflowView />}
    </AppShell>
  )
}

export default App
