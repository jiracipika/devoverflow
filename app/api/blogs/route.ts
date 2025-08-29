import { type NextRequest, NextResponse } from "next/server"

// Mock data for development/build
const mockBlogs = [
  {
    id: "1",
    title: "Getting Started with Next.js 14",
    imageUrl: "/placeholder.jpg",
    description: "Learn the basics of Next.js 14 and its new features",
    postedDate: new Date().toISOString(),
    editedDate: null,
    author: { name: "John Doe", avatar: "/placeholder-user.jpg" },
    tags: ["Next.js", "React", "JavaScript"],
    tech: "Frontend",
  },
  {
    id: "2",
    title: "MongoDB Best Practices",
    imageUrl: "/placeholder.jpg",
    description: "Essential tips for working with MongoDB in production",
    postedDate: new Date().toISOString(),
    editedDate: null,
    author: { name: "Jane Smith", avatar: "/placeholder-user.jpg" },
    tags: ["MongoDB", "Database", "Backend"],
    tech: "Backend",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tag = searchParams.get("tag")
    const search = searchParams.get("search")

    let filtered = mockBlogs

    if (tag) {
      filtered = filtered.filter((blog) => blog.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase())))
    }

    if (search) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(search.toLowerCase()) ||
          blog.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    return NextResponse.json(filtered)
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ message: "Failed to fetch blogs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, tags = [], imageUrl, tech } = await request.json()

    const newBlog = {
      id: Date.now().toString(),
      title,
      description: content,
      imageUrl: imageUrl || "/placeholder.jpg",
      tags,
      tech: tech || "General",
      postedDate: new Date().toISOString(),
      editedDate: null,
      author: {
        name: "Current User",
        avatar: "/placeholder-user.jpg",
      },
    }

    return NextResponse.json(newBlog, { status: 201 })
  } catch (error) {
    console.error("Error creating blog:", error)
    return NextResponse.json({ message: "Failed to create blog" }, { status: 500 })
  }
}
