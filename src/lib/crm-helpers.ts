// Shared aggregation + presentation helpers for the CRM & Sales module,
// ported from the crmXxx() functions in aria-project-console.html.

export function heatShade(v: number, maxV: number): string {
  if (!v) return "var(--surface-2)"
  const alpha = 0.14 + (v / maxV) * 0.72
  return `rgba(31,143,90,${alpha.toFixed(2)})`
}

export const CATEGORY_PALETTE = [
  "var(--accent-crm)",
  "var(--warning)",
  "var(--good)",
  "var(--accent-eng)",
  "var(--critical)",
]
