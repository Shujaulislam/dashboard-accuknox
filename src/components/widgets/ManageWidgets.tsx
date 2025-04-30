'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CategoryList } from '@/components/widgets/CategoryList'
import { Settings } from 'lucide-react'

export function ManageWidgets() {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Widgets</DialogTitle>
          <DialogDescription>
            Select which widgets to show in your dashboard. Unchecking a widget will remove it from the dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <CategoryList />
        </div>
      </DialogContent>
    </Dialog>
  )
}