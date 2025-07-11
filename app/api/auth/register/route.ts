import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"

const client = new MongoClient(process.env.MONGODB_URI!)

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    await client.connect()
    const db = client.db("devoverflow")
    const users = db.collection("users")

    const existingUser = await users.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      about: "",
      createdAt: new Date(),
    })

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user: {
          id: result.insertedId,
          name,
          email,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  } finally {
    await client.close()
  }
}
