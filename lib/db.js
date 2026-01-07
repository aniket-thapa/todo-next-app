import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-next-app';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log('Cached Database Connected Successfully');
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log('Database Connected Successfully');
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.conn;
}

export default connectDB;
