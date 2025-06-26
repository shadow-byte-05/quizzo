'use client'


import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import { ArrowLeft, Badge, BarChart3, CheckCircle, RotateCcw, Trophy, XCircle } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const page = () => {
    const {data:session} = useSession()
    const email = session?.user?.email
    const [result, setResult] = useState({
        score: 0,
        totalQuestions: 0,
        totalMarks: 0,
        earnedMarks: 0,
        percentage: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        submittedAt: '',
        questions: [],
    })

    useEffect(() => {
      const fetchResult = async () => {
        try {
          const response = await axios.post('/api/getResultData', {
            email: email,
          })
          console.log( response.data.data)
          setResult(response.data.data)
        } catch (err: any) {
         console.log("error")
        }
      }

      if (email) {
        fetchResult()
      }
    }, [session])

    const handleSignOut = () => {
        signOut()
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime/10 to-teal/10">
      <Navbar isLoggedIn onSignOut={handleSignOut} />

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-primary">Quiz Results</h1>
          </div>
        </div>

        {/* Score Summary */}
        <Card className="shadow-xl border-teal-300 mb-8">
          <CardHeader className=" text-center border-b border-gray-100 pb-6">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <Trophy className="h-12 w-12 text-teal" />
              <div>
                <CardTitle className="text-4xl font-bold text-primary">
                  {result.percentage}%
                </CardTitle>
              </div>
            </div>
            <CardDescription className="text-lg">Quiz Results</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-green-700">
                  {result.correctAnswers}
                </div>
                <div className="text-sm text-green-600">Correct</div>
              </div>

              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <XCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-red-700">
                  {result.incorrectAnswers}
                </div>
                <div className="text-sm text-red-600">Incorrect</div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <BarChart3 className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-purple-700">
                  {result.earnedMarks}/{result.totalMarks}
                </div>
                <div className="text-sm text-purple-600">Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question by Question Results */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">
            Question-by-Question Review
          </h2>

          {result.questions?.map((question: any, index: any) => (
            <Card key={question.id} className="shadow-lg border-teal/20">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-primary mb-2">
                      Question {index + 1}
                    </CardTitle>
                    <p className="text-gray-700">{question.question}</p>
                  </div>
                  <div className="ml-4">
                    {question.isCorrect ? (
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    ) : (
                      <XCircle className="h-8 w-8 text-red-600" />
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div
                      className={`p-4 rounded-lg border ${
                        question.isCorrect
                          ? 'bg-green-50 border-green-200'
                          : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <h4 className="font-semibold text-sm mb-2">
                        Your Answer:
                      </h4>
                      <p
                        className={
                          question.isCorrect ? 'text-green-700' : 'text-red-700'
                        }
                      >
                        {question.selectedAnswer}
                      </p>
                    </div>

                    {!question.isCorrect && (
                      <div className="p-4 bg-green-100 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-sm mb-2">
                          Correct Answer:
                        </h4>
                        <p className="text-green-700">
                          {question.correctAnswer}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
