import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "../../../../lib/mongodb"
import { Metric } from "../../../../lib/models/metric"

/**
 * GET handler for dashboard metrics data
 * Fetches data from MongoDB based on query parameters
 */
export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const fieldsParam = searchParams.get("fields")
    const fromDate = searchParams.get("from")
    const toDate = searchParams.get("to")

    // Build query for MongoDB
    const query: any = {};
    
    // Add date range filter if provided
    if (fromDate && toDate) {
      // Convert dates to ISO format for comparison
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);
      
      // Create a date range query
      // We're using string comparison since our dates are stored as strings
      // For a production app, consider storing dates as Date objects
      query.date = {
        $gte: fromDateObj.toISOString().split('T')[0],
        $lte: toDateObj.toISOString().split('T')[0]
      };
    }

    // Fetch data from MongoDB
    const metricsData = await Metric.find(query).lean();

    // Validate data has date field
    for (const item of metricsData) {
      if (!item.date) {
        return NextResponse.json(
          { error: "Data validation error: Missing date field in one or more data points" },
          { status: 400 },
        )
      }
    }

    // Get all available fields (excluding date, _id, and timestamps)
    const allFields = metricsData.length > 0 
      ? Object.keys(metricsData[0])
          .filter(key => !['date', '_id', 'createdAt', 'updatedAt', '__v'].includes(key)) 
      : [];

    // Filter to only include numeric fields
    const numericFields = allFields.filter((field) => {
      // Check if the field contains numeric values
      return metricsData.every((item) => {
        const value = item[field]
        return typeof value === "number" && !isNaN(value)
      })
    })

    // Filter fields if specified
    let selectedFields: string[] = []

    if (fieldsParam) {
      // Only include fields that are in the numeric fields list
      selectedFields = fieldsParam.split(",").filter((field) => numericFields.includes(field))
    }

    // If no fields specified, return all numeric fields
    if (selectedFields.length === 0) {
      selectedFields = numericFields
    }

    // Create response with only the requested fields
    const responseData = metricsData.map((item) => {
      const result: Record<string, any> = { date: item.date }

      selectedFields.forEach((field) => {
        if (field in item) {
          result[field] = item[field]
        }
      })

      return result
    })

    return NextResponse.json({
      data: responseData,
      availableFields: numericFields,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

