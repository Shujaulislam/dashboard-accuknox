'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart2 } from 'lucide-react'

interface GraphWidgetProps {
  title: string
  data?: any // define the type of data here optional for now
}

export function GraphWidget({ title, data }: GraphWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center min-h-[200px] text-muted-foreground">
        {!data ? (
          <div className="flex flex-col items-center gap-2">
            <BarChart2 className="w-12 h-12 opacity-20" />
            <p>No Graph data available!</p>
          </div>
        ) : (
          <div>Graph will be rendered here</div>
        )}
      </CardContent>
    </Card>
  )
}