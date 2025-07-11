"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchInputProps {
  onSearchChange: (query: string) => void
  placeholderText?: string
  className?: string
}

export default function SearchInput({ onSearchChange, placeholderText = "Search...", className }: SearchInputProps) {
  const [searchValue, setSearchValue] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    onSearchChange(value)
  }

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder={placeholderText}
        className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
      />
    </div>
  )
}
