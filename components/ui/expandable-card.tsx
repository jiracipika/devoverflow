"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { ChevronDown, ChevronUp, MessageCircle, Heart, Share2, User } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ExpandableCardProps {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar?: string
  }
  tags: string[]
  votes: number
  answers: number
  views: number
  createdAt: string
}

export default function ExpandableCard({
  id,
  title,
  content,
  author,
  tags,
  votes,
  answers,
  views,
  createdAt,
}: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <Card className="bg-gray-800 border-gray-700 text-white">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{author.name}</span>
              </div>
              <span>{new Date(createdAt).toLocaleDateString()}</span>
              <span>{views} views</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={toggleExpanded} className="text-gray-400 hover:text-white">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className={cn("mb-4", !isExpanded && "line-clamp-3")}>
          <p className="text-gray-300">{content}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-gray-700 text-gray-300">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLike}
              className={cn("flex items-center gap-1 text-sm", isLiked ? "text-red-500" : "text-gray-400")}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
              <span>{votes + (isLiked ? 1 : 0)}</span>
            </Button>

            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm text-gray-400">
              <MessageCircle className="h-4 w-4" />
              <span>{answers}</span>
            </Button>

            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm text-gray-400">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={author.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-gray-700 text-xs">{author.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
