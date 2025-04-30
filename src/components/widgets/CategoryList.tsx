'use client'

import * as React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { useWidgetStore } from '@/lib/store/widget-store'

export function CategoryList() {
  const categories = useWidgetStore((state) => state.categories)
  const removeWidget = useWidgetStore((state) => state.removeWidget)
  const [selectedWidgets, setSelectedWidgets] = React.useState<{[key: string]: boolean}>({})

  // Initialize selected widgets
  React.useEffect(() => {
    const initialSelected = categories.reduce((acc, category) => {
      category.widgets.forEach(widget => {
        acc[widget.id] = true
      })
      return acc
    }, {} as {[key: string]: boolean})
    setSelectedWidgets(initialSelected)
  }, [categories])

  const handleWidgetToggle = (widgetId: string, categoryId: string, checked: boolean) => {
    setSelectedWidgets(prev => ({
      ...prev,
      [widgetId]: checked
    }))

    if (!checked) {
      removeWidget(categoryId, widgetId)
    }
  }

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category.id} className="space-y-3">
          <h3 className="font-medium text-sm">{category.name}</h3>
          <div className="space-y-2">
            {category.widgets.map((widget) => (
              <div key={widget.id} className="flex items-center space-x-2">
                <Checkbox
                  id={widget.id}
                  checked={selectedWidgets[widget.id]}
                  onCheckedChange={(checked) => 
                    handleWidgetToggle(widget.id, category.id, checked as boolean)
                  }
                />
                <label
                  htmlFor={widget.id}
                  className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {widget.name}
                </label>
              </div>
            ))}
            {category.widgets.length === 0 && (
              <p className="text-sm text-muted-foreground">No widgets in this category</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}