import { NextResponse } from "next/server"
import connectDB from "@/lib/database"

export async function GET() {
  try {
    const connection = await connectDB()

    if (!connection) {
      // Return mock data during build
      return NextResponse.json({
        questions: [
          {
            id: "1",
            title: "How to implement authentication in Next.js 14?",
            content: "I'm trying to understand the best practices for authentication in Next.js 14...",
            author: {
              id: "user1",
              name: "John Developer",
              avatar: null,
              reputation: 1250,
            },
            tags: ["nextjs", "authentication", "react"],
            votes: 15,
            answers: 3,
            views: 245,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "2",
            title: "TypeScript generic constraints with conditional types",
            content: "I'm working with complex TypeScript generics and need help...",
            author: {
              id: "user2",
              name: "TypeScript Guru",
              avatar: null,
              reputation: 2340,
            },
            tags: ["typescript", "generics", "types"],
            votes: 23,
            answers: 5,
            views: 412,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      })
    }

    // In a real app, this would fetch from the database
    return NextResponse.json({ questions: [] })
  } catch (error) {
    console.error("Questions API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const connection = await connectDB()

    if (!connection) {
      return NextResponse.json({ error: "Database not available during build" }, { status: 503 })
    }

    const { title, content, tags } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // Mock successful question creation
    const mockQuestion = {
      id: "new-question-id",
      title,
      content,
      tags: tags || [],
      author: {
        id: "mock-user-id",
        name: "Mock User",
        avatar: null,
        reputation: 1,
      },
      votes: 0,
      answers: 0,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ question: mockQuestion }, { status: 201 })
  } catch (error) {
    console.error("Create question error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
