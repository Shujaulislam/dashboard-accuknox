'use client'

import { Category as CategoryType } from '@/types/widget'
import { Widget } from './Widget'

interface CategoryProps {
  category: CategoryType
}

export function Category({ category }: CategoryProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{category.name}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {category.widgets.map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            categoryId={category.id}
          />
        ))}
      </div>
    </div>
  )
}