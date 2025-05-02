# Dynamic Dashboard Implementation - AccuKnox Assignment

## Overview
This project implements a dynamic dashboard with widget management functionality using Next.js, Zustand for state management, and ShadCN UI for components. The dashboard allows users to add, remove, and search widgets across different categories.

## Features
- Dynamic widget management with category-based organization
- Add/Remove widgets functionality
- Widget search across all categories
- Real-time chart visualization using Recharts
- Responsive layout with ShadCN UI components

## Live Demo
The application is deployed on Vercel and can be accessed at: [Dashboard Demo](https://dashboard-accuknox.vercel.app)

## Local Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd dashboard-accuknox
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Implementation Details

### Tech Stack
- **Frontend Framework**: Next.js
- **State Management**: Zustand
- **UI Components**: ShadCN UI
- **Charts**: Recharts
- **Styling**: Tailwind CSS

### Core Features Implementation
1. **Widget Management**
   - Category-based widget organization
   - Add Widget dialog with category tabs
   - Widget removal with cross icon

2. **Chart Components**
   - Cloud Accounts (Donut Chart)
   - Risk Assessment (Interactive Donut)
   - Registry Scan (Bar Charts)

3. **Search Functionality**
   - Real-time widget search
   - Results grouped by category
   - Smooth scroll to widget location

## Assignment Requirements Met
- [x] Dynamic JSON structure for dashboard/widget management
- [x] Category-based widget organization
- [x] Add/Remove widgets functionality
- [x] Widget search implementation
- [x] Modern UI with ShadCN components
- [x] State management with Zustand
