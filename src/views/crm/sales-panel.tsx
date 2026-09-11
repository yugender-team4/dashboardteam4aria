import { Callout } from "@/components/dashboard/callout"
import { SectionCard } from "@/components/dashboard/section-card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cps } from "@/data/management"

export function SalesPanel() {
  return (
    <div>
      <SectionCard title="Top channel partners" hint="By AOS value sourced, of 81 active partners" tight>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Channel partner</TableHead>
              <TableHead className="text-right">Flats sourced</TableHead>
              <TableHead className="text-right">AOS value</TableHead>
              <TableHead className="text-right">Received</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cps.map((c, i) => (
              <TableRow key={c.name}>
                <TableCell className="font-medium">
                  {i + 1}. {c.name}
                </TableCell>
                <TableCell className="text-right font-mono tabular-nums">{c.flats}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">₹{c.aos.toFixed(2)} Cr</TableCell>
                <TableCell className="text-right font-mono tabular-nums">₹{c.recv.toFixed(2)} Cr</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>

      <Callout variant="warning" icon="🛠️" title="More Sales reports coming soon">
        This module will grow with the reports you'd like next — just let us know what to add.
      </Callout>
    </div>
  )
}
