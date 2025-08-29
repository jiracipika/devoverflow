import { type NextRequest, NextResponse } from "next/server"

// Mock data for development/build
const mockQuestions = [
  {
    _id: "1",
    title: "How to handle async/await in React components?",
    content: "I'm trying to fetch data in a React component using async/await but getting errors...",
    tags: ["React", "JavaScript", "Async"],
    author: {
      name: "John Doe",
      avatar: "/placeholder-user.jpg",
      reputation: 150,
    },
    votes: 5,
    answers: 3,
    views: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    title: "Best practices for Django REST API authentication?",
    content: "What are the recommended approaches for implementing authentication in Django REST...",
    tags: ["Python", "Django", "Authentication"],
    author: {
      name: "Sarah Miller",
      avatar: "/placeholder-user.jpg",
      reputation: 280,
    },
    votes: 8,
    answers: 2,
    views: 24,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const sortBy = searchParams.get("sortBy") || "newest"
    const tags = searchParams.get("tags")?.split(",").filter(Boolean) || []
    const answered = searchParams.get("answered") || "all"
    const search = searchParams.get("search") || ""

    let filtered = mockQuestions

    // Apply filters
    if (tags.length > 0) {
      filtered = filtered.filter((q) => q.tags.some((tag) => tags.includes(tag)))
    }

    if (answered === "answered") {
      filtered = filtered.filter((q) => q.answers > 0)
    } else if (answered === "unanswered") {
      filtered = filtered.filter((q) => q.answers === 0)
    }

    if (search) {
      filtered = filtered.filter(
        (q) =>
          q.title.toLowerCase().includes(search.toLowerCase()) ||
          q.content.toLowerCase().includes(search.toLowerCase()) ||
          q.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())),
      )
    }

    // Apply sorting
    switch (sortBy) {
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case "most-votes":
        filtered.sort((a, b) => b.votes - a.votes)
        break
      case "most-answers":
        filtered.sort((a, b) => b.answers - a.answers)
        break
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    const total = filtered.length
    const startIndex = (page - 1) * limit
    const paginatedQuestions = filtered.slice(startIndex, startIndex + limit)

    return NextResponse.json({
      success: true,
      questions: paginatedQuestions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get questions error:", error)
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, tags } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const question = {
      _id: Date.now().toString(),
      title,
      content,
      tags: tags || [],
      author: {
        name: "Current User",
        avatar: "/placeholder-user.jpg",
        reputation: 100,
      },
      votes: 0,
      answers: 0,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      question,
    })
  } catch (error) {
    console.error("Create question error:", error)
    return NextResponse.json({ error: "Failed to create question" }, { status: 500 })
  }
}
