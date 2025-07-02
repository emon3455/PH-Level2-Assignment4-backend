import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI as string;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in .env');
    }

    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
  }
};
