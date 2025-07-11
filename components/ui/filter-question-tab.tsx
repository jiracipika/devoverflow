"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterQuestionTabProps {
  onFilterChange?: (filters: FilterOptions) => void
  className?: string
}

interface FilterOptions {
  sortBy: string
  tags: string[]
  answered: string
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "most-votes", label: "Most Votes" },
  { value: "most-answers", label: "Most Answers" },
]

const popularTags = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "TypeScript",
  "CSS",
  "HTML",
  "MongoDB",
  "Express",
  "Next.js",
]

export default function FilterQuestionTab({ onFilterChange, className = "" }: FilterQuestionTabProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: "newest",
    tags: [],
    answered: "all",
  })

  const handleSortChange = (value: string) => {
    const newFilters = { ...filters, sortBy: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag) ? filters.tags.filter((t) => t !== tag) : [...filters.tags, tag]

    const newFilters = { ...filters, tags: newTags }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleAnsweredChange = (value: string) => {
    const newFilters = { ...filters, answered: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const clearFilters = () => {
    const newFilters = { sortBy: "newest", tags: [], answered: "all" }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  return (
    <div className={`bg-[#151821] p-4 rounded-lg border border-gray-700 ${className}`}>
      <div className="flex flex-col space-y-4">
        {/* Sort By */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Sort By</label>
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="bg-[#0B0C14] border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#0B0C14] border-gray-600">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-white hover:bg-gray-700">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Answered Filter */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Status</label>
          <Select value={filters.answered} onValueChange={handleAnsweredChange}>
            <SelectTrigger className="bg-[#0B0C14] border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#0B0C14] border-gray-600">
              <SelectItem value="all" className="text-white hover:bg-gray-700">
                All Questions
              </SelectItem>
              <SelectItem value="answered" className="text-white hover:bg-gray-700">
                Answered
              </SelectItem>
              <SelectItem value="unanswered" className="text-white hover:bg-gray-700">
                Unanswered
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tags */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Filter by Tags</label>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge
                key={tag}
                variant={filters.tags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  filters.tags.includes(tag)
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "border-gray-600 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {(filters.tags.length > 0 || filters.answered !== "all" || filters.sortBy !== "newest") && (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  )
}
