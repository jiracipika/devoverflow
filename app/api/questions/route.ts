import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database"

// Mock question data for development/build
const mockQuestions = [
  {
    id: "1",
    title: "How to implement authentication in Next.js 14?",
    content:
      "I'm trying to implement authentication in my Next.js 14 application using the new app router. What's the best approach?",
    author: "john_dev",
    votes: 15,
    answers: 3,
    views: 234,
    tags: ["nextjs", "authentication", "react"],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    isAnswered: true,
  },
  {
    id: "2",
    title: "Best practices for React state management in 2024",
    content:
      "What are the current best practices for managing state in React applications? Should I use Redux, Zustand, or stick with built-in hooks?",
    author: "sarah_codes",
    votes: 23,
    answers: 7,
    views: 456,
    tags: ["react", "state-management", "redux"],
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    isAnswered: true,
  },
  {
    id: "3",
    title: "Python async/await vs threading performance comparison",
    content:
      "I'm working on a Python application that needs to handle concurrent operations. When should I use async/await vs threading?",
    author: "mike_python",
    votes: 31,
    answers: 12,
    views: 789,
    tags: ["python", "async", "performance"],
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    isAnswered: true,
  },
  {
    id: "4",
    title: "TypeScript generic constraints explained",
    content:
      "Can someone explain how generic constraints work in TypeScript? I'm having trouble understanding the syntax.",
    author: "alex_ts",
    votes: 18,
    answers: 5,
    views: 321,
    tags: ["typescript", "generics", "types"],
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    isAnswered: false,
  },
]

export async function GET(request: NextRequest) {
  try {
    const db = await connectDB()

    if (!db) {
      // Return mock data when database is not available
      const { searchParams } = new URL(request.url)
      const search = searchParams.get("search") || ""
      const filter = searchParams.get("filter") || "newest"
      const tag = searchParams.get("tag") || ""

      let filteredQuestions = [...mockQuestions]

      // Apply search filter
      if (search) {
        filteredQuestions = filteredQuestions.filter(
          (question) =>
            question.title.toLowerCase().includes(search.toLowerCase()) ||
            question.content.toLowerCase().includes(search.toLowerCase()) ||
            question.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())),
        )
      }

      // Apply tag filter
      if (tag) {
        filteredQuestions = filteredQuestions.filter((question) => question.tags.includes(tag.toLowerCase()))
      }

      // Apply sorting
      switch (filter) {
        case "oldest":
          filteredQuestions.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          break
        case "votes":
          filteredQuestions.sort((a, b) => b.votes - a.votes)
          break
        case "answers":
          filteredQuestions.sort((a, b) => b.answers - a.answers)
          break
        case "unanswered":
          filteredQuestions = filteredQuestions.filter((q) => !q.isAnswered)
          break
        case "newest":
        default:
          filteredQuestions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          break
      }

      return NextResponse.json({
        success: true,
        data: filteredQuestions,
        total: filteredQuestions.length,
      })
    }

    // Database operations would go here
    return NextResponse.json({ questions: [] })
  } catch (error) {
    console.error("Error fetching questions:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch questions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, tags, author } = body

    if (!title || !content || !author) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const newQuestion = {
      id: Date.now().toString(),
      title,
      content,
      author,
      tags: tags || [],
      votes: 0,
      answers: 0,
      views: 0,
      createdAt: new Date().toISOString(),
      isAnswered: false,
    }

    // In a real app, this would save to database
    mockQuestions.unshift(newQuestion)

    return NextResponse.json(
      {
        success: true,
        data: newQuestion,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating question:", error)
    return NextResponse.json({ success: false, error: "Failed to create question" }, { status: 500 })
  }
}
