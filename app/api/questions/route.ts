import { NextResponse } from "next/server"
import { connectDB } from "@/lib/database"

export async function GET() {
  try {
    const connection = await connectDB()

    if (!connection) {
      // Return mock data during build
      const mockQuestions = [
        {
          id: 1,
          title: "How to implement authentication in Next.js 14?",
          content: "I'm trying to implement authentication in my Next.js 14 application...",
          author: "john_dev",
          votes: 15,
          answers: 3,
          views: 234,
          tags: ["nextjs", "authentication", "react"],
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          title: "Best practices for React state management in 2024",
          content: "What are the current best practices for managing state in React applications?",
          author: "sarah_codes",
          votes: 23,
          answers: 7,
          views: 456,
          tags: ["react", "state-management", "redux"],
          createdAt: new Date().toISOString(),
        },
      ]

      return NextResponse.json({ questions: mockQuestions })
    }

    // Real database logic would go here
    return NextResponse.json({ questions: [] })
  } catch (error) {
    console.error("Questions API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST() {
  try {
    const connection = await connectDB()

    if (!connection) {
      return NextResponse.json(
        {
          success: false,
          error: "Database not available during build",
        },
        { status: 503 },
      )
    }

    // Mock successful question creation
    const mockQuestion = {
      id: Date.now(),
      title: "Mock Question",
      content: "This is a mock question created during build",
      author: "mock_user",
      votes: 0,
      answers: 0,
      views: 1,
      tags: ["mock"],
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ success: true, question: mockQuestion })
  } catch (error) {
    console.error("Create question error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
