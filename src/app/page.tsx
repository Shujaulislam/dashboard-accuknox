'use client'

import { Header } from '@/components/layout/Header'
import { AddWidget } from '@/components/widgets/AddWidget'
import { WidgetCard } from '@/components/widgets/WidgetCard'
import { useWidgetStore } from '@/lib/store/widget-store'

export default function DashboardPage() {
  const categories = useWidgetStore((state) => state.categories)
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 px-4">
        <div className="space-y-8">
          {categories.map((category) => (
            <section key={category.id} id={`category-${category.id}`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{category.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.id === 'cspm' && 'Monitor cloud security posture and compliance'}
                    {category.id === 'cwpp' && 'Workload protection metrics and alerts'}
                    {category.id === 'registry' && 'Container image security analysis'}
                  </p>
                </div>
                <AddWidget categoryId={category.id} />
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {category.widgets.map((widget) => (
                  <WidgetCard
                    key={widget.id}
                    widget={widget}
                    categoryId={category.id}
                  />
                ))}
                {category.widgets.length === 0 && (
                  <div className="flex items-center justify-center h-full min-h-[300px] rounded-xl border border-dashed">
                    <AddWidget categoryId={category.id} />
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}
