import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/database"
import Question from "@/models/Question"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const sortBy = searchParams.get("sortBy") || "newest"
    const tags = searchParams.get("tags")?.split(",").filter(Boolean) || []
    const answered = searchParams.get("answered") || "all"
    const search = searchParams.get("search") || ""

    // Build query
    const query: any = {}

    if (tags.length > 0) {
      query.tags = { $in: tags }
    }

    if (answered === "answered") {
      query.answers = { $gt: 0 }
    } else if (answered === "unanswered") {
      query.answers = 0
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ]
    }

    // Build sort
    let sort: any = {}
    switch (sortBy) {
      case "oldest":
        sort = { createdAt: 1 }
        break
      case "most-votes":
        sort = { votes: -1 }
        break
      case "most-answers":
        sort = { answers: -1 }
        break
      default:
        sort = { createdAt: -1 }
    }

    // Execute query
    const questions = await Question.find(query)
      .populate("author", "name avatar reputation")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    const total = await Question.countDocuments(query)

    return NextResponse.json({
      success: true,
      questions,
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
    await connectDB()

    // Verify authentication
    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content, tags } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // Create question
    const question = await Question.create({
      title,
      content,
      tags: tags || [],
      author: user.userId,
      votes: 0,
      answers: 0,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Populate author info
    await question.populate("author", "name avatar reputation")

    return NextResponse.json({
      success: true,
      question,
    })
  } catch (error) {
    console.error("Create question error:", error)
    return NextResponse.json({ error: "Failed to create question" }, { status: 500 })
  }
}
