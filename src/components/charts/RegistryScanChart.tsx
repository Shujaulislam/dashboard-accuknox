"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

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

interface VulnerabilityData {
  severity: string
  count: number
}

const vulnerabilityData: VulnerabilityData[] = [
  { severity: "Critical", count: 9 },
  { severity: "High", count: 150 },
]

const securityData: VulnerabilityData[] = [
  { severity: "Critical", count: 2 },
  { severity: "High", count: 2 },
]

const chartConfig = {
  count: {
    label: "Count",
  },
  critical: {
    label: "Critical",
    color: "hsl(var(--destructive))",
  },
  high: {
    label: "High",
    color: "hsl(var(--warning))",
  },
  label: {
    color: "hsl(var(--muted-foreground))",
  },
} satisfies ChartConfig

export function RegistryScanChart() {
  const totalVulnerabilities = vulnerabilityData.reduce((acc, curr) => acc + curr.count, 0)
  const totalSecurityIssues = securityData.reduce((acc, curr) => acc + curr.count, 0)

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Registry Scan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Image Risk Assessment</span>
            <span className="text-sm text-muted-foreground">
              {totalVulnerabilities} Total Vulnerabilities
            </span>
          </div>
          <ChartContainer config={chartConfig}>
            <BarChart
              data={vulnerabilityData}
              layout="vertical"
              height={100}
              margin={{ top: 0, right: 16, bottom: 0, left: 0 }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="severity"
                type="category"
                hide
              />
              <XAxis type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="count"
                fill="var(--color-critical)"
                radius={4}
              >
                <LabelList
                  dataKey="severity"
                  position="insideLeft"
                  offset={8}
                  className="fill-[--color-label]"
                  fontSize={12}
                />
                <LabelList
                  dataKey="count"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Image Security Issues</span>
            <span className="text-sm text-muted-foreground">
              {totalSecurityIssues} Total Issues
            </span>
          </div>
          <ChartContainer config={chartConfig}>
            <BarChart
              data={securityData}
              layout="vertical"
              height={100}
              margin={{ top: 0, right: 16, bottom: 0, left: 0 }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="severity"
                type="category"
                hide
              />
              <XAxis type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="count"
                fill="var(--color-critical)"
                radius={4}
              >
                <LabelList
                  dataKey="severity"
                  position="insideLeft"
                  offset={8}
                  className="fill-[--color-label]"
                  fontSize={12}
                />
                <LabelList
                  dataKey="count"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}