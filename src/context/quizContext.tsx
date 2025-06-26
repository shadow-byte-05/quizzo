import { Questions } from '@/models/question.model'
import React, { createContext, useContext, useState } from 'react'

 export type question ={
    question:string,
    options: string[]
}

type QuizContextType = {
  name: string,
  description: string,
  totalMarks: number,
  questions:question[]
}
type FinalQuizContextType = QuizContextType & {
  setQuizData: React.Dispatch<React.SetStateAction<QuizContextType>>
}

const QuizContext = createContext<FinalQuizContextType | undefined>(undefined)

export const QuizProvider = ({
  children,
  data,
}: {
  children: React.ReactNode
  data: QuizContextType
}) => {
  const [quizData, setQuizData] = useState(data)

  return (
    <QuizContext.Provider value={{ ...quizData, setQuizData }}>
      {children}
    </QuizContext.Provider>
  )
}

// Custom hook for using the context
export const useQuiz = () => {
  const context = useContext(QuizContext)
  if (!context) throw new Error('useUser must be used inside a UserProvider')
  return context
}
