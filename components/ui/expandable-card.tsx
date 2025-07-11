"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, MessageCircle, ThumbsUp, Share2, Eye } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ExpandableCardProps {
  question: {
    id: string
    title: string
    content: string
    author: {
      name: string
      avatar?: string
      reputation: number
    }
    tags: string[]
    votes: number
    answers: number
    views: number
    createdAt: string
    isAnswered?: boolean
  }
  className?: string
}

export default function ExpandableCard({ question, className = "" }: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVoted, setIsVoted] = useState(false)

  const handleVote = () => {
    setIsVoted(!isVoted)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const truncateContent = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + "..."
  }

  return (
    <Card className={`bg-[#151821] border-gray-700 hover:border-gray-600 transition-colors ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2 hover:text-blue-400 cursor-pointer">
              {question.title}
            </h3>

            {/* Author Info */}
            <div className="flex items-center space-x-2 mb-3">
              <Avatar className="h-6 w-6">
                <AvatarImage src={question.author.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gray-600 text-xs">
                  {question.author.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-300">{question.author.name}</span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">{formatDate(question.createdAt)}</span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-blue-400">{question.author.reputation} rep</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {question.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-blue-900/30 text-blue-300 hover:bg-blue-900/50 text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Answer Status */}
          {question.isAnswered && <Badge className="bg-green-900/30 text-green-300 border-green-700">Answered</Badge>}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Content Preview */}
        <div className="text-gray-300 text-sm mb-4">
          {isExpanded ? question.content : truncateContent(question.content)}
        </div>

        {/* Expand/Collapse Button */}
        {question.content.length > 150 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 p-0 h-auto mb-4"
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp className="ml-1 h-3 w-3" />
              </>
            ) : (
              <>
                Show more <ChevronDown className="ml-1 h-3 w-3" />
              </>
            )}
          </Button>
        )}

        {/* Stats and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Vote */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVote}
              className={`flex items-center space-x-1 hover:bg-gray-700 ${isVoted ? "text-blue-400" : "text-gray-400"}`}
            >
              <ThumbsUp className="h-4 w-4" />
              <span className="text-xs">{question.votes + (isVoted ? 1 : 0)}</span>
            </Button>

            {/* Answers */}
            <div className="flex items-center space-x-1 text-gray-400">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{question.answers}</span>
            </div>

            {/* Views */}
            <div className="flex items-center space-x-1 text-gray-400">
              <Eye className="h-4 w-4" />
              <span className="text-xs">{question.views}</span>
            </div>
          </div>

          {/* Share */}
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300 hover:bg-gray-700">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
