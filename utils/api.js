// Centralized API configuration for deployment
const getBaseURL = () => {
  // Check if we're in production (deployed on Vercel/v0)
  if (typeof window !== "undefined") {
    // Client-side
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5173/api"
  }
  // Server-side
  return process.env.API_URL || "http://localhost:5173/api"
}

export const API_BASE_URL = getBaseURL()

// API client with better error handling
export const apiClient = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include",
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  },

  get(endpoint, options = {}) {
    return this.request(endpoint, { method: "GET", ...options })
  },

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    })
  },

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    })
  },

  delete(endpoint, options = {}) {
    return this.request(endpoint, { method: "DELETE", ...options })
  },
}
