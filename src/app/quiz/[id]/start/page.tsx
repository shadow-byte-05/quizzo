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
import { useQuiz } from '@/context/quizContext'

import { Award, FileText, Loader2 } from 'lucide-react'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, {  useState } from 'react'

const Page = () => {
  const { name, description, totalMarks, questions } = useQuiz()

  const router = useRouter()
  const params = useParams()
  const quizId = params?.id
  // const { data: session } = useSession()

  const [isStarting, setIsStarting] = useState(false)



  const handleStartQuiz = async () => {
    console.log('clicked')
    setIsStarting(true)
    try {
      router.replace(`/quiz/${quizId}/question/1`)
    } catch (error) {
      console.error('Failed to fetch quiz:', error)
  }

 
    // console.log(response)
  }

  // const handleSubmit = async () =>{
  //     const submit = await axios.post('/api/submit',{
  //         userEmail: session?.user?.email,
  //         quizId: quizId,
  //         answers:response
  //     })
  //     console.log(submit)
  //     if(submit.data.success)
  //     {
  //         router.replace(`/dashboard/quiz/${quizId}/submitted`)
  //     }

  // }
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-100/10 to-teal-100/10">
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="text-teal-700 hover:text-teal-700/80 font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <Card className="shadow-xl border-teal-700-300">
          <CardHeader className="text-center border-b border-gray-100 pb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-secondary p-4 rounded-full">
                <FileText className="h-12 w-12 text-indigo-900" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-indigo-900 mb-2">
              {name}
            </CardTitle>
            <CardDescription className="text-lg max-w-2xl mx-auto leading-relaxed">
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            {/* Quiz Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-8">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <FileText className="h-8 w-8 text-teal-700-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-indigo-900">
                  {totalMarks / 4}
                </div>
                <div className="text-sm text-gray-800">Total Question</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Award className="h-8 w-8 text-teal-700-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-indigo-900">
                  {totalMarks}
                </div>
                <div className="text-sm text-gray-800">Total Marks</div>
              </div>
            </div>

            {/* Quiz Instructions */}
            <div className="mb-8 p-6 bg-lime/10 border border-lime/20 rounded-lg">
              <h3 className="text-lg font-semibold text-indigo-900 mb-4">
                Instructions
              </h3>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-teal rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Each question has only one correct answer
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-teal rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  You can navigate between questions using Next/Previous buttons
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-teal rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Each correct answer awards <strong>+4</strong> marks.
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-teal rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Each wrong answer deducts <strong>−1</strong> mark.
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-teal rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Unanswered questions will <strong>not affect</strong> your
                  score. mark.
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-teal rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Please do not refresh or close the page during the quiz.
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-teal rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Your final score will be shown after submission.
                </li>
              </ul>
            </div>

            {/* Quiz Creator Info */}
            {/* <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between text-sm text-gray-800">
                  <span>
                    Created by:{' '}
                    <span className="font-medium text-indigo-900">
                      {quiz.creator}
                    </span>
                  </span>
                  <span>{quiz.participants} people have taken this quiz</span>
                </div>
              </div> */}

            {/* Start Quiz Button */}
            <div className="text-center">
              <Button
                size="lg"
                className="bg-indigo-900 hover:bg-indigo-900/90 text-white px-12 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleStartQuiz}
                disabled={isStarting}
              >
                {isStarting ? (
                  <>
                    Starting Quiz{' '}
                    <Loader2 className="inline animate-spin ml-2" />
                  </>
                ) : (
                  'Start Quiz'
                )}
              </Button>
              <p className="text-sm text-gray-800 mt-4">
                Good luck! Take your time and read each question carefully.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Page

// <>
//     {!isQuizStart && <button onClick={handleStartQuiz}>Start Quiz</button>}

//     {isQuizStart &&
//     quizQuestion.map((question, index) => {
//         return (
//         <div key={index} className="mb-4">
//             <h1>
//             Q-{index + 1}: {question.question}
//             </h1>
//             <div className="pl-4">
//             {question.options.map((option, i) => (
//                 <div key={i} className="my-1">
//                 <button className='hover:bg-amber-300' onClick={() => {handleClick(index,i)}}>{option}</button>
//                 </div>
//             ))}
//             </div>
//         </div>
//         )
//     })}
//     <button onClick={handleSubmit}>submit</button>
// </>
