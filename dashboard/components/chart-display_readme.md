# ChartDisplay Component Documentation

## Overview
The ChartDisplay component is a responsive data visualization component that renders line or bar charts using Recharts. It supports multiple metrics display with automatic color assignment and responsive layout adaptation for different screen sizes.

## Props Interface
```typescript
interface ChartDisplayProps {
  data: any[]        // Array of data points to display
  type: "bar" | "line" // Chart type selection
  fields: string[]   // Array of field names to display as charts
}
```

## Key Functions

### generateColorConfig
Generates consistent color configurations for chart fields using CSS variables.
```typescript
generateColorConfig(field: string, index: number) => {
  [field]: {
    label: string,    // Formatted field label
    color: string     // HSL color value
  }
}
```

### Data Formatting
The component handles data formatting in two key ways:
1. Date formatting: Adapts date display format based on screen size
2. Data point reduction: Reduces data points on mobile for better performance

## Responsive Behavior
- Mobile (<640px):
  - Single column layout
  - Simplified date format
  - Reduced data points
  - Adjusted margins and font sizes
- Tablet (768px - 1024px):
  - Two column layout
  - Full date format
  - Full data points
- Desktop (>1024px):
  - Three column layout
  - Full date format
  - Full data points

## Chart Configuration
### Layout
- Chart height: 300px
- Responsive grid system:
  ```css
  grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  ```
- Consistent 2rem gap between charts

### Chart Elements
1. CartesianGrid
2. XAxis (date)
3. YAxis (metric value)
4. Tooltip (hover for precise value)
5. Legend (title)
6. Bar/Line based on type prop

## Usage Example
```tsx
<ChartDisplay
  data={[
    { date: "2023-01-01", metric1: 100, metric2: 200 },
    { date: "2023-02-01", metric1: 150, metric2: 250 }
  ]}
  type="line"
  fields={["metric1", "metric2"]}
/>
``` 