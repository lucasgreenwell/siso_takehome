"use client"

/**
 * ChartDisplay Component
 * 
 * A responsive data visualization component that renders multiple metrics as either
 * line or bar charts. Supports automatic color assignment, responsive layouts,
 * and mobile-optimized data display.
 */

import { useMemo } from "react"
import { Bar, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, ComposedChart } from "recharts"
import { format, parseISO } from "date-fns"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useMediaQuery } from "@/hooks/use-media-query"

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

        return (
          <div key={field} className="w-full h-[300px]">
            <h3 className="text-lg font-medium mb-2">{colorConfig[field].label}</h3>
            <ChartContainer config={colorConfig} className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={displayData}
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
      })}
    </div>
  )
}

