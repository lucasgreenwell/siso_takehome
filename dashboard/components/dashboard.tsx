"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { FieldSelector } from "@/components/field-selector"
import { ChartDisplay } from "@/components/chart-display"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

export default function Dashboard() {
  const [chartType, setChartType] = useState<"bar" | "line">("line")
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [availableFields, setAvailableFields] = useState<string[]>([])
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: new Date(2023, 11, 31),
  })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const from = dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : ""
        const to = dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : ""

        const response = await fetch(`/api/dashboard?fields=${selectedFields.join(",")}&from=${from}&to=${to}`)

        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }

        const result = await response.json()

        if (result.error) {
          throw new Error(result.error)
        }

        setData(result.data)

        // Set available fields from API response
        if (result.availableFields && result.availableFields.length > 0) {
          setAvailableFields(result.availableFields)

          // Select the first field by default if none selected
          if (selectedFields.length === 0) {
            setSelectedFields([result.availableFields[0]])
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [dateRange, selectedFields])

  const handleFieldChange = (fields: string[]) => {
    setSelectedFields(fields)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visualize and analyze your business metrics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Chart Type</CardTitle>
            <CardDescription>Select visualization type</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="line" onValueChange={(value) => setChartType(value as "bar" | "line")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="line">Line Chart</TabsTrigger>
                <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Date Range</CardTitle>
            <CardDescription>Filter data by date</CardDescription>
          </CardHeader>
          <CardContent>
            <DatePickerWithRange dateRange={dateRange} onDateRangeChange={setDateRange} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Metrics</CardTitle>
            <CardDescription>Select metrics to display</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldSelector
              availableFields={availableFields}
              selectedFields={selectedFields}
              onChange={handleFieldChange}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>
            {dateRange?.from && dateRange?.to
              ? `${format(dateRange.from, "PPP")} - ${format(dateRange.to, "PPP")}`
              : "Select a date range"}
          </CardDescription>
        </CardHeader>
        <CardContent className="max-h-[800px] overflow-y-auto pb-8">
          {isLoading ? (
            <div className="flex h-[300px] items-center justify-center">
              <p className="text-muted-foreground">Loading data...</p>
            </div>
          ) : error ? (
            <div className="flex h-[300px] items-center justify-center">
              <p className="text-destructive">{error}</p>
            </div>
          ) : data.length === 0 ? (
            <div className="flex h-[300px] items-center justify-center">
              <p className="text-muted-foreground">No data available for the selected criteria</p>
            </div>
          ) : (
            <ChartDisplay data={data} type={chartType} fields={selectedFields} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

