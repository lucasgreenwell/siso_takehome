import { NextResponse } from "next/server"

// Sample data
const dashboardData = {
  company: "TechGear Emporium",
  timeframe: "2023-01-01 to 2023-12-31",
  data: [
    {
      date: "2023-01-01",
      totalSales: 15780.45,
      orderCount: 324,
      averageOrderValue: 48.71,
      topCategory: "Electronics",
      customerSatisfaction: 4.2,
      newCustomers: 87,
      returnRate: 0.05,
    },
    {
      date: "2023-02-01",
      totalSales: 18920.3,
      orderCount: 401,
      averageOrderValue: 47.18,
      topCategory: "Home & Kitchen",
      customerSatisfaction: 4.5,
      newCustomers: 103,
      returnRate: 0.04,
    },
    {
      date: "2023-03-01",
      totalSales: 22450.75,
      orderCount: 489,
      averageOrderValue: 45.91,
      topCategory: "Electronics",
      customerSatisfaction: 4.3,
      newCustomers: 131,
      returnRate: 0.06,
    },
    {
      date: "2023-04-01",
      totalSales: 20100.6,
      orderCount: 437,
      averageOrderValue: 46.0,
      topCategory: "Sports & Outdoors",
      customerSatisfaction: 4.4,
      newCustomers: 95,
      returnRate: 0.03,
    },
    {
      date: "2023-05-01",
      totalSales: 25670.9,
      orderCount: 562,
      averageOrderValue: 45.68,
      topCategory: "Electronics",
      customerSatisfaction: 4.6,
      newCustomers: 148,
      returnRate: 0.05,
    },
    {
      date: "2023-06-01",
      totalSales: 28930.15,
      orderCount: 634,
      averageOrderValue: 45.63,
      topCategory: "Fashion",
      customerSatisfaction: 4.7,
      newCustomers: 172,
      returnRate: 0.07,
    },
    {
      date: "2023-07-01",
      totalSales: 30240.8,
      orderCount: 659,
      averageOrderValue: 45.89,
      topCategory: "Electronics",
      customerSatisfaction: 4.5,
      newCustomers: 185,
      returnRate: 0.04,
    },
    {
      date: "2023-08-01",
      totalSales: 32180.25,
      orderCount: 701,
      averageOrderValue: 45.91,
      topCategory: "Home & Kitchen",
      customerSatisfaction: 4.4,
      newCustomers: 201,
      returnRate: 0.06,
    },
    {
      date: "2023-09-01",
      totalSales: 27890.5,
      orderCount: 607,
      averageOrderValue: 45.95,
      topCategory: "Electronics",
      customerSatisfaction: 4.3,
      newCustomers: 156,
      returnRate: 0.05,
    },
    {
      date: "2023-10-01",
      totalSales: 29450.7,
      orderCount: 640,
      averageOrderValue: 46.02,
      topCategory: "Sports & Outdoors",
      customerSatisfaction: 4.5,
      newCustomers: 178,
      returnRate: 0.04,
    },
    {
      date: "2023-11-01",
      totalSales: 35780.9,
      orderCount: 776,
      averageOrderValue: 46.11,
      topCategory: "Electronics",
      customerSatisfaction: 4.6,
      newCustomers: 223,
      returnRate: 0.05,
    },
    {
      date: "2023-12-01",
      totalSales: 42560.3,
      orderCount: 920,
      averageOrderValue: 46.26,
      topCategory: "Fashion",
      customerSatisfaction: 4.7,
      newCustomers: 287,
      returnRate: 0.06,
    },
  ],
}

export async function GET() {
  try {
    // Validate that each data point has a date field
    const hasInvalidData = dashboardData.data.some((item) => !item.date)

    if (hasInvalidData) {
      return NextResponse.json({ error: "Invalid data: Each data point must have a date field" }, { status: 400 })
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error("Error in dashboard API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

