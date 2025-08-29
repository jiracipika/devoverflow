import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.warn("MONGODB_URI is not defined. Database operations will be skipped during build.")
}

interface GlobalMongoose {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var myMongoose: GlobalMongoose | undefined
}

let cached = global.myMongoose

if (!cached) {
  cached = global.myMongoose = { conn: null, promise: null }
}

export async function connectDB() {
  // Skip database connection during build if no URI is provided
  if (!MONGODB_URI) {
    console.warn("Skipping database connection - MONGODB_URI not provided")
    return null
  }

  if (cached!.conn) {
    return cached!.conn
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    }

    cached!.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((myMongoose) => {
        console.log("Connected to MongoDB")
        return myMongoose
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error)
        cached!.promise = null
        throw error
      })
  }

  try {
    cached!.conn = await cached!.promise
  } catch (e) {
    cached!.promise = null
    throw e
  }

  return cached!.conn
}
