"use client"

import { useMemo } from "react"
import { Bar, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, ComposedChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface DashboardChartProps {
  data: Record<string, any>[]
  chartType: "bar" | "line"
  selectedFields: string[]
}

export default function DashboardChart({ data, chartType, selectedFields }: DashboardChartProps) {
  // Format date for display
  const formattedData = useMemo(() => {
    return data.map((item) => {
      const date = new Date(item.date)
      return {
        ...item,
        formattedDate: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      }
    })
  }, [data])

  // Generate chart config for selected fields
  const chartConfig = useMemo(() => {
    const colors = [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
      "hsl(var(--chart-6))",
    ]

    return selectedFields.reduce(
      (config, field, index) => {
        config[field] = {
          label: field
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())
            .replace(/([a-z])([A-Z])/g, "$1 $2"),
          color: colors[index % colors.length],
        }
        return config
      },
      {} as Record<string, { label: string; color: string }>,
    )
  }, [selectedFields])

  if (selectedFields.length === 0) {
    return (
      <div className="flex items-center justify-center h-full border border-dashed rounded-lg">
        <p className="text-muted-foreground">Select at least one metric to display</p>
      </div>
    )
  }

  return (
    <ChartContainer config={chartConfig} className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="formattedDate" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="left"
            orientation="left"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => {
              if (value >= 1000) {
                return `${(value / 1000).toFixed(1)}k`
              }
              return value
            }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />

          {selectedFields.map((field, index) => {
            if (chartType === "bar") {
              return (
                <Bar
                  key={field}
                  dataKey={field}
                  yAxisId="left"
                  fill={`var(--color-${field})`}
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              )
            } else {
              return (
                <Line
                  key={field}
                  type="monotone"
                  dataKey={field}
                  yAxisId="left"
                  stroke={`var(--color-${field})`}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )
            }
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

