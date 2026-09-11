import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PlaceholderView({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Coming in the next build pass.</p>
      </CardContent>
    </Card>
  )
}
