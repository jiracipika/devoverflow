import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Users, BookOpen, Search, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">DO</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">DevOverflow</span>
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
            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Where Developers
            <span className="text-blue-600 block">Learn & Share</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community of passionate developers. Ask questions, share knowledge, and grow your skills with peers
            from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/questions/ask">
                <MessageSquare className="mr-2 h-5 w-5" />
                Ask a Question
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/questions">
                <Search className="mr-2 h-5 w-5" />
                Browse Questions
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600 dark:text-gray-300">Questions Asked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">25K+</div>
              <div className="text-gray-600 dark:text-gray-300">Answers Given</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">5K+</div>
              <div className="text-gray-600 dark:text-gray-300">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600 dark:text-gray-300">Answer Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose DevOverflow?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Q&A System</CardTitle>
                <CardDescription>Ask technical questions and get expert answers from the community</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Upvote/downvote system</li>
                  <li>• Tag-based categorization</li>
                  <li>• Advanced search filters</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-green-600 mb-4" />
                <CardTitle>Community</CardTitle>
                <CardDescription>Connect with developers worldwide and build your network</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• User profiles & reputation</li>
                  <li>• Follow other developers</li>
                  <li>• Join topic communities</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 text-purple-600 mb-4" />
                <CardTitle>Knowledge Sharing</CardTitle>
                <CardDescription>Share your expertise through blogs and detailed answers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Write technical blogs</li>
                  <li>• Share code snippets</li>
                  <li>• Earn badges & recognition</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Tags */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Popular Tags</h2>
          <div className="flex flex-wrap gap-3">
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
              <Badge key={tag} variant="secondary" className="px-4 py-2 text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Recent Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <Badge variant="outline">JavaScript</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-2">How to handle async/await in React components?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  I'm trying to fetch data in a React component using async/await but getting errors...
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Star className="h-4 w-4 mr-1" />5 votes
                  </span>
                  <span>3 answers</span>
                  <span>12 views</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Sarah Miller</p>
                      <p className="text-sm text-gray-500">4 hours ago</p>
                    </div>
                  </div>
                  <Badge variant="outline">Python</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-2">Best practices for Django REST API authentication?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  What are the recommended approaches for implementing authentication in Django REST...
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Star className="h-4 w-4 mr-1" />8 votes
                  </span>
                  <span>2 answers</span>
                  <span>24 views</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start asking questions, sharing knowledge, and connecting with developers today.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/auth/signup">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DO</span>
                </div>
                <span className="text-xl font-bold">DevOverflow</span>
              </div>
              <p className="text-gray-400">
                A community-driven platform for developers to learn, share, and grow together.
              </p>
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
