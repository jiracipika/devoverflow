import { NextResponse } from "next/server"
import connectDB from "@/lib/database"

export async function GET() {
  try {
    const db = await connectDB()

    if (!db) {
      // Return mock data when database is not available
      return NextResponse.json({
        communities: [
          {
            id: "1",
            name: "JavaScript Developers",
            description: "A community for JavaScript enthusiasts",
            memberCount: 15420,
            tags: ["javascript", "web-development"],
          },
          {
            id: "2",
            name: "React Community",
            description: "Everything about React and its ecosystem",
            memberCount: 12350,
            tags: ["react", "frontend"],
          },
        ],
      })
    }

    // Database operations would go here
    return NextResponse.json({ communities: [] })
  } catch (error) {
    console.error("Error fetching communities:", error)
    return NextResponse.json({ error: "Failed to fetch communities" }, { status: 500 })
  }
}
