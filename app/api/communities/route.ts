import { type NextRequest, NextResponse } from "next/server"

// Mock community data for development/build
const mockCommunities = [
  {
    id: "1",
    name: "JavaScript Developers",
    description: "A community for JavaScript enthusiasts and professionals",
    memberCount: 15420,
    tags: ["javascript", "web-development", "frontend"],
    isPublic: true,
    createdAt: new Date().toISOString(),
    avatar: "/placeholder-logo.png",
  },
  {
    id: "2",
    name: "Python Programmers",
    description: "Everything Python - from beginners to experts",
    memberCount: 12350,
    tags: ["python", "data-science", "backend"],
    isPublic: true,
    createdAt: new Date().toISOString(),
    avatar: "/placeholder-logo.png",
  },
  {
    id: "3",
    name: "React Developers",
    description: "Building amazing UIs with React",
    memberCount: 9870,
    tags: ["react", "frontend", "javascript"],
    isPublic: true,
    createdAt: new Date().toISOString(),
    avatar: "/placeholder-logo.png",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const tag = searchParams.get("tag") || ""

    let filteredCommunities = mockCommunities

    if (search) {
      filteredCommunities = filteredCommunities.filter(
        (community) =>
          community.name.toLowerCase().includes(search.toLowerCase()) ||
          community.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (tag) {
      filteredCommunities = filteredCommunities.filter((community) => community.tags.includes(tag.toLowerCase()))
    }

    return NextResponse.json({
      success: true,
      data: filteredCommunities,
      total: filteredCommunities.length,
    })
  } catch (error) {
    console.error("Error fetching communities:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch communities" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, tags, isPublic = true } = body

    if (!name || !description) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const newCommunity = {
      id: Date.now().toString(),
      name,
      description,
      tags: tags || [],
      isPublic,
      memberCount: 1,
      createdAt: new Date().toISOString(),
      avatar: "/placeholder-logo.png",
    }

    // In a real app, this would save to database
    mockCommunities.push(newCommunity)

    return NextResponse.json(
      {
        success: true,
        data: newCommunity,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating community:", error)
    return NextResponse.json({ success: false, error: "Failed to create community" }, { status: 500 })
  }
}
