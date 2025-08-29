import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, MessageSquare, Users, Trophy, Star } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DO</span>
            </div>
            <span className="text-xl font-bold">DevOverflow</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/questions"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Questions
            </Link>
            <Link href="/tags" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Tags
            </Link>
            <Link
              href="/communities"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Communities
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Blog
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Where Developers
            <br />
            Build Together
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the largest community of developers. Ask questions, share knowledge, and accelerate your coding journey
            with peers from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/questions">
                Explore Questions <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
              <Link href="/questions/ask">Ask a Question</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose DevOverflow?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Expert Answers</CardTitle>
                <CardDescription>Get help from experienced developers and industry experts</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Active Community</CardTitle>
                <CardDescription>Connect with millions of developers worldwide</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Trophy className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <CardTitle>Build Reputation</CardTitle>
                <CardDescription>Earn reputation points and badges for your contributions</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Tags */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Technologies</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "JavaScript",
              "React",
              "Node.js",
              "Python",
              "TypeScript",
              "Next.js",
              "MongoDB",
              "Express",
              "CSS",
              "HTML",
              "Vue.js",
              "Angular",
            ].map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm py-2 px-4 hover:bg-blue-100 cursor-pointer">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Join Our Growing Community</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2.5M+</div>
              <div className="text-blue-100">Questions Asked</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1.8M+</div>
              <div className="text-blue-100">Developers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Questions Answered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Community Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Activity</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">How to optimize React performance?</CardTitle>
                    <CardDescription>Asked by John Doe • 2 hours ago</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Star className="h-4 w-4 mr-1" /> 15 votes
                  </span>
                  <span>3 answers</span>
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">Performance</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Best practices for Node.js security</CardTitle>
                    <CardDescription>Asked by Sarah Miller • 4 hours ago</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Star className="h-4 w-4 mr-1" /> 23 votes
                  </span>
                  <span>7 answers</span>
                  <Badge variant="outline">Node.js</Badge>
                  <Badge variant="outline">Security</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of developers who are already part of our community</p>
          <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
            <Link href="/auth/signup">
              Create Your Account <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DO</span>
                </div>
                <span className="text-xl font-bold">DevOverflow</span>
              </div>
              <p className="text-gray-400">The developer community platform where knowledge meets collaboration.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
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
                  <Link href="/badges" className="hover:text-white">
                    Badges
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/guidelines" className="hover:text-white">
                    Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-white">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
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
                  <Link href="/contact" className="hover:text-white">
                    Contact
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
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DevOverflow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
