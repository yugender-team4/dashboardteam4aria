import { heatShade } from "@/lib/crm-helpers"

interface HeatmapTableProps {
  rowLabels: string[]
  colLabels: string[]
  matrix: number[][]
  rowHeader?: string
}

export function HeatmapTable({ rowLabels, colLabels, matrix, rowHeader = "" }: HeatmapTableProps) {
  const maxV = Math.max(0, ...matrix.flat())

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[12.5px]">
        <thead>
          <tr>
            <th className="sticky left-0 bg-card px-3 py-2 text-left text-[10.6px] font-semibold tracking-wide text-muted-foreground uppercase">
              {rowHeader}
            </th>
            {colLabels.map((c) => (
              <th
                key={c}
                className="px-2 py-2 text-right text-[10.6px] font-semibold tracking-wide whitespace-nowrap text-muted-foreground uppercase"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowLabels.map((r, ri) => (
            <tr key={r}>
              <td className="sticky left-0 bg-card px-3 py-1.5 font-medium whitespace-nowrap">{r}</td>
              {matrix[ri].map((v, ci) => (
                <td key={ci} className="px-1 py-1.5">
                  <div
                    className="rounded-md py-1 text-center font-mono tabular-nums"
                    style={{ background: heatShade(v, maxV) }}
                  >
                    {v || "—"}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
