import jwt from "jsonwebtoken"
import type { NextRequest } from "next/server"

interface TokenPayload {
  userId: string
  email: string
  iat: number
  exp: number
}

export async function verifyToken(request: NextRequest): Promise<TokenPayload | null> {
  try {
    const accessToken = request.cookies.get("accessToken")?.value

    if (!accessToken) {
      return null
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET || "fallback-secret") as TokenPayload

    return decoded
  } catch (error) {
    console.error("Token verification error:", error)
    return null
  }
}

export function generateTokens(userId: string, email: string) {
  const accessToken = jwt.sign({ userId, email }, process.env.JWT_SECRET || "fallback-secret", {
    expiresIn: "15m",
  })

  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET || "fallback-refresh-secret", {
    expiresIn: "7d",
  })

  return { accessToken, refreshToken }
}
