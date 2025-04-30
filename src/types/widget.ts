export type WidgetType = 'CSPM' | 'CWPP' | 'Image' | 'Ticket'

export interface Widget {
  id: string
  name: string
  content: string
  type: WidgetType
}

export interface Category {
  id: string
  name: string
  widgets: Widget[]
}

export interface Dashboard {
  categories: Category[]
}