'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useWidgetStore } from '@/lib/store/widget-store'
import { Widget } from '@/types/widget'
import { CloudAccountsWidget, RiskAssessmentWidget, RegistryScanWidget } from '@/components/widgets/ChartWidgets'
import { ChartErrorBoundary } from '@/components/error-boundary/ChartErrorBoundary'

interface WidgetCardProps {
  widget: Widget
  categoryId: string
}

export function WidgetCard({ widget, categoryId }: WidgetCardProps) {
  const removeWidget = useWidgetStore((state) => state.removeWidget)

  return (
    <Card className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-6 w-6"
        onClick={() => removeWidget(categoryId, widget.id)}
      >
        <X className="h-4 w-4" />
      </Button>
      <CardHeader>
        <CardTitle className="text-lg">{widget.name}</CardTitle>
      </CardHeader>
      <CardContent className="min-h-[200px]">
        <ChartErrorBoundary>
          {widget.type === 'CSPM' && widget.name === 'Cloud Accounts' && (
            <CloudAccountsWidget />
          )}
          {widget.type === 'CSPM' && widget.name === 'Risk Assessment' && (
            <RiskAssessmentWidget />
          )}
          {widget.type === 'Image' && widget.name === 'Registry Scan' && (
            <RegistryScanWidget />
          )}
          {!['Cloud Accounts', 'Risk Assessment', 'Registry Scan'].includes(widget.name) && (
            <p className="text-sm text-muted-foreground">{widget.content}</p>
          )}
        </ChartErrorBoundary>
      </CardContent>
    </Card>
  )
}