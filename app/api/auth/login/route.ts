import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const connection = await connectDB()

    if (!connection) {
      // Return mock response during build
      return NextResponse.json(
        {
          success: false,
          error: "Database not available during build",
        },
        { status: 503 },
      )
    }

    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Mock successful login for build
    const mockUser = {
      id: "mock-user-id",
      name: "Mock User",
      email: email,
      avatar: null,
      reputation: 1,
      badges: [],
    }

    const accessToken = jwt.sign(
      { userId: mockUser.id, email: mockUser.email },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "15m" },
    )

    const refreshToken = jwt.sign(
      { userId: mockUser.id },
      process.env.JWT_REFRESH_SECRET || "fallback-refresh-secret",
      { expiresIn: "7d" },
    )

    const response = NextResponse.json({
      success: true,
      user: mockUser,
    })

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60,
    })

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
