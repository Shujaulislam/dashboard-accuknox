'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DonutChart } from '@/components/charts/DonutChart'
import { ProgressRing } from '@/components/charts/ProgressRing'
import { BarChart } from '@/components/charts/BarChart'

export function CloudAccountsWidget() {
  const data = [
    { label: 'Connected', value: 2, color: '#4338ca' },
    { label: 'Not Connected', value: 2, color: '#e4e4e7' }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cloud Accounts</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center h-[200px] w-full">
        <DonutChart data={data} size={180} />
      </CardContent>
    </Card>
  )
}

export function RiskAssessmentWidget() {
  const data = [
    { label: 'Failed', value: 1689, color: '#dc2626' },
    { label: 'Warning', value: 981, color: '#fbbf24' },
    { label: 'Not available', value: 36, color: '#9ca3af' },
    { label: 'Passed', value: 7253, color: '#22c55e' }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cloud Account Risk Assessment</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <DonutChart 
          data={data} 
          size={180} 
          total={9859}
        />
      </CardContent>
    </Card>
  )
}

export function RegistryScanWidget() {
  const vulnerabilityData = [
    { label: 'Critical', value: 9, color: '#dc2626' },
    { label: 'High', value: 150, color: '#fbbf24' }
  ]

  const securityData = [
    { label: 'Critical', value: 2, color: '#dc2626' },
    { label: 'High', value: 2, color: '#fbbf24' }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registry Scan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Image Risk Assessment</span>
            <span className="text-sm text-muted-foreground">1470 Total Vulnerabilities</span>
          </div>
          <BarChart data={vulnerabilityData} />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Image Security Issues</span>
            <span className="text-sm text-muted-foreground">2 Total Images</span>
          </div>
          <BarChart data={securityData} />
        </div>
      </CardContent>
    </Card>
  )
}