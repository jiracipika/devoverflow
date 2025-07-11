import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const tag = searchParams.get("tag")
    const filter = searchParams.get("filter") || "newest"

    await client.connect()
    const db = client.db("devoverflow")
    const questions = db.collection("questions")

    const query: any = {}

    if (search) {
      query.$or = [{ title: { $regex: new RegExp(search, "i") } }, { content: { $regex: new RegExp(search, "i") } }]
    }

    if (tag) {
      query.tags = { $in: [new RegExp(tag, "i")] }
    }

    let sortQuery: any = { time: -1 } // Default: newest

    switch (filter) {
      case "recommended":
        sortQuery = { votes: -1 }
        break
      case "frequent":
        sortQuery = { views: -1 }
        break
      case "unanswered":
        query.numberOfAnswers = 0
        break
    }

    const questionList = await questions.find(query).sort(sortQuery).toArray()

    const formatted = questionList.map((q) => ({
      id: q._id.toString(),
      title: q.title,
      content: q.body,
      author: q.userInformation,
      votes: q.likes || 0,
      views: q.views || 0,
      comments: [], // Populate from comments collection if needed
      asked: formatTimeAgo(q.time),
      tags: Array.isArray(q.tag) ? q.tag : [q.tag].filter(Boolean),
      imgSrc: "/default-avatar.png",
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    console.error("Error fetching questions:", error)
    return NextResponse.json({ message: "Failed to fetch questions" }, { status: 500 })
  } finally {
    await client.close()
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, body, tag, userInformation } = await request.json()

    await client.connect()
    const db = client.db("devoverflow")
    const questions = db.collection("questions")

    const newQuestion = {
      title,
      body,
      tag,
      time: new Date(),
      userInformation,
      likes: 0,
      numberOfAnswers: 0,
      views: 0,
      lastEditedTime: null,
    }

    const result = await questions.insertOne(newQuestion)

    return NextResponse.json(
      {
        message: "Question created successfully",
        questionID: result.insertedId.toString(),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating question:", error)
    return NextResponse.json({ message: "Failed to create question" }, { status: 500 })
  } finally {
    await client.close()
  }
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

  if (diffInMinutes < 1) return "Just now"
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours} hours ago`

  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays} days ago`
}
