'use client'

import Navbar from '@/components/Navbar'
import QuestionCard from '@/components/QuestionCard'
import { Button } from '@/components/ui/button'
import { useAnswers } from '@/context/answerContext'
import { useQuiz } from '@/context/quizContext'
import axios from 'axios'
import {  ChevronLeft, ChevronRight, Flag } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'


const Page = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const { id, questionNumber } = useParams()
  const { questions = [], totalMarks,name } = useQuiz()
  const { answers, setAnswers } = useAnswers()

  const [selectedAnswer, setSelectedAnswer] = useState('')

  const currentQuestion = Number(questionNumber)
  const totalQuestions = questions.length

  useEffect(() => {
    const savedAnswer = answers[currentQuestion - 1]?.answer || ''
    setSelectedAnswer(savedAnswer)
  }, [currentQuestion, answers])

  const handleAnswerChange = (value: string) => {
    setSelectedAnswer(value)
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion - 1]: {
        question: questions[currentQuestion - 1]?.question || '',
        answer: value,
      },
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      router.push(`/quiz/${id}/question/${currentQuestion + 1}`)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      router.push(`/quiz/${id}/question/${currentQuestion - 1}`)
    }
  }

  const handleSubmitQuiz = async () => {
    if (!session?.user?.email) {
      console.error('User not authenticated')
      return
    }

    const submissionData = {
      userEmail: session.user.email,
      quizId: id,
      answers: Object.keys(answers).map((key) => ({
        question: Number(key),
        answer: answers[Number(key)].answer,
      })),
    }

    console.log('Submitting:', submissionData)

    try {
      router.push(`/quiz/${id}/submit`)
      const res = await axios.post('/api/submit', submissionData)
      console.log('Submitted successfully:', res.data)
      if (res.data.redirectTo) {
        router.push(res.data.redirectTo)
      }
    } catch (err) {
      console.error('Error submitting quiz:', err)
    }
  }

  const handleSignOut = () => {
    signOut()
  }

  const progressPercentage = (currentQuestion / totalQuestions) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-100/10 to-teal-100/10">
      <Navbar isLoggedIn onSignOut={handleSignOut} />

      {/* Quiz Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-indigo-900">
                {name}
              </h1>
              &nbsp; Question {currentQuestion} of {totalQuestions}
            </div>

            <div className="flex items-center space-x-6">
              <Button
                variant="outline"
                size="sm"
                className="border-indigo-900 text-indigo-900 hover:bg-indigo-900 hover:text-white"
                onClick={handleSubmitQuiz}
              >
                <Flag className="h-4 w-4 mr-2" />
                Submit Quiz
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm  mt-1">
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <QuestionCard
          question={questions[currentQuestion - 1]}
          questionNumber={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerChange={handleAnswerChange}
        />

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 mt-8 border-t">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 1}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          {currentQuestion === totalQuestions ? (
            <Button
              onClick={handleSubmitQuiz}
              className="bg-indigo-900 hover:bg-indigo-700 text-white flex items-center space-x-2"
              disabled={!selectedAnswer}
            >
              <Flag className="h-4 w-4" />
              <span>Submit Quiz</span>
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="bg-indigo-900 hover:bg-indigo-700 text-white flex items-center space-x-2"
              disabled={!selectedAnswer}
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
