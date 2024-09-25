import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn; // Only return the `conn` if it already exists
  }

  if (!cached.promise) {
   

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose.connection.db; // Return the db object
    });
  }

  cached.conn = await cached.promise;
  return cached.conn; // This should be the db instance
}

export default connectToDatabase;
