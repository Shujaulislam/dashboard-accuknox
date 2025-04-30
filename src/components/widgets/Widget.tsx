'use client'

import { Widget as WidgetType } from '@/types/widget'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X } from 'lucide-react'
import { useWidgetStore } from '@/lib/store/widget-store'

interface WidgetProps {
  widget: WidgetType
  categoryId: string
}

export function Widget({ widget, categoryId }: WidgetProps) {
  const removeWidget = useWidgetStore((state) => state.removeWidget)

  return (
    <Card className="relative">
      <button
        onClick={() => removeWidget(categoryId, widget.id)}
        className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Remove widget"
      >
        <X className="h-4 w-4" />
      </button>
      <CardHeader>
        <CardTitle>{widget.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{widget.content}</p>
      </CardContent>
    </Card>
  )
}