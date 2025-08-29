"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { MessageSquare, Search, Plus } from "lucide-react"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const mockQuestions = [
    {
      id: 1,
      title: "How to implement authentication in Next.js 14?",
      author: "john_dev",
      votes: 15,
      answers: 3,
      views: 234,
      tags: ["nextjs", "authentication", "react"],
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Best practices for React state management in 2024",
      author: "sarah_codes",
      votes: 23,
      answers: 7,
      views: 456,
      tags: ["react", "state-management", "redux"],
      time: "4 hours ago",
    },
    {
      id: 3,
      title: "Python async/await vs threading performance comparison",
      author: "mike_python",
      votes: 31,
      answers: 12,
      views: 789,
      tags: ["python", "async", "performance"],
      time: "6 hours ago",
    },
  ]

  const filteredQuestions = mockQuestions.filter(
    (question) =>
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600"></div>
              <span className="text-xl font-bold">DevOverflow</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/home" className="text-sm font-medium text-blue-600">
                Home
              </Link>
              <Link href="/questions" className="text-sm font-medium hover:text-blue-600">
                Questions
              </Link>
              <Link href="/tags" className="text-sm font-medium hover:text-blue-600">
                Tags
              </Link>
              <Link href="/users" className="text-sm font-medium hover:text-blue-600">
                Users
              </Link>
              <Link href="/companies" className="text-sm font-medium hover:text-blue-600">
                Companies
              </Link>
            </nav>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
              <Button size="sm">Sign up</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="flex-1">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">All Questions</h1>
                <p className="text-slate-600 dark:text-slate-300">{filteredQuestions.length} questions</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Ask Question
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button variant="default" size="sm">
                Newest
              </Button>
              <Button variant="outline" size="sm">
                Active
              </Button>
              <Button variant="outline" size="sm">
                Bountied
              </Button>
              <Button variant="outline" size="sm">
                Unanswered
              </Button>
              <Button variant="outline" size="sm">
                More
              </Button>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Stats */}
                      <div className="flex flex-col items-center text-sm text-slate-600 dark:text-slate-300 min-w-[80px]">
                        <div className="text-center">
                          <div className="font-semibold">{question.votes}</div>
                          <div>votes</div>
                        </div>
                        <div className="text-center mt-2">
                          <div className="font-semibold">{question.answers}</div>
                          <div>answers</div>
                        </div>
                        <div className="text-center mt-2">
                          <div className="font-semibold">{question.views}</div>
                          <div>views</div>
                        </div>
                      </div>

                      {/* Question Content */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                          <Link href={`/questions/${question.id}`}>{question.title}</Link>
                        </h3>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {question.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder-user.jpg" />
                              <AvatarFallback>{question.author[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-slate-600 dark:text-slate-300">{question.author}</span>
                          </div>
                          <span className="text-xs text-slate-500">{question.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredQuestions.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No questions found</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Try adjusting your search or be the first to ask!
                </p>
                <Button>Ask the first question</Button>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:w-80 space-y-6">
            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { name: "javascript", count: "2.1M" },
                    { name: "python", count: "1.8M" },
                    { name: "java", count: "1.7M" },
                    { name: "react", count: "400K" },
                    { name: "node.js", count: "350K" },
                  ].map((tag) => (
                    <div key={tag.name} className="flex items-center justify-between">
                      <Badge variant="outline">{tag.name}</Badge>
                      <span className="text-xs text-slate-500">{tag.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Questions</span>
                    <span className="font-semibold">21.1M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Answers</span>
                    <span className="font-semibold">31.2M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Users</span>
                    <span className="font-semibold">15.8M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tags</span>
                    <span className="font-semibold">64.2K</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "john_dev", reputation: "125k", avatar: "J" },
                    { name: "sarah_codes", reputation: "98k", avatar: "S" },
                    { name: "mike_python", reputation: "87k", avatar: "M" },
                    { name: "alex_ts", reputation: "76k", avatar: "A" },
                  ].map((user) => (
                    <div key={user.name} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>{user.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.reputation} reputation</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
