'use client'

import * as React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useWidgetStore } from '@/lib/store/widget-store'
import { Widget } from '@/types/widget'

interface SearchResult extends Widget {
  categoryName: string
  categoryId: string
}

export function SearchWidgets() {
  const [query, setQuery] = React.useState('')
  const searchWidgets = useWidgetStore((state) => state.searchWidgets)
  const categories = useWidgetStore((state) => state.categories)
  
  const searchResults = React.useMemo(() => {
    if (!query) return []
    return searchWidgets(query).map(widget => {
      const category = categories.find(c => 
        c.widgets.some(w => w.id === widget.id)
      )
      return {
        ...widget,
        categoryName: category?.name || 'Unknown Category',
        categoryId: category?.id || ''
      }
    })
  }, [query, searchWidgets, categories]) as SearchResult[]

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search widgets..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-8"
      />
      {query && searchResults.length > 0 && (
        <div className="absolute top-full z-10 mt-2 w-full rounded-md border bg-popover p-2 shadow-md max-h-[300px] overflow-y-auto">
          {searchResults.map((widget) => (
            <div
              key={widget.id}
              className="rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"
              onClick={() => {
                setQuery('')
                const element = document.getElementById(`category-${widget.categoryId}`)
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                  element.classList.add('highlight')
                  setTimeout(() => element.classList.remove('highlight'), 2000)
                }
              }}
            >
              <div className="font-medium">{widget.name}</div>
              <div className="text-xs text-muted-foreground">{widget.content}</div>
              <div className="text-xs text-primary mt-1">{widget.categoryName}</div>
            </div>
          ))}
        </div>
      )}
      {query && searchResults.length === 0 && (
        <div className="absolute top-full z-10 mt-2 w-full rounded-md border bg-popover p-4 shadow-md text-center text-sm text-muted-foreground">
          No widgets found
        </div>
      )}
    </div>
  )
}