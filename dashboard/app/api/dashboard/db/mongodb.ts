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
  let connectionString = process.env.MONGODB_URI;
  
  if (!connectionString) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  // Ensure the connection string has the full domain for MongoDB Atlas
  // This fixes the "querySrv ENOTFOUND _mongodb._tcp.cluster0" error on Vercel
  if (connectionString.includes('@cluster0') && !connectionString.includes('.mongodb.net')) {
    connectionString = connectionString.replace('@cluster0', '@cluster0.9kcew.mongodb.net');
  }

  try {
    // Connect to MongoDB with proper options
    const connection = await mongoose.connect(connectionString, {
      // These options help with connection stability
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
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
