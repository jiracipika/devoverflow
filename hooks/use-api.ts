"use client"

import { useState, useCallback } from "react"

interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE"
  body?: any
  headers?: Record<string, string>
}

interface ApiResponse<T> {
  data: T | null
  error: string | null
  loading: boolean
}

export function useApi<T = any>() {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: false,
  })

  const request = useCallback(async (url: string, options: ApiOptions = {}) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const { method = "GET", body, headers = {} } = options

      const config: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        credentials: "include", // Include cookies
      }

      if (body && method !== "GET") {
        config.body = JSON.stringify(body)
      }

      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Request failed")
      }

      setState({ data, error: null, loading: false })
      return data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      setState({ data: null, error: errorMessage, loading: false })
      throw error
    }
  }, [])

  const reset = useCallback(() => {
    setState({ data: null, error: null, loading: false })
  }, [])

  return {
    ...state,
    request,
    reset,
  }
}

// Named export for apiRequest function
export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`/api${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }))
    throw new Error(error.message || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}
