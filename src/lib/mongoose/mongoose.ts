import mongoose, { Connection, ConnectOptions } from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error(
    'Please define the DATABASE_URL environment variable inside .env.local'
  );
}

// Перевіряємо чи є кешована версія mongoose
let cached = global.mongoose;

if (!cached) {
  //ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: ConnectOptions = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
