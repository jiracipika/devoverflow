import { NextResponse } from "next/server"
import connectDB from "@/lib/database"

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
          author: {
            id: "1",
            name: "John Doe",
            avatar: null,
            reputation: 150,
          },
          tags: ["nextjs", "authentication", "typescript"],
          votes: 15,
          answers: 3,
          views: 234,
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          title: "Best practices for React state management in 2024",
          content: "What are the current best practices for managing state in React applications?",
          author: {
            id: "2",
            name: "React Dev",
            avatar: null,
            reputation: 280,
          },
          tags: ["react", "state-management", "redux"],
          votes: 28,
          answers: 7,
          views: 456,
          createdAt: new Date().toISOString(),
        },
      ]

      return NextResponse.json({ questions: mockQuestions })
    }

    // In a real app, you would fetch from database here
    return NextResponse.json({ questions: [] })
  } catch (error) {
    console.error("Questions API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
