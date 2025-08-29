import { NextResponse } from "next/server"
import connectDB from "@/lib/database"

export async function GET() {
  try {
    const connection = await connectDB()

    if (!connection) {
      // Return mock data during build
      return NextResponse.json({
        success: true,
        questions: [
          {
            id: 1,
            title: "How to implement authentication in Next.js 14?",
            content: "I'm trying to understand the best practices for SSR in the latest version of Next.js.",
            author: "alex_dev",
            tags: ["nextjs", "authentication", "react"],
            votes: 15,
            answers: 3,
            views: 245,
            createdAt: new Date().toISOString(),
          },
          {
            id: 2,
            title: "TypeScript generic constraints with conditional types",
            content: "I'm working with complex TypeScript generics and need help understanding constraints.",
            author: "typescript_guru",
            tags: ["typescript", "generics", "types"],
            votes: 23,
            answers: 5,
            views: 412,
            createdAt: new Date().toISOString(),
          },
        ],
      })
    }

    // In a real implementation, you would fetch from database here
    return NextResponse.json({
      success: true,
      questions: [],
    })
  } catch (error) {
    console.error("Questions API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
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

    const { title, content, tags } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // Mock successful question creation
    const mockQuestion = {
      id: Date.now(),
      title,
      content,
      tags: tags || [],
      author: "mock-user",
      votes: 0,
      answers: 0,
      views: 0,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      question: mockQuestion,
    })
  } catch (error) {
    console.error("Create question error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
