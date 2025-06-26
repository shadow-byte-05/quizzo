'use client'

import { QuizProvider } from '@/context/quizContext'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const [loading, setLoading] = useState(true)
  const [quizData, setQuizData] = useState({
    name: '',
    description: '',
    totalMarks: 0,
    questions: [],
  })

  const params = useParams()
  const quizId = params?.id
  // const { data: session } = useSession()

  useEffect(() => {
    const fetchData = async () => {
      if (!quizId) return

      try {
        const res = await axios.post(`/api/quiz/${quizId}`)
        setQuizData(res.data.data)
      } catch (error) {
        console.error('Failed to fetch quiz:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [quizId])

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Loader2 className='w-[100] h-auto animate-spin'/>
      </div>
    </div>
  )

  return <QuizProvider data={quizData}>{children}</QuizProvider>
}

export default Layout
