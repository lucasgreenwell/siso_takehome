import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing a metric document in MongoDB
 */
export interface IMetric extends Document {
  date: string;
  totalSales: number;
  orderCount: number;
  averageOrderValue: number;
  topCategory: string;
  customerSatisfaction: number;
  newCustomers: number;
  returnRate: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose schema for metrics data
 * Includes all fields from the hardcoded data
 */
const MetricSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
      index: true,
    },
    totalSales: {
      type: Number,
      required: true,
    },
    orderCount: {
      type: Number,
      required: true,
    },
    averageOrderValue: {
      type: Number,
      required: true,
    },
    topCategory: {
      type: String,
      required: true,
    },
    customerSatisfaction: {
      type: Number,
      required: true,
    },
    newCustomers: {
      type: Number,
      required: true,
    },
    returnRate: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create and export the model, ensuring it's only created once
export const Metric = mongoose.models.Metric || mongoose.model<IMetric>('Metric', MetricSchema); 