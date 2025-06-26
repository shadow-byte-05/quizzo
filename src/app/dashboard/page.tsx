'use client'

import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import axios from 'axios'
import { BarChart3,  Clock, Trophy,  } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type recentResults = {
  date: string,
  name:string,
  score:number,
  total:number,
}

const Page = () => {
  const [recentResults, setRecentResults] = useState<recentResults[]>([])
  const [quizData, setQuizData] = useState([])
  const { data: session } = useSession()
  // console.log(session?.user.id)
  useEffect(() => {
    if (!session?.user?.name) return
    const fetchData = async () => {
      const quizzes = await axios.get('/api/getQuizzes')

      const Results = await axios.post('/api/getResults', {
        email: session?.user?.email,
      })
      console.log(Results.data.data)
      setRecentResults(Results.data.data)
      setQuizData(quizzes.data.data)
    }
    fetchData()
  }, [session])
  useEffect(() => {
    console.log(quizData)
  }, [quizData])
  let sum = 0
  for (let i = 1; i < recentResults.length; i++) {
    const sum = recentResults[i].score
  }
  const average = sum / recentResults.length

  const handleSignOut = () => {
    signOut()
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime/10 to-teal-600/10">
      <Navbar isLoggedIn onSignOut={handleSignOut} />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-900-900 mb-2">
            Welcome back, {session?.user?.name}!
          </h1>
          <p className="text-gray-800">
            Ready to create or take some quizzes today?
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* <Card className="border-teal-700-600/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Quizzes Created
                  </p>
                  <p className="text-2xl font-bold text-indigo-900-900">
                    {myQuizzes.length}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-teal-700-600" />
              </div>
            </CardContent>
          </Card> */}

          <Card className="border-teal-700-600/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Quizzes Given
                  </p>
                  <p className="text-2xl font-bold text-indigo-900-900">
                    {recentResults.length}
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-teal-700-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-teal-700-600/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Average Score
                  </p>
                  <p className="text-2xl font-bold text-indigo-900-900">
                    {average}%
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-teal-700-600" />
              </div>
            </CardContent>
          </Card>

          {/* <Card className="border-teal-700-600/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Total Participants
                  </p>
                  <p className="text-2xl font-bold text-indigo-900-900">73</p>
                </div>
                <Users className="h-8 w-8 text-teal-700-600" />
              </div>
            </CardContent>
          </Card> */}
        </div>

        {/* Main Content Grid */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"> */}
        {/* Create Quiz Section */}
        {/* <div className="lg:col-span-1">
            <Card className="border-indigo-900/20 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-indigo-900-900">Create New Quiz</CardTitle>
                <CardDescription>
                  Start building an engaging quiz for your audience
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/quiz/create">
                  <Button
                    size="lg"
                    className="bg-indigo-900 hover:bg-indigo-900/90 text-white w-full mb-4"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Create Quiz
                  </Button>
                </Link>
                <p className="text-sm text-gray-800">
                  Build interactive quizzes with multiple choice questions
                </p>
              </CardContent>
            </Card>
          </div> */}

        {/* My Quizzes */}
        {/* <div className="lg:col-span-2">
            <Card className="border-teal-700-600/20">
              <CardHeader>
                <CardTitle className="text-indigo-900-900 flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  My Quizzes
                </CardTitle>
                <CardDescription>Quizzes you've created</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quizData.map((quiz: any) => (
                  <div
                    key={quiz.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <h3 className="font-semibold text-indigo-900-900">
                        {quiz.id}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link href={`/quiz/${quiz.id}/edit`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
                {myQuizzes.length === 0 && (
                  <p className="text-center text-gray-800 py-8">
                    No quizzes created yet. Create your first quiz to get
                    started!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div> */}

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Enrolled Quizzes */}
          <Card className="border-teal-700-600/20">
            <CardHeader>
              <CardTitle className="text-indigo-900-900 flex items-center">
                <Trophy className="mr-2 h-5 w-5" />
                Available Quizzes
              </CardTitle>
              <CardDescription>Quizzes you can take</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quizData.map((quiz: any, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-indigo-900-900">
                      {quiz.name}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link href={`/quiz/${quiz._id}/start`}>
                      <Button variant="outline" size="sm">
                        Start
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Results */}
          <Card className="border-teal-700-600/20">
            <CardHeader>
              <CardTitle className="text-indigo-900-900 flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Recent Results
              </CardTitle>
              <CardDescription>Your latest quiz scores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentResults.map((result: any, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg" 
                >
                  <div>
                    <h3 className="font-semibold text-indigo-900-900">
                      {result.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-800 mt-1">
                      <Clock className="h-4 w-4" />
                      <span>{result.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-teal-700-600">
                      {result.score}/{result.total}
                    </div>
                    <div className="text-sm text-gray-800">
                      {Math.round((result.score / result.total) * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Page
