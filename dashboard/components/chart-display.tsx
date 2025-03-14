"use client"

/**
 * ChartDisplay Component
 * 
 * A responsive data visualization component that renders multiple metrics as either
 * line or bar charts. Supports automatic color assignment, responsive layouts,
 * and mobile-optimized data display.
 */

import { useMemo } from "react"
import { format, parseISO } from "date-fns"
import { useMediaQuery } from "@/hooks/use-media-query"
import { SingleMetricChart } from "./charts"

// Component props definition
interface ChartDisplayProps {
  data: any[]              // Array of data points to visualize
  type: "bar" | "line"     // Chart visualization type
  fields: string[]         // Metric fields to display
}

/**
 * Generates a color configuration for a chart field
 * Uses CSS variables for consistent theming across the application
 */
const generateColorConfig = (field: string, index: number) => {
  // Predefined chart colors from CSS variables
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-6))",
    "hsl(var(--chart-7))",
    "hsl(var(--chart-8))",
  ]

  return {
    [field]: {
      // Convert camelCase to Title Case for display
      label: field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
      color: colors[index % colors.length],
    },
  }
}

export function ChartDisplay({ data, type, fields }: ChartDisplayProps) {
  // Responsive breakpoint detection
  const isMobile = useMediaQuery("(max-width: 640px)")

  /**
   * Format date strings based on screen size
   * Mobile: Short month (e.g., "Jan")
   * Desktop: Month and year (e.g., "Jan 2023")
   */
  const formattedData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      date: format(parseISO(item.date), isMobile ? "MMM" : "MMM yyyy"),
    }))
  }, [data, isMobile])

  /**
   * Reduce data points on mobile for better performance
   * Only applies when there are more than 6 data points
   */
  const displayData = useMemo(() => {
    if (!isMobile || data.length <= 6) return formattedData

    const step = Math.ceil(data.length / 6)
    return formattedData.filter((_, index) => index % step === 0)
  }, [formattedData, isMobile, data.length])

  return (
    // Responsive grid layout: 1 column on mobile, 2 on tablet, 3 on desktop
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {fields.map((field, index) => {
        const colorConfig = generateColorConfig(field, index)
        
        // Render a SingleMetricChart for each field
        return (
          <div key={field} className="w-full h-[300px]">
            <SingleMetricChart
              data={displayData}
              field={field}
              type={type}
              colorConfig={colorConfig}
              isMobile={isMobile}
            />
          </div>
        )
      })}
    </div>
  )
}

