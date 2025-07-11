"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FilterQuestionTabProps {
  onChosenFilter: (filter: string) => void
}

const filterOptions = [
  { label: "Newest", value: "newest" },
  { label: "Frequent", value: "frequent" },
  { label: "Unanswered", value: "unanswered" },
  { label: "Recommended", value: "recommended" },
]

export default function FilterQuestionTab({ onChosenFilter }: FilterQuestionTabProps) {
  const [activeFilter, setActiveFilter] = useState("newest")

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
    onChosenFilter(filter)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {filterOptions.map((option) => (
        <Button
          key={option.value}
          variant={activeFilter === option.value ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterClick(option.value)}
          className={cn(
            "text-sm",
            activeFilter === option.value
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700",
          )}
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}
