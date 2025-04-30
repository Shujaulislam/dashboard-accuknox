'use client'

import * as React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useWidgetStore } from '@/lib/store/widget-store'
import { WidgetType } from '@/types/widget'

interface WidgetOption {
  id: string
  name: string
  description: string
  type: WidgetType
}

const widgetOptions: WidgetOption[] = [
  {
    id: 'cloud-accounts',
    name: 'Cloud Accounts',
    description: 'Shows connected vs non-connected cloud accounts',
    type: 'CSPM',
  },
  {
    id: 'risk-assessment',
    name: 'Risk Assessment',
    description: 'Displays cloud account risk assessment metrics',
    type: 'CSPM',
  },
  {
    id: 'registry-scan',
    name: 'Registry Scan',
    description: 'Shows vulnerability and security metrics for registry scans',
    type: 'Image',
  },
  {
    id: 'workload-alerts',
    name: 'Workload Alerts',
    description: 'Displays recent workload security alerts',
    type: 'CWPP',
  },
]

export function AddWidgetDialog() {
  const [selectedWidgets, setSelectedWidgets] = React.useState<string[]>([])
  const [open, setOpen] = React.useState(false)
  const addWidget = useWidgetStore((state) => state.addWidget)

  const handleWidgetToggle = (widgetId: string) => {
    setSelectedWidgets(current =>
      current.includes(widgetId)
        ? current.filter(id => id !== widgetId)
        : [...current, widgetId]
    )
  }

  const handleAddWidgets = () => {
    selectedWidgets.forEach(widgetId => {
      const widget = widgetOptions.find(w => w.id === widgetId)
      if (widget) {
        const categoryId = widget.type.toLowerCase()
        addWidget(categoryId, {
          name: widget.name,
          content: widget.description,
          type: widget.type
        })
      }
    })
    setSelectedWidgets([])
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Widget</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Widgets</DialogTitle>
          <DialogDescription>
            Select widgets to add to your dashboard. You can choose multiple widgets from different categories.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="CSPM" className="mt-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="CSPM">CSPM</TabsTrigger>
            <TabsTrigger value="CWPP">CWPP</TabsTrigger>
            <TabsTrigger value="Image">Image</TabsTrigger>
            <TabsTrigger value="Ticket">Ticket</TabsTrigger>
          </TabsList>
          {['CSPM', 'CWPP', 'Image', 'Ticket'].map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
                {widgetOptions
                  .filter(widget => widget.type === category)
                  .map(widget => (
                    <div key={widget.id} className="flex items-start space-x-3 space-y-0">
                      <Checkbox
                        id={widget.id}
                        checked={selectedWidgets.includes(widget.id)}
                        onCheckedChange={() => handleWidgetToggle(widget.id)}
                      />
                      <div className="space-y-1 leading-none">
                        <Label
                          htmlFor={widget.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {widget.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {widget.description}
                        </p>
                      </div>
                    </div>
                  ))}
            </TabsContent>
          ))}
        </Tabs>
        <DialogFooter>
          <Button
            onClick={handleAddWidgets}
            disabled={selectedWidgets.length === 0}
          >
            Add Selected Widgets
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}