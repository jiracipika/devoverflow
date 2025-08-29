import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Users, BookOpen, TrendingUp, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600"></div>
              <span className="text-xl font-bold">DevOverflow</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
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

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Every developer has a tab open to DevOverflow
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            We build products that empower developers and connect them to solutions that enable productivity, growth,
            and discovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              For developers, by developers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              For businesses
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">21M+</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Questions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">31M+</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Answers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">50M+</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Monthly visitors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">190+</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why developers choose DevOverflow</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              The best answers come from a community of experts who understand your challenges
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Ask & Answer</CardTitle>
                <CardDescription>
                  Get help from millions of developers worldwide. Ask questions and share your knowledge.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Community Driven</CardTitle>
                <CardDescription>
                  Connect with developers from around the world. Build your reputation and help others grow.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Knowledge Base</CardTitle>
                <CardDescription>
                  Access a vast library of programming knowledge. Find solutions to common and complex problems.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Tags */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Technologies</h2>
            <p className="text-slate-600 dark:text-slate-300">
              Explore questions in the most popular programming languages and frameworks
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              {
                name: "JavaScript",
                count: "2.1M",
                color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
              },
              { name: "Python", count: "1.8M", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
              { name: "Java", count: "1.7M", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
              { name: "React", count: "400K", color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200" },
              {
                name: "Node.js",
                count: "350K",
                color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
              },
              {
                name: "TypeScript",
                count: "300K",
                color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
              },
              {
                name: "C#",
                count: "280K",
                color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
              },
              {
                name: "PHP",
                count: "250K",
                color: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
              },
            ].map((tag) => (
              <Badge key={tag.name} variant="secondary" className={`${tag.color} px-4 py-2 text-sm font-medium`}>
                {tag.name} <span className="ml-1 opacity-70">{tag.count}</span>
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recent Activity</h2>
            <p className="text-slate-600 dark:text-slate-300">See what the community is discussing right now</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "How to implement authentication in Next.js 14?",
                author: "john_dev",
                votes: 15,
                answers: 3,
                tags: ["nextjs", "authentication", "react"],
                time: "2 hours ago",
              },
              {
                title: "Best practices for React state management in 2024",
                author: "sarah_codes",
                votes: 23,
                answers: 7,
                tags: ["react", "state-management", "redux"],
                time: "4 hours ago",
              },
              {
                title: "Python async/await vs threading performance comparison",
                author: "mike_python",
                votes: 31,
                answers: 12,
                tags: ["python", "async", "performance"],
                time: "6 hours ago",
              },
              {
                title: "TypeScript generic constraints explained",
                author: "alex_ts",
                votes: 18,
                answers: 5,
                tags: ["typescript", "generics", "types"],
                time: "8 hours ago",
              },
            ].map((question, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg leading-tight hover:text-blue-600 cursor-pointer">
                      {question.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300 mb-3">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      {question.votes} votes
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {question.answers} answers
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {question.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={`/placeholder-user.jpg`} />
                        <AvatarFallback>{question.author[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-slate-600 dark:text-slate-300">{question.author}</span>
                    </div>
                    <span className="text-xs text-slate-500">{question.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to join the community?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start asking questions, sharing knowledge, and connecting with developers worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Sign up for free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Ask your first question
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600"></div>
                <span className="text-xl font-bold">DevOverflow</span>
              </div>
              <p className="text-slate-300 text-sm">
                Empowering developers worldwide with knowledge sharing and community support.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <Link href="/questions" className="hover:text-white">
                    Questions
                  </Link>
                </li>
                <li>
                  <Link href="/tags" className="hover:text-white">
                    Tags
                  </Link>
                </li>
                <li>
                  <Link href="/users" className="hover:text-white">
                    Users
                  </Link>
                </li>
                <li>
                  <Link href="/companies" className="hover:text-white">
                    Companies
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help
                  </Link>
                </li>
                <li>
                  <Link href="/chat" className="hover:text-white">
                    Chat
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/feedback" className="hover:text-white">
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="hover:text-white">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-300">
            <p>&copy; 2024 DevOverflow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
