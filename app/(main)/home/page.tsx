"use client"

import { useState } from "react"
import { Link } from "next/link"
import { useApi } from "@/hooks/use-api"
import ResponsiveText from "@/components/ui/responsive-text"
import SearchInput from "@/components/ui/search-input"
import FilterQuestionTab from "@/components/ui/filter-question-tab"
import ExpandableCard from "@/components/ui/expandable-card"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterQuery, setFilterQuery] = useState("newest")

  const { data: questions, loading, error } = useApi(`/questions?search=${searchQuery}&filter=${filterQuery}`)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilterChange = (filter: string) => {
    setFilterQuery(filter.toLowerCase())
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-white">Loading questions...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-400">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <ResponsiveText variant="h1">All Questions</ResponsiveText>
        <Link
          href="/ask-a-question"
          className="bg-custom-gradient px-4 py-3 rounded-lg font-semibold text-sm sm:text-base text-center whitespace-nowrap hover:opacity-90 transition-opacity"
        >
          Ask a Question
        </Link>
      </header>

      <div className="mb-6">
        <SearchInput onSearchChange={handleSearch} placeholderText="Search questions..." className="w-full" />
      </div>

      <div className="mb-6">
        <FilterQuestionTab onChosenFilter={handleFilterChange} />
      </div>

      <div className="space-y-4 sm:space-y-6">
        {questions?.map((question: any) => (
          <ExpandableCard key={question.id} {...question} />
        ))}
      </div>

      {!questions?.length && (
        <div className="text-center py-12">
          <ResponsiveText variant="body" className="text-gray-400">
            No questions found. Be the first to ask!
          </ResponsiveText>
        </div>
      )}
    </div>
  )
}
