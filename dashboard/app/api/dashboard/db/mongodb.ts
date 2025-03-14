import mongoose from 'mongoose';

/**
 * Global MongoDB connection object
 */
let cachedConnection: typeof mongoose | null = null;

/**
 * Connects to MongoDB using environment variables
 * Reuses existing connection if available
 */
export async function connectToDatabase() {
  // If we already have a connection, return it
  if (cachedConnection) {
    return cachedConnection;
  }

  // Get connection string from environment variables
  const connectionString = process.env.MONGODB_URI;
  
  if (!connectionString) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  try {
    // Connect to MongoDB
    const connection = await mongoose.connect(connectionString);
    
    console.log('MongoDB connected successfully');
    
    // Cache the connection
    cachedConnection = connection;
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

/**
 * Disconnects from MongoDB
 * Useful for testing and cleanup
 */
export async function disconnectFromDatabase() {
  if (cachedConnection) {
    await mongoose.disconnect();
    cachedConnection = null;
    console.log('MongoDB disconnected');
  }
}
