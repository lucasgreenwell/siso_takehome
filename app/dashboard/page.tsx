"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import DashboardChart from "./components/dashboard-chart"
import FieldSelector from "./components/field-selector"

interface DashboardData {
  company: string
  timeframe: string
  data: Record<string, any>[]
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [chartType, setChartType] = useState<"bar" | "line">("line")
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [availableFields, setAvailableFields] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/dashboard")

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`)
        }

        const result = await response.json()
        setData(result)

        // Extract available fields (excluding date)
        if (result.data && result.data.length > 0) {
          const fields = Object.keys(result.data[0]).filter((key) => key !== "date")
          setAvailableFields(fields)
          // Default to first two fields
          setSelectedFields(fields.slice(0, 2))
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
        setError(error instanceof Error ? error.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleFieldToggle = (field: string) => {
    setSelectedFields((prev) => (prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]))
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-8 w-1/2 mb-8" />
        <Skeleton className="h-[400px] w-full mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!data) {
    return null
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{data.company} Dashboard</h1>
          <p className="text-muted-foreground">{data.timeframe}</p>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Visualize key performance indicators over time</CardDescription>
            </div>
            <Tabs defaultValue="line" className="mt-4 md:mt-0">
              <TabsList>
                <TabsTrigger value="line" onClick={() => setChartType("line")}>
                  Line Chart
                </TabsTrigger>
                <TabsTrigger value="bar" onClick={() => setChartType("bar")}>
                  Bar Chart
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <FieldSelector
              availableFields={availableFields}
              selectedFields={selectedFields}
              onToggle={handleFieldToggle}
            />
          </div>
          <div className="h-[400px]">
            <DashboardChart data={data.data} chartType={chartType} selectedFields={selectedFields} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {selectedFields.slice(0, 4).map((field) => {
          const latestValue = data.data[data.data.length - 1][field]
          const previousValue = data.data[data.data.length - 2][field]
          const percentChange = previousValue ? ((latestValue - previousValue) / previousValue) * 100 : 0

          return (
            <Card key={field}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())
                    .replace(/([a-z])([A-Z])/g, "$1 $2")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {typeof latestValue === "number"
                    ? latestValue.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })
                    : latestValue}
                </div>
                <p
                  className={`text-xs ${percentChange > 0 ? "text-green-500" : percentChange < 0 ? "text-red-500" : "text-gray-500"}`}
                >
                  {percentChange > 0 ? "↑" : percentChange < 0 ? "↓" : ""} {Math.abs(percentChange).toFixed(1)}% from
                  previous month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

