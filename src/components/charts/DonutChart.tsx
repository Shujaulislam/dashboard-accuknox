'use client'

import * as React from 'react'

interface DonutChartProps {
  data: {
    label: string
    value: number
    color: string
  }[]
  total?: number
  size?: number
  thickness?: number
}

export function DonutChart({
  data,
  size = 200,
  thickness = 20,
  total: providedTotal,
}: DonutChartProps) {
  const total = providedTotal || data.reduce((sum, item) => sum + item.value, 0)
  const center = size / 2
  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius

  let startAngle = 0
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {data.map((item, i) => {
          const percentage = item.value / total
          const strokeDasharray = `${circumference * percentage} ${circumference * (1 - percentage)}`
          
          const pathDefinition = `
            M ${center + radius * Math.cos(startAngle)} ${center + radius * Math.sin(startAngle)}
            A ${radius} ${radius} 0 ${percentage > 0.5 ? 1 : 0} 1
              ${center + radius * Math.cos(startAngle + 2 * Math.PI * percentage)}
              ${center + radius * Math.sin(startAngle + 2 * Math.PI * percentage)}
          `
          
          startAngle += 2 * Math.PI * percentage
          
          return (
            <circle
              key={item.label}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={thickness}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={0}
            />
          )
        })}
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center text-2xl font-semibold"
      >
        {total}
        <span className="text-sm ml-1">total</span>
      </div>
    </div>
  )
}