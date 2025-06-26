import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { CheckCircle, Users, Trophy, Clock } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime/20 to-teal-600/20">
      <Navbar isHomePage={true} />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-indigo-900-900 mb-6 animate-fade-in">
            Create & Take
            <span className="text-teal-700-600 block">Amazing Quizzes</span>
          </h1>
          <p className="text-xl text-teal-700-600-800 mb-8 max-w-3xl mx-auto leading-relaxed">
            Build engaging quizzes, test your knowledge, and track your
            progress. Join thousands of learners and educators in our
            interactive quiz platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-indigo-900  hover:text-black hover:bg-secondary text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-black"
              >
                Get Started Free
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                size="lg"
                variant="outline"
                className="border-indigo-900 text-indigo-900-900 hover:bg-indigo-900 hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow duration-300 border-teal-700-600">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-teal-700-600-900 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-indigo-900-900 mb-2">
                  Easy to Create
                </h3>
                <p className="text-teal-700-600-900 hover:">
                  Build quizzes in minutes with our intuitive interface
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-teal-700-600/20">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-teal-700-600-900 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-indigo-900-900 mb-2">
                  Share & Collaborate
                </h3>
                <p className="text-teal-700-600-900">
                  Share quizzes with friends or students instantly
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-teal-700-600/20">
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 text-teal-700-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-teal-700-600-900 mb-2">
                  Track Progress
                </h3>
                <p className="text-teal-700-600-900">
                  Monitor your scores and see your improvement
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-teal-700-600/20">
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-teal-700-600-900 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-indigo-900-900 mb-2">
                  Real-time Results
                </h3>
                <p className="text-teal-700-600-900">
                  Get instant feedback and detailed analytics
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-indigo-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Quiz Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join our community and start creating engaging quizzes today.
          </p>
          <Link href="/sign-up">
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-600-400 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Create Your First Quiz
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Page
