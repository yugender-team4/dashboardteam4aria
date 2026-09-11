import { BulletBar } from "@/components/charts/bullet-bar"
import { RunwayChart } from "@/components/charts/runway-chart"
import { Callout } from "@/components/dashboard/callout"
import { IssueList } from "@/components/dashboard/issue-list"
import { KpiCard, KpiRow } from "@/components/dashboard/kpi"
import { PageHead } from "@/components/dashboard/page-head"
import { SectionCard } from "@/components/dashboard/section-card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  cashFlowDeficit,
  categories,
  issues,
  managementKpis,
  otherFinanceItems,
  partners,
} from "@/data/management"

export function ManagementView() {
  const bulletData = categories.map((c) => ({ name: c.name, total: c.aos, actual: c.recv }))

  const partnerTotals = partners.reduce(
    (acc, p) => ({
      units: acc.units + p.units,
      sft: acc.sft + p.sft,
      reg: acc.reg + p.reg,
      mgt: acc.mgt + p.mgt,
    }),
    { units: 0, sft: 0, reg: 0, mgt: 0 }
  )

  return (
    <div>
      <PageHead
        eyebrow="ARIA · Consolidated position"
        title="Management summary"
        description="Bookings, collections and cash position across all sale categories and JV partners. Figures in ₹ crore unless noted."
      />

      <KpiRow>
        <KpiCard
          label="AOS VALUE BOOKED"
          value={`₹${managementKpis.aosValue.toFixed(2)} Cr`}
          sub={`${managementKpis.totalBooked} flats · 15.33 lakh sft`}
        />
        <KpiCard
          label="AMOUNT RECEIVED"
          value={`₹${managementKpis.received.toFixed(2)} Cr`}
          delta={{ text: `${managementKpis.receivedPctOfAos.toFixed(1)}% of AOS value`, direction: "up" }}
        />
        <KpiCard
          label="FUTURE RECEIVABLE"
          value={`₹${managementKpis.futureReceivable.toFixed(2)} Cr`}
          sub="over life of project"
        />
        <KpiCard
          label="DUE & OUTSTANDING"
          value={`₹${managementKpis.dueOutstanding.toFixed(2)} Cr`}
          sub={`of ₹${managementKpis.calledTotal.toFixed(2)} Cr called`}
        />
        <KpiCard
          label="AOS EXECUTED"
          value={`${managementKpis.executed} / ${managementKpis.totalBooked}`}
          sub={`${managementKpis.executedPct.toFixed(1)}% signed & registered`}
        />
        <KpiCard
          label="INVENTORY SOLD"
          value={`${managementKpis.inventorySoldPct.toFixed(1)}%`}
          sub={`${managementKpis.totalBooked} of ${managementKpis.builderUnits.toLocaleString("en-IN")} builder units`}
        />
      </KpiRow>

      <Callout variant="critical" title="Cash flow model shows a projected deficit from FY28">
        On the current inflow / budgeted-outflow model, the closing bank balance is projected to run
        negative for the first time around <b>{cashFlowDeficit.firstDeficitMonth}</b> — roughly{" "}
        {cashFlowDeficit.monthsFromNow} months from today — deepening to a modelled shortfall of about{" "}
        <b>−₹{Math.abs(cashFlowDeficit.troughAmount)} Cr</b> around {cashFlowDeficit.troughMonth} before
        partially recovering. This assumes no additional partner funding and no acceleration in sales
        beyond the current trajectory.
      </Callout>

      <SectionCard
        title="Bank balance — actual & projected"
        hint="Monthly closing balance, ₹ crore · Feb-2026 → Dec-2030"
        legend={
          <>
            <span className="inline-flex items-center gap-1.5">
              <i className="inline-block h-0.5 w-3.5 rounded bg-foreground" />
              Actual (to Aug-26)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <i className="inline-block h-0.5 w-3.5 rounded bg-foreground opacity-45" />
              Projected
            </span>
            <span className="inline-flex items-center gap-1.5">
              <i className="inline-block size-2.5 rounded-sm border border-critical bg-critical-soft" />
              Modelled deficit
            </span>
          </>
        }
      >
        <RunwayChart />
      </SectionCard>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_1fr]">
        <SectionCard title="Booking value by category" hint="AOS value vs. amount received, ₹ crore">
          <BulletBar data={bulletData} totalLabel="AOS value" actualLabel="Received" />
        </SectionCard>

        <SectionCard title="Open items for management review" hint="Flagged by finance / sales, unresolved" tight>
          <IssueList items={issues} />
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SectionCard title="JV partner allocation (MGT category)" hint="Landowner units by partner entity" tight>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner</TableHead>
                <TableHead className="text-right">Units</TableHead>
                <TableHead className="text-right">SFT</TableHead>
                <TableHead className="text-right">Reg. amount</TableHead>
                <TableHead className="text-right">MGT amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners.map((p) => (
                <TableRow key={p.name}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">{p.units}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    {p.sft.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">₹{p.reg} L</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">₹{p.mgt.toFixed(2)} Cr</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-surface-2 font-bold">
                <TableCell>Total</TableCell>
                <TableCell className="text-right font-mono tabular-nums">{partnerTotals.units}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">
                  {partnerTotals.sft.toLocaleString("en-IN")}
                </TableCell>
                <TableCell className="text-right font-mono tabular-nums">₹{partnerTotals.reg} L</TableCell>
                <TableCell className="text-right font-mono tabular-nums">
                  ₹{partnerTotals.mgt.toFixed(2)} Cr
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </SectionCard>

        <SectionCard title="Other finance items" hint="Cross-checked against source ledgers">
          <div className="flex flex-col gap-3.5">
            {otherFinanceItems.map((item) => (
              <div key={item.label} className="flex justify-between text-[12.6px]">
                <span>{item.label}</span>
                <b className={`font-mono tabular-nums ${item.warning ? "text-warning" : ""}`}>{item.amount}</b>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
