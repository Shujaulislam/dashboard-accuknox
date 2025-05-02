'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useWidgetStore } from '@/lib/store/widget-store'

interface WidgetOption {
  id: string
  name: string
  category: 'CSPM' | 'CWPP' | 'Image' | 'Ticket'
  description?: string
}

const widgetOptions: WidgetOption[] = [
  { 
    id: 'cloud-accounts', 
    name: 'Cloud Accounts',
    category: 'CSPM',
    description: 'Monitor connected and disconnected cloud accounts'
  },
  { 
    id: 'risk-assessment', 
    name: 'Cloud Account Risk Assessment',
    category: 'CSPM',
    description: 'View risk assessment metrics and compliance status'
  },
  { 
    id: 'namespace-alerts', 
    name: 'Top 5 Namespace Specific Alerts',
    category: 'CWPP',
    description: 'Track critical namespace-level security alerts'
  },
  { 
    id: 'workload-alerts', 
    name: 'Workload Alerts',
    category: 'CWPP',
    description: 'Monitor workload-specific security incidents'
  },
  { 
    id: 'risk-assessment-image', 
    name: 'Image Risk Assessment',
    category: 'Image',
    description: 'Analyze container image vulnerabilities'
  },
  { 
    id: 'security-issues', 
    name: 'Image Security Issues',
    category: 'Image',
    description: 'Track security issues in container images'
  }
]

interface AddWidgetProps {
  categoryId: string
}

export function AddWidget({ categoryId }: AddWidgetProps) {
  const [selectedTab, setSelectedTab] = useState<'CSPM' | 'CWPP' | 'Image' | 'Ticket'>('CSPM')
  const [selectedWidgets, setSelectedWidgets] = useState<Set<string>>(new Set())
  const [isOpen, setIsOpen] = useState(false)

  const handleWidgetToggle = (widgetId: string) => {
    const newSelected = new Set(selectedWidgets)
    if (newSelected.has(widgetId)) {
      newSelected.delete(widgetId)
    } else {
      newSelected.add(widgetId)
    }
    setSelectedWidgets(newSelected)
  }

  const addWidget = useWidgetStore((state) => state.addWidget)

  const handleConfirm = () => {
    selectedWidgets.forEach(widgetId => {
      const widget = widgetOptions.find(w => w.id === widgetId)
      if (widget) {
        addWidget(categoryId, {
          name: widget.name,
          content: widget.description || '',
          type: widget.category
        })
      }
    })
    setIsOpen(false)
    setSelectedWidgets(new Set())
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          Add Widget
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Widget</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-4">
            Personalise your dashboard by adding the following widget
          </p>
          
          {/* Tabs */}
          <div className="flex border-b mb-6">
            {['CSPM', 'CWPP', 'Image', 'Ticket'].map((tab) => (
              <button
                key={tab}
                className={cn(
                  'px-4 py-2 text-sm font-medium border-b-2 -mb-[2px]',
                  selectedTab === tab
                    ? 'text-primary border-primary'
                    : 'text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground'
                )}
                onClick={() => setSelectedTab(tab as typeof selectedTab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Widget Options */}
          <div className="space-y-3">
            {widgetOptions
              .filter((widget) => widget.category === selectedTab)
              .map((widget) => (
                <div
                  key={widget.id}
                  className={cn(
                    'flex items-start space-x-3 p-4 rounded-lg border transition-colors',
                    selectedWidgets.has(widget.id) ? 'bg-muted/50 border-primary' : 'hover:bg-muted/50'
                  )}
                >
                  <Checkbox
                    id={widget.id}
                    checked={selectedWidgets.has(widget.id)}
                    onCheckedChange={() => handleWidgetToggle(widget.id)}
                  />
                  <div className="space-y-1">
                    <label
                      htmlFor={widget.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {widget.name}
                    </label>
                    {widget.description && (
                      <p className="text-sm text-muted-foreground">
                        {widget.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleConfirm}
              disabled={selectedWidgets.size === 0}
            >
              Confirm
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}