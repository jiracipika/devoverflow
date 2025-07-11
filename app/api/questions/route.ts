import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/database"
import Question from "@/models/Question"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const filter = searchParams.get("filter") || "newest"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Build query
    const query: any = {}

    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }, { content: { $regex: search, $options: "i" } }]
    }

    // Build sort
    let sort: any = {}
    switch (filter) {
      case "newest":
        sort = { createdAt: -1 }
        break
      case "frequent":
        sort = { views: -1 }
        break
      case "unanswered":
        query.answers = { $size: 0 }
        sort = { createdAt: -1 }
        break
      case "recommended":
        sort = { votes: -1, views: -1 }
        break
      default:
        sort = { createdAt: -1 }
    }

    const questions = await Question.find(query)
      .populate("author", "name avatar")
      .populate("tags", "name")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)

    const total = await Question.countDocuments(query)

    return NextResponse.json({
      questions: questions.map((q) => ({
        id: q._id,
        title: q.title,
        content: q.content,
        author: q.author,
        tags: q.tags.map((t: any) => t.name),
        votes: q.votes || 0,
        answers: q.answers?.length || 0,
        views: q.views || 0,
        createdAt: q.createdAt,
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Questions fetch error:", error)
    return NextResponse.json({ message: "Failed to fetch questions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { title, content, tags, authorId } = await request.json()

    if (!title || !content || !authorId) {
      return NextResponse.json({ message: "Title, content, and author are required" }, { status: 400 })
    }

    const question = await Question.create({
      title,
      content,
      author: authorId,
      tags: tags || [],
      votes: 0,
      views: 0,
      answers: [],
    })

    await question.populate("author", "name avatar")
    await question.populate("tags", "name")

    return NextResponse.json({
      message: "Question created successfully",
      question: {
        id: question._id,
        title: question.title,
        content: question.content,
        author: question.author,
        tags: question.tags.map((t: any) => t.name),
        votes: question.votes,
        answers: question.answers.length,
        views: question.views,
        createdAt: question.createdAt,
      },
    })
  } catch (error) {
    console.error("Question creation error:", error)
    return NextResponse.json({ message: "Failed to create question" }, { status: 500 })
  }
}
