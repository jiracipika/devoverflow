import { type NextRequest, NextResponse } from "next/server"

// Mock data for development/build
const mockCommunities = [
  {
    id: "1",
    TagName: "JavaScript",
    Users: 1250,
  },
  {
    id: "2",
    TagName: "React",
    Users: 980,
  },
  {
    id: "3",
    TagName: "Node.js",
    Users: 750,
  },
  {
    id: "4",
    TagName: "Python",
    Users: 1100,
  },
]

export async function GET() {
  try {
    return NextResponse.json(mockCommunities)
  } catch (error) {
    console.error("Error fetching communities:", error)
    return NextResponse.json({ message: "Failed to fetch communities" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { Tagname, NumberofUsers } = await request.json()

    if (!Tagname) {
      return NextResponse.json({ message: "Tagname is required" }, { status: 400 })
    }

    const community = {
      Id: Date.now().toString(),
      Tagname: Tagname.trim(),
      NumberofUsers: NumberofUsers || 0,
    }

    return NextResponse.json(community, { status: 201 })
  } catch (error) {
    console.error("Error creating community:", error)
    return NextResponse.json({ message: "Failed to create community" }, { status: 500 })
  }
}
