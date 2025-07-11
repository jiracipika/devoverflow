"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrendingUp, Users, Star, MessageCircle } from "lucide-react"

const trendingTags = [
  { name: "JavaScript", count: 1234, trend: "+12%" },
  { name: "React", count: 987, trend: "+8%" },
  { name: "Node.js", count: 756, trend: "+15%" },
  { name: "Python", count: 654, trend: "+5%" },
  { name: "TypeScript", count: 543, trend: "+20%" },
  { name: "CSS", count: 432, trend: "+3%" },
]

const topUsers = [
  { name: "Alex Chen", reputation: 15420, avatar: "/placeholder.svg", badge: "Expert" },
  { name: "Sarah Kim", reputation: 12350, avatar: "/placeholder.svg", badge: "Mentor" },
  { name: "Mike Johnson", reputation: 9870, avatar: "/placeholder.svg", badge: "Helper" },
  { name: "Emma Davis", reputation: 8760, avatar: "/placeholder.svg", badge: "Contributor" },
]

const communityStats = [
  { label: "Total Questions", value: "12,345", icon: MessageCircle },
  { label: "Active Users", value: "3,456", icon: Users },
  { label: "Answered", value: "89%", icon: Star },
  { label: "Daily Growth", value: "+15%", icon: TrendingUp },
]

export default function Footer() {
  return (
    <div className="space-y-6">
      {/* Community Stats */}
      <Card className="bg-[#151821] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            Community Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {communityStats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <stat.icon className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-300">{stat.label}</span>
              </div>
              <span className="text-sm font-semibold text-white">{stat.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Trending Tags */}
      <Card className="bg-[#151821] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Trending Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingTags.map((tag) => (
            <div key={tag.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-blue-900/30 text-blue-300">
                  {tag.name}
                </Badge>
                <span className="text-xs text-gray-400">{tag.count}</span>
              </div>
              <span className="text-xs text-green-400">{tag.trend}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Contributors */}
      <Card className="bg-[#151821] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Top Contributors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topUsers.map((user, index) => (
            <div key={user.name} className="flex items-center gap-3">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-xs text-gray-500 w-4">#{index + 1}</span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gray-600 text-xs">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-sm text-white">{user.name}</div>
                  <div className="text-xs text-gray-400">{user.reputation.toLocaleString()} rep</div>
                </div>
              </div>
              <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                {user.badge}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="bg-[#151821] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 gap-2">
            <a href="#" className="text-sm text-gray-300 hover:text-blue-400 transition-colors">
              Community Guidelines
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-blue-400 transition-colors">
              How to Ask Questions
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-blue-400 transition-colors">
              Reputation System
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-blue-400 transition-colors">
              Help Center
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-blue-400 transition-colors">
              Contact Support
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
