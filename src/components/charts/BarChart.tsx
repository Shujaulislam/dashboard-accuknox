'use client'

import * as React from 'react'

interface BarChartData {
  label: string
  value: number
  color: string
}

interface BarChartProps {
  data: BarChartData[]
  height?: number
  showValues?: boolean
}

export function BarChart({ data, height = 20, showValues = true }: BarChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-2">
      <div className="relative h-[20px] rounded-full overflow-hidden bg-muted/20">
        <div className="absolute inset-0 flex">
          {data.map((item, index) => {
            const width = (item.value / total) * 100
            return (
              <div
                key={item.label}
                className="h-full transition-all duration-500 ease-in-out"
                style={{
                  width: `${width}%`,
                  backgroundColor: item.color,
                }}
              />
            )
          })}
        </div>
      </div>
      <div className="flex justify-between text-sm">
        {data.map((item) => (
          <div key={item.label} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground">
              {item.label} {showValues && `(${item.value})`}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}