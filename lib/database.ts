import { MongoClient, type Db } from "mongodb"

let client: MongoClient
let db: Db

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()
    db = client.db("devoverflow")
  }

  return { client, db }
}

export async function closeDatabaseConnection() {
  if (client) {
    await client.close()
  }
}

// Database collections
export const collections = {
  users: "users",
  blogs: "blogs",
  questions: "questions",
  communities: "communities",
  tokens: "tokens",
  tags: "tags",
}
