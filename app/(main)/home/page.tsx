import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function MainHomePage() {
  const questions = [
    {
      id: 1,
      title: "How to implement authentication in Next.js 14?",
      author: "john_doe",
      tags: ["nextjs", "authentication", "typescript"],
      votes: 15,
      answers: 3,
      views: 234,
      createdAt: "2 hours ago",
    },
    {
      id: 2,
      title: "Best practices for React state management in 2024",
      author: "react_dev",
      tags: ["react", "state-management", "redux"],
      votes: 28,
      answers: 7,
      views: 456,
      createdAt: "4 hours ago",
    },
    {
      id: 3,
      title: "How to optimize MongoDB queries for better performance?",
      author: "db_expert",
      tags: ["mongodb", "performance", "database"],
      votes: 12,
      answers: 2,
      views: 189,
      createdAt: "6 hours ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DO</span>
            </div>
            <span className="text-xl font-bold text-gray-900">DevOverflow</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/home" className="text-blue-600 font-medium">
              Home
            </Link>
            <Link href="/questions" className="text-gray-600 hover:text-gray-900">
              Questions
            </Link>
            <Link href="/tags" className="text-gray-600 hover:text-gray-900">
              Tags
            </Link>
            <Link href="/users" className="text-gray-600 hover:text-gray-900">
              Users
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Top Questions</h1>
              <Button asChild>
                <Link href="/ask">Ask Question</Link>
              </Button>
            </div>

            <div className="space-y-4">
              {questions.map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center space-y-2 text-sm text-gray-500 min-w-[80px]">
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{question.votes}</div>
                          <div>votes</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{question.answers}</div>
                          <div>answers</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{question.views}</div>
                          <div>views</div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800 mb-2">
                          <Link href={`/questions/${question.id}`}>{question.title}</Link>
                        </h3>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {question.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-5 h-5">
                              <AvatarFallback className="text-xs">
                                {question.author.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span>{question.author}</span>
                          </div>
                          <span>{question.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">The Overflow Blog</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <Link href="#" className="text-sm text-blue-600 hover:text-blue-800">
                      The unexpected benefits of mentoring others
                    </Link>
                  </div>
                  <div>
                    <Link href="#" className="text-sm text-blue-600 hover:text-blue-800">
                      Podcast 364: Building for AR with Niantic Labs
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {["javascript", "python", "java", "c#", "php", "android", "html", "jquery"].map((tag) => (
                    <div key={tag} className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                      <span className="text-xs text-gray-500">× 2.5m</span>
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
