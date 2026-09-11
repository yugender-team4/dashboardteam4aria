import { BlockDueBar } from "@/components/charts/block-due-bar"
import { BlockStepper } from "@/components/dashboard/block-stepper"
import { Callout } from "@/components/dashboard/callout"
import { KpiCard, KpiRow } from "@/components/dashboard/kpi"
import { Meter } from "@/components/dashboard/meter"
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
import { blocks, engineeringDelayCallout, engineeringKpis, inventory, stageDue } from "@/data/management"

export function EngineeringView() {
  const totalStageDue = stageDue.reduce((s, d) => s + d.amt, 0)

  return (
    <div>
      <PageHead
        eyebrow="Engineering · Construction & inventory"
        swatchClassName="bg-accent-eng"
        title="Block-wise construction milestones"
        description="ARIA is planned across 7 blocks (A–G). Payment calls are triggered by construction milestones — the two track together."
      />

      <KpiRow>
        <KpiCard
          label="TOTAL SALABLE AREA"
          value="59.46 L sft"
          sub={`${engineeringKpis.totalUnits.toLocaleString("en-IN")} units, ${engineeringKpis.totalBlocks} blocks`}
        />
        <KpiCard
          label="BUILDER SHARE SOLD"
          value={`${engineeringKpis.builderSharePct.toFixed(1)}%`}
          sub={`${engineeringKpis.builderShareUnits} of ${engineeringKpis.builderShareOf.toLocaleString("en-IN")} units`}
        />
        <KpiCard
          label="BLOCKS UNDER CONSTRUCTION"
          value={`${engineeringKpis.blocksUnderConstruction} of ${engineeringKpis.blocksUnderConstructionOf}`}
          sub={engineeringKpis.activeBlocksLabel}
        />
        <KpiCard
          label="TOTAL BALANCE RECEIVABLE"
          value={`₹${engineeringKpis.totalBalanceReceivable.toFixed(2)} Cr`}
          sub="across project life"
        />
        <KpiCard label="MILESTONE DUE NOW" value={`₹${engineeringKpis.milestoneDueNow.toFixed(2)} Cr`} sub="payable immediately" />
      </KpiRow>

      <Callout variant="warning" icon="⏱️" title={`Block ${engineeringDelayCallout.block} foundation is running ${engineeringDelayCallout.delayDays} days behind baseline`}>
        Originally scheduled for <b>{engineeringDelayCallout.originalDate}</b>, commencement of foundation for Block{" "}
        {engineeringDelayCallout.block} is now tracking to <b>{engineeringDelayCallout.currentDate}</b>. Blocks E and
        F, by contrast, have already cleared foundation and 2nd basement and are entering the podium stage.
      </Callout>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_1fr]">
        <SectionCard title="Milestone progress by block" hint="Structural stage reached vs. next milestone due" tight>
          <BlockStepper blocks={blocks} />
        </SectionCard>

        <SectionCard title="Inventory — salable area" hint="Total project vs. builder share vs. sold">
          <div className="flex flex-col gap-3.5">
            <Meter
              label="Total salable (project)"
              value={`${inventory.totalSalableSft.toLocaleString("en-IN")} sft`}
              widthPct={100}
              color="var(--surface-2-hover)"
            />
            <Meter
              label="Builder share (ex. landowner)"
              value={`${inventory.builderShareSft.toLocaleString("en-IN")} sft`}
              widthPct={inventory.builderSharePctOfTotal}
              color="var(--accent-eng-soft)"
              border="var(--accent-eng)"
            />
            <Meter
              label="Sold to date"
              value={`${inventory.soldSft.toLocaleString("en-IN")} sft`}
              widthPct={inventory.soldPctOfBuilder}
              color="var(--accent-eng)"
              valueColor="var(--accent-eng-ink)"
            />
            <Meter
              label="Balance salable (unsold)"
              value={`${inventory.balanceSft.toLocaleString("en-IN")} sft`}
              widthPct={inventory.balancePctOfBuilder}
              color="var(--surface-2-hover)"
            />
            <div className="mt-0.5 text-[11px] text-muted-foreground">{inventory.landownerShareLabel}</div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Milestone-linked dues, by block" hint="₹ crore due immediately, position as on 05-Sep-2026">
        <BlockDueBar />
      </SectionCard>

      <SectionCard
        title="Due-immediate amount, by milestone stage"
        hint={`₹${totalStageDue.toFixed(2)} Cr total, split by trigger stage`}
        tight
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Milestone stage</TableHead>
              <TableHead className="text-right">Amount due</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stageDue.map((s) => (
              <TableRow key={s.stage}>
                <TableCell className="font-medium">{s.stage}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">₹{s.amt.toFixed(2)} Cr</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-surface-2 font-bold">
              <TableCell>Total due immediate</TableCell>
              <TableCell className="text-right font-mono tabular-nums">₹121.79 Cr</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  )
}
