"use client"

/**
 * SingleMetricChart Component
 * 
 * A reusable chart component that displays a single metric as either a bar or line chart.
 * Designed to be used within dashboard widgets and supports responsive layouts.
 * 
 * @component
 */

import { Bar, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, ComposedChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

/**
 * Props for the SingleMetricChart component
 */
export interface SingleMetricChartProps {
  /**
   * The dataset to visualize
   */
  data: any[];
  
  /**
   * The metric field to display from the data
   */
  field: string;
  
  /**
   * Chart visualization type (bar or line)
   */
  type: "bar" | "line";
  
  /**
   * Color configuration for the chart
   * Contains label and color information for the field
   */
  colorConfig: {
    [key: string]: {
      label: string;
      color: string;
    }
  };
  
  /**
   * Whether the chart is being displayed on a mobile device
   * Used for responsive adjustments
   */
  isMobile: boolean;
  
  /**
   * Optional CSS class name for additional styling
   */
  className?: string;
}

/**
 * SingleMetricChart component renders a single metric as a chart
 * 
 * @param props - Component props
 * @returns React component
 */
export function SingleMetricChart({
  data,
  field,
  type,
  colorConfig,
  isMobile,
  className = "h-full",
}: SingleMetricChartProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* Chart title */}
      <h3 className="text-lg font-medium mb-2">{colorConfig[field].label}</h3>
      
      {/* Chart container with color configuration */}
      <ChartContainer config={colorConfig} className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: isMobile ? 10 : 20,
              bottom: isMobile ? 50 : 70,
            }}
          >
            {/* Chart grid lines */}
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

            {/* Date axis with responsive formatting */}
            <XAxis
              dataKey="date"
              angle={isMobile ? -45 : -30}
              textAnchor="end"
              height={isMobile ? 50 : 70}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              interval={isMobile ? 1 : 0}
            />

            {/* Value axis with responsive sizing */}
            <YAxis 
              width={isMobile ? 40 : 60} 
              tick={{ fontSize: isMobile ? 10 : 12 }} 
            />

            {/* Interactive elements */}
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend verticalAlign="top" height={36} />

            {/* Render either bar or line chart based on type prop */}
            {type === "bar" ? (
              <Bar
                dataKey={field}
                name={colorConfig[field].label}
                fill={`var(--color-${field})`}
                stroke={`var(--color-${field})`}
                strokeWidth={1}
                radius={[4, 4, 0, 0]}
              />
            ) : (
              <Line
                type="monotone"
                dataKey={field}
                name={colorConfig[field].label}
                stroke={`var(--color-${field})`}
                strokeWidth={2}
                dot={{ r: isMobile ? 3 : 4 }}
                activeDot={{ r: isMobile ? 5 : 6 }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
} 