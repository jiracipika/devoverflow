import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Plus, TrendingUp, Users, MessageSquare, Award } from "lucide-react"

export default function MainHomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DO</span>
                </div>
                <span className="text-xl font-bold">DevOverflow</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/home" className="text-primary font-medium">
                  Home
                </Link>
                <Link href="/questions" className="text-muted-foreground hover:text-foreground">
                  Questions
                </Link>
                <Link href="/tags" className="text-muted-foreground hover:text-foreground">
                  Tags
                </Link>
                <Link href="/users" className="text-muted-foreground hover:text-foreground">
                  Users
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search questions..." className="pl-10 w-64" />
              </div>
              <Button asChild>
                <Link href="/ask">
                  <Plus className="h-4 w-4 mr-2" />
                  Ask Question
                </Link>
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">Welcome to DevOverflow</h1>
              <p className="text-muted-foreground">
                Discover questions, give answers, and build your developer reputation.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="h-8 w-8 text-blue-500" />
                    <div>
                      <div className="text-2xl font-bold">1,234</div>
                      <div className="text-sm text-muted-foreground">Questions Today</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Users className="h-8 w-8 text-green-500" />
                    <div>
                      <div className="text-2xl font-bold">5,678</div>
                      <div className="text-sm text-muted-foreground">Active Users</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Award className="h-8 w-8 text-yellow-500" />
                    <div>
                      <div className="text-2xl font-bold">9,012</div>
                      <div className="text-sm text-muted-foreground">Answers Given</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold">Latest Questions</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="default" size="sm">
                    Newest
                  </Button>
                  <Button variant="ghost" size="sm">
                    Active
                  </Button>
                  <Button variant="ghost" size="sm">
                    Unanswered
                  </Button>
                  <Button variant="ghost" size="sm">
                    Score
                  </Button>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  title: "How to implement server-side rendering in Next.js 14?",
                  content:
                    "I'm trying to understand the best practices for SSR in the latest version of Next.js. What are the key differences from previous versions?",
                  author: "alex_dev",
                  authorAvatar: "AD",
                  tags: ["nextjs", "ssr", "react", "javascript"],
                  votes: 15,
                  answers: 3,
                  views: 245,
                  timeAgo: "2 hours ago",
                },
                {
                  id: 2,
                  title: "TypeScript generic constraints with conditional types",
                  content:
                    "I'm working with complex TypeScript generics and need help understanding how to properly constrain types based on conditions.",
                  author: "typescript_guru",
                  authorAvatar: "TG",
                  tags: ["typescript", "generics", "types"],
                  votes: 23,
                  answers: 5,
                  views: 412,
                  timeAgo: "4 hours ago",
                },
                {
                  id: 3,
                  title: "Best practices for React state management in large applications",
                  content:
                    "What are the current best practices for managing state in large React applications? Should I use Redux, Zustand, or Context API?",
                  author: "react_enthusiast",
                  authorAvatar: "RE",
                  tags: ["react", "state-management", "redux", "zustand"],
                  votes: 31,
                  answers: 8,
                  views: 678,
                  timeAgo: "6 hours ago",
                },
                {
                  id: 4,
                  title: "Docker containerization for Node.js microservices",
                  content:
                    "I need guidance on containerizing Node.js microservices with Docker. What are the security considerations and best practices?",
                  author: "devops_mike",
                  authorAvatar: "DM",
                  tags: ["docker", "nodejs", "microservices", "devops"],
                  votes: 18,
                  answers: 4,
                  views: 334,
                  timeAgo: "8 hours ago",
                },
                {
                  id: 5,
                  title: "GraphQL vs REST API: Performance comparison",
                  content:
                    "I'm evaluating GraphQL vs REST for a new project. What are the performance implications and when should I choose one over the other?",
                  author: "api_architect",
                  authorAvatar: "AA",
                  tags: ["graphql", "rest", "api", "performance"],
                  votes: 42,
                  answers: 12,
                  views: 892,
                  timeAgo: "12 hours ago",
                },
              ].map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Vote/Stats Column */}
                      <div className="flex flex-col items-center space-y-2 text-sm text-muted-foreground min-w-[60px]">
                        <div className="text-center">
                          <div className="font-medium text-foreground">{question.votes}</div>
                          <div>votes</div>
                        </div>
                        <div className="text-center">
                          <div className={`font-medium ${question.answers > 0 ? "text-green-600" : "text-foreground"}`}>
                            {question.answers}
                          </div>
                          <div>answers</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-foreground">{question.views}</div>
                          <div>views</div>
                        </div>
                      </div>

                      {/* Question Content */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 hover:text-primary cursor-pointer">
                          <Link href={`/questions/${question.id}`}>{question.title}</Link>
                        </h3>
                        <p className="text-muted-foreground mb-3 line-clamp-2">{question.content}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {question.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="hover:bg-primary hover:text-primary-foreground cursor-pointer"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Author and Time */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">{question.authorAvatar}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">
                              asked by{" "}
                              <span className="text-primary hover:underline cursor-pointer">{question.author}</span>
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">{question.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline">Load More Questions</Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Top Contributors</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Sarah Chen", reputation: 15420, avatar: "SC" },
                  { name: "Mike Johnson", reputation: 12350, avatar: "MJ" },
                  { name: "Alex Rodriguez", reputation: 9870, avatar: "AR" },
                  { name: "Emma Wilson", reputation: 8540, avatar: "EW" },
                  { name: "David Kim", reputation: 7230, avatar: "DK" },
                ].map((user, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="text-sm font-medium text-muted-foreground w-4">{index + 1}</div>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.reputation.toLocaleString()} reputation</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "javascript", count: 1234 },
                    { name: "react", count: 987 },
                    { name: "typescript", count: 756 },
                    { name: "nextjs", count: 543 },
                    { name: "nodejs", count: 432 },
                    { name: "python", count: 321 },
                    { name: "docker", count: 234 },
                    { name: "graphql", count: 198 },
                  ].map((tag) => (
                    <Badge
                      key={tag.name}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      {tag.name}
                      <span className="ml-1 text-xs">({tag.count})</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { action: "answered", question: "How to optimize React performance?", time: "5 min ago" },
                  { action: "asked", question: "Best practices for API design", time: "15 min ago" },
                  { action: "commented", question: "TypeScript vs JavaScript debate", time: "1 hour ago" },
                  { action: "voted", question: "Docker containerization guide", time: "2 hours ago" },
                ].map((activity, index) => (
                  <div key={index} className="text-sm">
                    <div className="text-muted-foreground">
                      <span className="text-primary font-medium">{activity.action}</span> on
                    </div>
                    <div className="font-medium hover:text-primary cursor-pointer line-clamp-1">
                      {activity.question}
                    </div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
