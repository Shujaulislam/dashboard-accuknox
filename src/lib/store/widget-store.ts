import { create } from 'zustand'
import { Category, Widget } from '@/types/widget'

interface WidgetStore {
  categories: Category[]
  addWidget: (categoryId: string, widget: Omit<Widget, 'id'>) => void
  removeWidget: (categoryId: string, widgetId: string) => void
  searchWidgets: (query: string) => Widget[]
}

export const useWidgetStore = create<WidgetStore>((set, get) => ({
  categories: [
    {
      id: 'cspm',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'cloud-accounts',
          name: 'Cloud Accounts',
          content: 'Shows connected vs non-connected cloud accounts',
          type: 'CSPM'
        },
        {
          id: 'risk-assessment',
          name: 'Risk Assessment',
          content: 'Displays cloud account risk assessment metrics',
          type: 'CSPM'
        }
      ]
    },
    {
      id: 'cwpp',
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 'workload-alerts',
          name: 'Workload Alerts',
          content: 'Displays recent workload security alerts',
          type: 'CWPP'
        }
      ]
    },
    {
      id: 'registry',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'registry-scan',
          name: 'Registry Scan',
          content: 'Shows vulnerability and security metrics for registry scans',
          type: 'Image'
        }
      ]
    }
  ],
  
  addWidget: (categoryId, widget) => {
    set((state) => ({
      categories: state.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            widgets: [
              ...category.widgets,
              { ...widget, id: crypto.randomUUID() }
            ]
          }
        }
        return category
      })
    }))
  },

  removeWidget: (categoryId, widgetId) => {
    set((state) => ({
      categories: state.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            widgets: category.widgets.filter((widget) => widget.id !== widgetId)
          }
        }
        return category
      })
    }))
  },

  searchWidgets: (query) => {
    const state = get()
    const lowercaseQuery = query.toLowerCase()
    
    return state.categories
      .flatMap((category) => category.widgets)
      .filter((widget) => 
        widget.name.toLowerCase().includes(lowercaseQuery) ||
        widget.content.toLowerCase().includes(lowercaseQuery)
      )
  },

  addCategory: (category) => {
    set((state) => ({
      categories: [
        ...state.categories,
        { ...category, id: crypto.randomUUID(), widgets: [] }
      ]
    }))
  },

  removeCategory: (categoryId) => {
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== categoryId)
    }))
  }
}))