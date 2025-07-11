import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tag = searchParams.get("tag")
    const search = searchParams.get("search")

    await client.connect()
    const db = client.db("devoverflow")
    const blogs = db.collection("blogs")

    const query: any = {}

    if (tag) {
      query.tags = { $regex: new RegExp(tag, "i") }
    }

    if (search) {
      query.$or = [{ title: { $regex: new RegExp(search, "i") } }, { content: { $regex: new RegExp(search, "i") } }]
    }

    const blogList = await blogs.find(query).sort({ postedDate: -1 }).toArray()

    const formatted = blogList.map((blog) => ({
      id: blog._id.toString(),
      title: blog.title,
      imageUrl: blog.imageUrl || blog.image,
      description: blog.content,
      postedDate: blog.postedDate,
      editedDate: blog.editedDate,
      author: blog.author || { name: "Anonymous", avatar: "/default-avatar.png" },
      tags: blog.tags || [],
      tech: blog.tech || "General",
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ message: "Failed to fetch blogs" }, { status: 500 })
  } finally {
    await client.close()
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, tags = [], imageUrl, tech } = await request.json()

    await client.connect()
    const db = client.db("devoverflow")
    const blogs = db.collection("blogs")

    const newBlog = {
      title,
      content,
      imageUrl,
      tags,
      tech,
      postedDate: new Date(),
      editedDate: null,
      author: {
        name: "Current User", // Get from auth context
        avatar: "/default-avatar.png",
      },
    }

    const result = await blogs.insertOne(newBlog)

    return NextResponse.json(
      {
        id: result.insertedId.toString(),
        ...newBlog,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating blog:", error)
    return NextResponse.json({ message: "Failed to create blog" }, { status: 500 })
  } finally {
    await client.close()
  }
}
