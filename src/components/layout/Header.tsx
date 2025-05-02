'use client'

import { SearchWidgets } from '@/components/widgets/SearchWidgets'
import { ManageWidgets } from '@/components/widgets/ManageWidgets'
import { ChevronRight } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container flex flex-col space-y-4 py-4 px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold">CNAPP Dashboard</h1>
            <span className="text-sm text-muted-foreground">Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <SearchWidgets />
            <ManageWidgets />
          </div>
        </div>

        {/* Breadcrumb and Time Range */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground">Home</a>
            <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
            <span className="font-medium">Dashboard</span>
          </div>
          <select 
            className="text-sm border rounded-md px-3 py-1.5 bg-background hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            defaultValue="2days"
          >
            <option value="2days">Last 2 days</option>
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>
    </header>
  )
}