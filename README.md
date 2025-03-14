

# Hey Frank 👋 
For convenience, I went ahead and threw this up on vercel so you can play with the widget. Access it [here](https://siso-takehome.vercel.app/). 

## There's some extra fluff in here because it's a next app and I wanted to keep the widget pretty flexible. You probably only care about:
1. [the chart widget](https://github.com/lucasgreenwell/siso_takehome/tree/main/dashboard/components/charts)
2. [the api route](https://github.com/lucasgreenwell/siso_takehome/blob/main/dashboard/app/api/dashboard/route.ts)
3. [database stuff](https://github.com/lucasgreenwell/siso_takehome/tree/main/dashboard/app/api/dashboard/db)

## Setup if you wanna get it up locally

### Prerequisites
- Node.js (v14 or higher)
- bun
- MongoDB Atlas account (or local MongoDB instance)

### Installation
1. Clone the repository
2. Install dependencies:
   ```
   bun i
   ```
3. Create a `.env.local` file with MongoDB connection details:
   ```
   MONGODB_URI=your_connection_string
   ```

### Database Setup
1. Ensure your MongoDB connection details are correctly set in `.env.local`
2. Run the database seed script to populate MongoDB with sample data:
   ```
   bun seed-db
   ```

## Development
Start the development server:
```
bun dev
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
