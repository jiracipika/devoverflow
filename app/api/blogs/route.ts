import { NextResponse } from "next/server"
import connectDB from "@/lib/database"

export async function GET() {
  try {
    const db = await connectDB()

    if (!db) {
      // Return mock data when database is not available
      return NextResponse.json({
        blogs: [
          {
            id: "1",
            title: "Getting Started with Next.js 14",
            excerpt: "Learn the basics of Next.js 14 and its new features",
            author: "John Doe",
            createdAt: new Date().toISOString(),
            tags: ["nextjs", "react", "javascript"],
          },
          {
            id: "2",
            title: "Understanding React Server Components",
            excerpt: "A deep dive into React Server Components and their benefits",
            author: "Jane Smith",
            createdAt: new Date().toISOString(),
            tags: ["react", "server-components"],
          },
        ],
      })
    }

    // Database operations would go here
    return NextResponse.json({ blogs: [] })
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}
