"use client"

import { useMemo } from "react"
import { Bar, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, ComposedChart } from "recharts"
import { format, parseISO } from "date-fns"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useTheme } from "next-themes"
import { useMediaQuery } from "@/hooks/use-media-query"

interface ChartDisplayProps {
  data: any[]
  type: "bar" | "line"
  fields: string[]
}

// Generate a color palette for the chart
const generateColorConfig = (field: string, index: number) => {
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
      label: field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
      color: colors[index % colors.length],
    },
  }
}

export function ChartDisplay({ data, type, fields }: ChartDisplayProps) {
  const { theme } = useTheme()
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  // Format dates for display
  const formattedData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      date: format(parseISO(item.date), isMobile ? "MMM" : "MMM yyyy"),
    }))
  }, [data, isMobile])

  // For mobile, reduce the number of data points to show
  const displayData = useMemo(() => {
    if (!isMobile || data.length <= 6) return formattedData

    // For mobile with more than 6 data points, show every other point
    const step = Math.ceil(data.length / 6)
    return formattedData.filter((_, index) => index % step === 0)
  }, [formattedData, isMobile, data.length])

  return (
    <div className="w-full space-y-8">
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
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis
                    dataKey="date"
                    angle={isMobile ? -45 : -30}
                    textAnchor="end"
                    height={isMobile ? 50 : 70}
                    tick={{ fontSize: isMobile ? 10 : 12 }}
                    interval={isMobile ? 1 : 0}
                  />
                  <YAxis width={isMobile ? 40 : 60} tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend verticalAlign="top" height={36} />

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

