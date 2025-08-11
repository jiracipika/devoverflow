import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI!)

export async function GET() {
  try {
    await client.connect()
    const db = client.db("devoverflow")
    const communities = db.collection("communities")

    const communityList = await communities.find({}).toArray()

    const formatted = communityList.map((community) => ({
      id: community._id.toString(),
      TagName: community.tagName,
      Users: community.numberOfUsers || 0,
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    console.error("Error fetching communities:", error)
    return NextResponse.json({ message: "Failed to fetch communities" }, { status: 500 })
  } finally {
    await client.close()
  }
}

export async function POST(request: NextRequest) {
  try {
    const { Tagname, NumberofUsers } = await request.json()

    if (!Tagname) {
      return NextResponse.json({ message: "Tagname is required" }, { status: 400 })
    }

    await client.connect()
    const db = client.db("devoverflow")
    const communities = db.collection("communities")

    const community = {
      tagName: Tagname.trim(),
      numberOfUsers: NumberofUsers || 0,
      users: [],
      createdAt: new Date(),
    }

    const result = await communities.insertOne(community)

    return NextResponse.json(
      {
        Id: result.insertedId.toString(),
        Tagname: community.tagName,
        NumberofUsers: community.numberOfUsers,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating community:", error)
    return NextResponse.json({ message: "Failed to create community" }, { status: 500 })
  } finally {
    await client.close()
  }
}
