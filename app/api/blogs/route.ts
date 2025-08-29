import { type NextRequest, NextResponse } from "next/server"

// Mock blog data for development/build
const mockBlogs = [
  {
    id: "1",
    title: "Getting Started with Next.js 14",
    content: "Learn the basics of Next.js 14 and its new features...",
    author: "john_dev",
    createdAt: new Date().toISOString(),
    tags: ["nextjs", "react", "javascript"],
    likes: 25,
    views: 150,
  },
  {
    id: "2",
    title: "Advanced React Patterns in 2024",
    content: "Explore modern React patterns and best practices...",
    author: "sarah_codes",
    createdAt: new Date().toISOString(),
    tags: ["react", "patterns", "javascript"],
    likes: 42,
    views: 230,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""

    let filteredBlogs = mockBlogs

    if (search) {
      filteredBlogs = mockBlogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(search.toLowerCase()) ||
          blog.content.toLowerCase().includes(search.toLowerCase()) ||
          blog.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())),
      )
    }

    return NextResponse.json({
      success: true,
      data: filteredBlogs,
      total: filteredBlogs.length,
    })
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch blogs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, tags, author } = body

    if (!title || !content || !author) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const newBlog = {
      id: Date.now().toString(),
      title,
      content,
      author,
      tags: tags || [],
      createdAt: new Date().toISOString(),
      likes: 0,
      views: 0,
    }

    // In a real app, this would save to database
    mockBlogs.push(newBlog)

    return NextResponse.json(
      {
        success: true,
        data: newBlog,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating blog:", error)
    return NextResponse.json({ success: false, error: "Failed to create blog" }, { status: 500 })
  }
}
