'use client'

import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart2 } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export class ChartErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Chart Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Card>
            <CardContent className="flex flex-col items-center justify-center min-h-[200px] text-muted-foreground">
              <div className="flex flex-col items-center gap-2">
                <BarChart2 className="w-12 h-12 opacity-20" />
                <p>Failed to load chart</p>
              </div>
            </CardContent>
          </Card>
        )
      )
    }

    return this.props.children
  }
}