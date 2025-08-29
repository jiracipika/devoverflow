import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Users, BookOpen, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">DO</span>
              </div>
              <span className="text-xl font-bold">DevOverflow</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/questions" className="text-muted-foreground hover:text-foreground">
                Questions
              </Link>
              <Link href="/tags" className="text-muted-foreground hover:text-foreground">
                Tags
              </Link>
              <Link href="/users" className="text-muted-foreground hover:text-foreground">
                Users
              </Link>
              <Link href="/companies" className="text-muted-foreground hover:text-foreground">
                Companies
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Every developer has a tab open to DevOverflow
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We build products that empower developers and connect them to solutions that enable productivity, growth,
            and discovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/home">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/questions">Browse Questions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">21M+</div>
              <div className="text-muted-foreground">Questions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">31M+</div>
              <div className="text-muted-foreground">Answers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50M+</div>
              <div className="text-muted-foreground">Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100M+</div>
              <div className="text-muted-foreground">Monthly Visits</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why choose DevOverflow?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join millions of developers who use DevOverflow to learn, share knowledge, and build their careers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Ask Questions</CardTitle>
                <CardDescription>
                  Get help from the community with detailed questions and receive quality answers.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Connect</CardTitle>
                <CardDescription>
                  Network with developers worldwide and build meaningful professional relationships.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Learn</CardTitle>
                <CardDescription>
                  Access a vast knowledge base of programming solutions and best practices.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Grow</CardTitle>
                <CardDescription>
                  Build your reputation and showcase your expertise to potential employers.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Questions Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Popular Questions</h2>
            <p className="text-muted-foreground">See what the community is discussing</p>
          </div>
          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              {
                title: "How to implement authentication in Next.js 14?",
                author: "john_dev",
                tags: ["nextjs", "authentication", "react"],
                votes: 42,
                answers: 8,
                views: "2.1k",
              },
              {
                title: "Best practices for React state management in 2024",
                author: "sarah_codes",
                tags: ["react", "state-management", "redux"],
                votes: 38,
                answers: 12,
                views: "3.5k",
              },
              {
                title: "TypeScript vs JavaScript: When to use which?",
                author: "mike_ts",
                tags: ["typescript", "javascript", "comparison"],
                votes: 56,
                answers: 15,
                views: "4.2k",
              },
            ].map((question, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 hover:text-primary cursor-pointer">{question.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center space-x-1">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-xs">
                              {question.author.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>{question.author}</span>
                        </div>
                        <span>{question.views} views</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {question.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1 text-sm">
                      <div className="text-primary font-medium">{question.votes} votes</div>
                      <div className="text-muted-foreground">{question.answers} answers</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/questions">View All Questions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to join the community?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start asking questions, sharing knowledge, and connecting with developers worldwide.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/auth/register">Sign Up for Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-xs">DO</span>
                </div>
                <span className="font-bold text-white">DevOverflow</span>
              </div>
              <p className="text-sm">
                The world's largest developer community platform for learning and sharing knowledge.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
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
              <h3 className="font-semibold text-white mb-4">Community</h3>
              <ul className="space-y-2 text-sm">
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
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
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
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 DevOverflow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
