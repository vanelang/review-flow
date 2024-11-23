# Dashboard Components Schema Documentation

## Overview

This document outlines the structure of components, data types, and mock data used throughout the ReviewFlow dashboard.

## Data Types

### Review Type

```typescript
interface Review {
  id: number;
  author: string;
  rating: number; // 1-5
  content: string;
  date: string;
  source: "Widget" | "API" | "Form";
  status?: "pending" | "approved" | "rejected";
}
```

### Widget Type

```typescript
interface Widget {
  id: number;
  name: string;
  type: "review-form" | "testimonial" | "rating";
  status: "active" | "inactive";
  lastUpdated: string;
  totalReviews: number;
  description: string;
}
```

### Chart Data Type

```typescript
interface ChartData {
  name: string; // Month name
  reviews: number;
  apiCalls: number;
}
```

## Mock Data Examples

### Chart Data

```typescript
const mockChartData = [
  { name: "Jan", reviews: 40, apiCalls: 2400 },
  { name: "Feb", reviews: 30, apiCalls: 1398 },
  { name: "Mar", reviews: 60, apiCalls: 9800 },
  { name: "Apr", reviews: 45, apiCalls: 3908 },
  { name: "May", reviews: 75, apiCalls: 4800 },
  { name: "Jun", reviews: 65, apiCalls: 3800 },
];
```

### Recent Reviews

```typescript
const mockReviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    rating: 5,
    content: "Excellent service! Would highly recommend.",
    date: "2024-03-15",
    source: "Widget",
  },
  // ... more reviews
];
```

### Widgets

```typescript
const mockWidgets = [
  {
    id: 1,
    name: "Product Reviews",
    type: "review-form",
    status: "active",
    lastUpdated: "2024-03-15",
    totalReviews: 128,
    description: "Main product review collection form",
  },
  // ... more widgets
];
```

## Component Structure

### Dashboard Stats

```typescript
interface DashboardStat {
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: "increase" | "decrease" | "neutral";
  };
}

const dashboardStats = [
  {
    title: "Total Reviews",
    value: 315,
    change: { value: "+12%", type: "increase" },
  },
  {
    title: "API Usage",
    value: "8.2k",
    change: { value: "Normal", type: "neutral" },
  },
  {
    title: "Active Widgets",
    value: 6,
  },
  {
    title: "Avg. Rating",
    value: 4.8,
  },
];
```

### Chart Configuration

```typescript
interface ChartConfig {
  height: number;
  dataKey: string;
  stroke: string;
  fill: string;
  name: string;
  tooltipConfig: {
    backgroundColor: string;
    borderRadius: string;
    color: string;
  };
}

const chartConfig = {
  height: 300,
  tooltipConfig: {
    backgroundColor: "#1e293b",
    borderRadius: "0.5rem",
    color: "#f8fafc",
  },
};
```

## Color Scheme

```typescript
const colors = {
  primary: {
    blue: {
      light: "#2563eb",
      dark: "#1d4ed8",
    },
  },
  text: {
    light: {
      primary: "text-slate-900",
      secondary: "text-slate-600",
    },
    dark: {
      primary: "text-white",
      secondary: "text-slate-400",
    },
  },
  background: {
    light: {
      primary: "bg-white",
      secondary: "bg-slate-50",
    },
    dark: {
      primary: "bg-slate-800",
      secondary: "bg-slate-900",
    },
  },
};
```

## Status Badges

```typescript
const statusColors = {
  approved: {
    bg: "bg-green-100 dark:bg-green-900",
    text: "text-green-800 dark:text-green-200",
  },
  pending: {
    bg: "bg-yellow-100 dark:bg-yellow-900",
    text: "text-yellow-800 dark:text-yellow-200",
  },
  rejected: {
    bg: "bg-red-100 dark:bg-red-900",
    text: "text-red-800 dark:text-red-200",
  },
};
```

## Number Formatting

Using millify for number formatting with consistent options:

```typescript
const millifyOptions = {
  precision: 1,
  lowercase: false,
};
```

## Layout Constants

```typescript
const layout = {
  maxWidth: "max-w-7xl",
  containerPadding: "px-4 sm:px-6 lg:px-8",
  sectionSpacing: "space-y-6",
  cardPadding: "p-6",
  borderRadius: "rounded-xl",
  gap: "gap-6",
};
```

## Usage Notes

1. All components support dark mode using Tailwind's dark: variants
2. Charts use Recharts library with custom styling
3. All data displays should use proper loading states (not implemented in mock)
4. Status badges should use consistent coloring across the dashboard
5. Number formatting should be consistent using millify
6. All interactive elements should have hover states
7. Maintain consistent spacing using the layout constants

## Future Considerations

1. Implement proper loading states
2. Add error boundaries
3. Add proper TypeScript interfaces for all data structures
4. Implement proper data fetching
5. Add pagination for lists
6. Add sorting and filtering capabilities
7. Implement proper form validation
8. Add proper error handling
9. Implement proper authentication
10. Add proper authorization
