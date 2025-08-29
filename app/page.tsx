import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Users, MessageSquare, Trophy } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600"></div>
              <span className="text-xl font-bold">DevOverflow</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/home">
                <Button variant="ghost">Browse Questions</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Where Developers Learn, Share & Build the Future
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            Join millions of developers asking questions, sharing knowledge, and building their careers on the world's
            largest developer community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/home">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Exploring <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="outline">
                Join the Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose DevOverflow?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Code className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Expert Answers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Get answers from experienced developers and industry experts</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-green-600 mb-4" />
                <CardTitle>Active Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Join millions of developers sharing knowledge and helping each other</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MessageSquare className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                <CardTitle>Quality Discussions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Engage in meaningful discussions about the latest technologies</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Trophy className="h-12 w-12 mx-auto text-orange-600 mb-4" />
                <CardTitle>Build Reputation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Earn reputation points and badges by contributing to the community</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16 px-4 bg-white dark:bg-slate-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Topics</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "JavaScript",
              "Python",
              "React",
              "Node.js",
              "TypeScript",
              "Java",
              "C++",
              "Go",
              "Rust",
              "Docker",
              "Kubernetes",
              "AWS",
              "Machine Learning",
              "Data Science",
              "Web Development",
              "Mobile Development",
            ].map((topic) => (
              <Badge key={topic} variant="secondary" className="text-sm py-2 px-4">
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join the Community?</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            Start asking questions, sharing knowledge, and building your developer network today.
          </p>
          <Link href="/auth/register">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-slate-900 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-600 to-purple-600"></div>
                <span className="font-bold">DevOverflow</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">The world's largest developer community platform.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>
                  <Link href="/questions" className="hover:text-blue-600">
                    Questions
                  </Link>
                </li>
                <li>
                  <Link href="/tags" className="hover:text-blue-600">
                    Tags
                  </Link>
                </li>
                <li>
                  <Link href="/users" className="hover:text-blue-600">
                    Users
                  </Link>
                </li>
                <li>
                  <Link href="/companies" className="hover:text-blue-600">
                    Companies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>
                  <Link href="/help" className="hover:text-blue-600">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-blue-600">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-blue-600">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-blue-600">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>
                  <Link href="/about" className="hover:text-blue-600">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-blue-600">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-blue-600">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="hover:text-blue-600">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-slate-600 dark:text-slate-300">
            <p>&copy; 2024 DevOverflow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
