# Dashboard with MongoDB Integration

This project is a dashboard application that displays business metrics using MongoDB as the data source.

## Setup

### Prerequisites
- Node.js (v14 or higher)
- npm
- MongoDB Atlas account (or local MongoDB instance)

### Installation
1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file with MongoDB connection details:
   ```
   MONGODB_USERNAME=your_username
   MONGODB_PASSWORD=your_password
   MONGODB_CLUSTER=your_cluster
   MONGODB_URI=your_connection_string
   ```

### Database Setup
1. Ensure your MongoDB connection details are correctly set in `.env.local`
2. Run the database seed script to populate MongoDB with sample data:
   ```
   npm run seed-db
   ```

## Development
Start the development server:
```
npm run dev
```

## API Documentation

### Dashboard API
The dashboard API provides access to metrics data stored in MongoDB.

#### Endpoint
```
GET /api/dashboard
```

#### Query Parameters
- `fields`: Comma-separated list of fields to include (e.g., `totalSales,orderCount`)
- `from`: Start date for filtering (ISO format, e.g., `2023-01-01`)
- `to`: End date for filtering (ISO format, e.g., `2023-12-31`)

#### Example Requests
- Get all metrics for the entire year:
  ```
  GET /api/dashboard?from=2023-01-01&to=2023-12-31
  ```
- Get specific metrics for a quarter:
  ```
  GET /api/dashboard?from=2023-01-01&to=2023-03-31&fields=totalSales,orderCount
  ```

## Project Structure
- `dashboard/app/api/dashboard/route.ts`: API route for dashboard data
- `lib/mongodb.ts`: MongoDB connection utility
- `lib/models/metric.ts`: Mongoose schema for metrics data
- `scripts/seed-database.ts`: Script to seed the database with sample data

## Documentation
- `lib/mongodb_docs.md`: Documentation for MongoDB integration
- `dashboard/app/api/dashboard/route_docs.md`: Documentation for the dashboard API route 