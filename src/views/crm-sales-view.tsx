import { useState } from "react"

import { KpiCard, KpiRow } from "@/components/dashboard/kpi"
import { PageHead } from "@/components/dashboard/page-head"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { catTotal, crmSalesKpis, managementKpis } from "@/data/management"
import { useData } from "@/lib/data-context"
import { BookingReport } from "@/views/crm/booking-report"
import { CollectionReport } from "@/views/crm/collection-report"
import { MonthlyReport } from "@/views/crm/monthly-report"
import { PresentReport } from "@/views/crm/present-report"
import { SalesPanel } from "@/views/crm/sales-panel"

type Module = "crm" | "sales"
type CrmReport = "booking" | "collection" | "monthly" | "present"

const crmReportOptions: { value: CrmReport; label: string }[] = [
  { value: "booking", label: "Unit Booking Report" },
  { value: "collection", label: "Unit Collection Report" },
  { value: "monthly", label: "Monthly Collection and Overall Collection Report" },
  { value: "present", label: "Present Collection and Receivable" },
]

export function CrmSalesView() {
  const [module, setModule] = useState<Module>("crm")
  const [report, setReport] = useState<CrmReport>("booking")
  const { aosData, aosBlocksList, aosCats } = useData()

  return (
    <div>
      <PageHead
        eyebrow="CRM & Sales"
        swatchClassName="bg-accent-crm"
        title="Bookings, collections & sales performance"
        description={`${aosData.length} flats booked across ${aosCats.length} sale categories, sourced through ${crmSalesKpis.activePartners} channel partners and direct sales.`}
      />

      <KpiRow>
        <KpiCard label="TOTAL BOOKINGS" value={aosData.length} sub="15.33 lakh sft" />
        <KpiCard
          label="AVG. REALISATION"
          value={`₹${crmSalesKpis.avgRealisationPerSft.toLocaleString("en-IN")} /sft`}
          sub="blended across categories"
        />
        <KpiCard
          label="CP-SOURCED BOOKINGS"
          value={crmSalesKpis.cpSourcedBookings}
          delta={{ text: `${crmSalesKpis.cpSourcedPct}% of total`, direction: "flat" }}
        />
        <KpiCard
          label="AOS EXECUTION"
          value={`${managementKpis.executedPct.toFixed(1)}%`}
          sub={`${managementKpis.executed} signed · ${catTotal.pend} pending`}
        />
        <KpiCard
          label="CANCELLATIONS"
          value={crmSalesKpis.cancellations}
          sub={`${crmSalesKpis.reBooked} re-booked (${crmSalesKpis.reBookedPct}%)`}
        />
      </KpiRow>

      <div className="mb-3.5 flex flex-wrap items-center gap-3 rounded-[14px] border border-border bg-card px-4 py-3 shadow-card">
        <ToggleGroup
          type="single"
          variant="outline"
          value={module}
          onValueChange={(v) => v && setModule(v as Module)}
        >
          <ToggleGroupItem value="crm" className="px-4 text-[12.5px] font-semibold">
            CRM
          </ToggleGroupItem>
          <ToggleGroupItem value="sales" className="px-4 text-[12.5px] font-semibold">
            Sales
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="flex-1" />

        {module === "crm" ? (
          <Select value={report} onValueChange={(v) => setReport(v as CrmReport)}>
            <SelectTrigger className="w-full sm:w-[320px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {crmReportOptions.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Select value="cp" onValueChange={() => {}}>
            <SelectTrigger className="w-full sm:w-[320px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cp">Top channel partners</SelectItem>
              <SelectItem value="more" disabled>
                More reports — coming soon
              </SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {module === "crm" ? (
        <>
          {report === "booking" && <BookingReport />}
          {report === "collection" && <CollectionReport />}
          {report === "monthly" && <MonthlyReport />}
          {report === "present" && <PresentReport />}
        </>
      ) : (
        <SalesPanel />
      )}

      <p className="sr-only">{aosBlocksList.length} blocks</p>
    </div>
  )
}
