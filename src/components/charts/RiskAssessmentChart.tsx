"use client"

import * as React from "react"
import { Pie, PieChart, Sector } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface RiskData {
  status: string
  count: number
  fill: string
}

const chartData: RiskData[] = [
  { status: "Failed", count: 1689, fill: "hsl(var(--destructive))" },
  { status: "Warning", count: 981, fill: "hsl(var(--warning))" },
  { status: "Not available", count: 36, fill: "hsl(var(--muted))" },
  { status: "Passed", count: 7253, fill: "hsl(var(--success))" },
]

const chartConfig = {
  count: {
    label: "Issues",
  },
  failed: {
    label: "Failed",
    color: "hsl(var(--destructive))",
  },
  warning: {
    label: "Warning",
    color: "hsl(var(--warning))",
  },
  na: {
    label: "Not Available",
    color: "hsl(var(--muted))",
  },
  passed: {
    label: "Passed",
    color: "hsl(var(--success))",
  },
} satisfies ChartConfig

export function RiskAssessmentChart() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const totalIssues = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Cloud Account Risk Assessment</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              activeShape={(props) => (
                // Using all required props from the sector
                <g>
                  <Sector
                    cx={props.cx}
                    cy={props.cy}
                    innerRadius={props.innerRadius}
                    outerRadius={(props.outerRadius || 0) + 10}
                    startAngle={props.startAngle}
                    endAngle={props.endAngle}
                    fill={props.fill}
                  />
                  <text
                    x={props.cx}
                    y={props.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={props.cx}
                      y={props.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {chartData[activeIndex].count.toLocaleString()}
                    </tspan>
                    <tspan
                      x={props.cx}
                      y={(props.cy || 0) + 24}
                      className="fill-muted-foreground text-sm"
                    >
                      {chartData[activeIndex].status}
                    </tspan>
                  </text>
                </g>
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}