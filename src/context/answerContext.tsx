'use client'

import React, { createContext, useContext, useState } from 'react'


type Answer = {
  question: string
  answer: string
}

type AnswerMap = {
  [key: number]: Answer
}


type AnswerContextType = {
  answers: AnswerMap
  setAnswers: React.Dispatch<React.SetStateAction<AnswerMap>>
  resetAnswers: () => void
}


const AnswerContext = createContext<AnswerContextType | undefined>(undefined)

export const AnswerProvider = ({ children }: { children: React.ReactNode }) => {
  const [answers, setAnswers] = useState<AnswerMap>({})

  const resetAnswers = () => {
    setAnswers({})
  }

  return (
    <AnswerContext.Provider value={{ answers, setAnswers, resetAnswers }}>
      {children}
    </AnswerContext.Provider>
  )
}


export const useAnswers = () => {
  const context = useContext(AnswerContext)
  if (!context) {
    throw new Error('useAnswers must be used within an AnswerProvider')
  }
  return context
}
