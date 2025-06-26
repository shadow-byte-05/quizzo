import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

import { Label } from './ui/label'
import { question } from '@/context/quizContext'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

interface QuestionCardProps {
  question: question
  questionNumber: number
  selectedAnswer: string
  onAnswerChange: (value: string) => void
}

const QuestionCard = ({
  question,
  questionNumber,
  selectedAnswer,
  onAnswerChange,
}: QuestionCardProps) => {
  return (
    <Card className="shadow-xl border-teal-700-300">
      <CardHeader>
        <CardTitle className="text-2xl text-indigo-900 mb-4">
          Question {questionNumber}
        </CardTitle>
        <div className="text-lg text-gray-700 leading-relaxed">
          {question.question}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <RadioGroup value={selectedAnswer} onValueChange={onAnswerChange}>
          {question.options.map((option, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:border-teal-700-600 hover:bg-teal-700 transition-all cursor-pointer mt-2"
            >
              <RadioGroupItem
                value={option}
                id={`option-${index}`}
                className="mt-2"
              />
              <Label
                htmlFor={`option-${index}`}
                className="text-base leading-relaxed cursor-pointer flex-1"
              >
                <span className="font-medium text-indigo-900 mr-2">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {!selectedAnswer && (
          <div className="text-center py-8">
            <p className="bg-white">Please select an answer to continue</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default QuestionCard
