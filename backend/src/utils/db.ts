import mongoose from 'mongoose';
import { mongoURI } from './config';

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, { 
      // ssl: true,
      // tlsInsecure: true  // Use with caution, for development only
    });
    console.log(`MongoDB connected successfully to ${mongoose.connection.host} `);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    if ((err as NodeJS.ErrnoException).code === 'ENOTFOUND') {
      console.error('Network issue, please check your internet connection.');
    } else if ((err as Error).message.includes('SSL')) {
      console.error('SSL/TLS issue, please ensure your connection string includes the necessary SSL/TLS options.');
    }
    process.exit(1);
  }
};

// export const connectDB = async () => {
//   await mongoose.connect(mongoURI);

//   console.log(`the db is connected to ${mongoose.connection.host}`);
// }