# SingleMetricChart Component

A reusable, responsive chart component for displaying a single metric in either bar or line chart format. Designed for integration into dashboard widgets and data visualization applications.

## Features

- **Visualization Types**: Supports both bar and line charts
- **Responsive Design**: Adapts to different screen sizes
- **Interactive Elements**: Includes tooltips and legends
- **Customizable**: Configurable colors and styling
- **Accessibility**: Properly labeled chart elements

## Usage

```tsx
import { SingleMetricChart } from '@/dashboard/components/charts';

// Example usage
function MyDashboardWidget({ data }) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  // Generate color config for the field
  const colorConfig = {
    totalSales: {
      label: "Total Sales",
      color: "hsl(var(--chart-1))"
    }
  };
  
  return (
    <div className="dashboard-widget">
      <SingleMetricChart
        data={data}
        field="totalSales"
        type="line"
        colorConfig={colorConfig}
        isMobile={isMobile}
      />
    </div>
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | `any[]` | Yes | Array of data objects to visualize |
| `field` | `string` | Yes | The data field/key to display in the chart |
| `type` | `"bar" \| "line"` | Yes | Chart visualization type |
| `colorConfig` | `object` | Yes | Color and label configuration for the field |
| `isMobile` | `boolean` | Yes | Whether the chart is being displayed on a mobile device |
| `className` | `string` | No | Additional CSS class for styling (default: "h-full") |

### ColorConfig Object Structure

```typescript
{
  [fieldName: string]: {
    label: string;    // Display label for the field
    color: string;    // Color value (CSS variable or direct color)
  }
}
```

## Styling

The component uses Tailwind CSS for styling and expects CSS variables for colors:

```css
:root {
  --color-totalSales: var(--chart-1);
  --color-orderCount: var(--chart-2);
  /* Add more field-specific color mappings as needed */
}
```

## Responsive Behavior

The component adapts to mobile screens by:
- Adjusting axis dimensions and font sizes
- Changing the angle of X-axis labels
- Modifying chart margins
- Adjusting dot sizes for line charts

## Dependencies

- [Recharts](https://recharts.org/) - For chart rendering
- [components/ui/chart](../ui/chart) - For chart container and tooltip components

## Examples

### Line Chart Example

```tsx
<SingleMetricChart
  data={salesData}
  field="revenue"
  type="line"
  colorConfig={{
    revenue: {
      label: "Monthly Revenue",
      color: "hsl(var(--chart-3))"
    }
  }}
  isMobile={false}
/>
```

### Bar Chart Example

```tsx
<SingleMetricChart
  data={userData}
  field="activeUsers"
  type="bar"
  colorConfig={{
    activeUsers: {
      label: "Active Users",
      color: "hsl(var(--chart-5))"
    }
  }}
  isMobile={isMobile}
  className="h-[400px]"
/>
```

## Best Practices

1. **Data Format**: Ensure your data includes a `date` field for the X-axis
2. **Mobile Detection**: Use a proper media query hook for the `isMobile` prop
3. **Height Control**: Set an appropriate height on the parent container or via className
4. **Color Variables**: Use CSS variables for consistent theming across the application 
