import { dbConnect } from '@/lib/dbConnect'
import { ResultModel } from '@/models/result.model'
import { QuestionModel} from '@/models/question.model'
import '@/models/quiz.model'
import { NextRequest, NextResponse } from 'next/server'
import { UserModel } from '@/models/user.model'
import { Quiz } from '@/models/quiz.model'

type question = {
  question: number,
  answer: string
}

export async function POST(req: NextRequest) {
  await dbConnect()
  const { email } = await req.json()
  try {
    // Get the latest result for the user
    const user = await UserModel.findOne({email:email})
    const resultId = user.quizResult[user.quizResult.length -1]
    const result = await ResultModel.findOne(resultId)
      .populate('quizId')

    if (!result) {
      return NextResponse.json({ message: 'No results found' }, { status: 404 })
    }

    const quiz: Quiz = result.quizId
    const questionDoc = await QuestionModel.findById(quiz.questionData)
    const questions = questionDoc?.questions || []

    const questionDetails = result.solution.map((entry: question, index: number) => {
      const original = questions[entry.question as number]
      return {
        id: index + 1,
        question: original?.question || 'N/A',
        selectedAnswer: entry.answer,
        correctAnswer: original?.answer || 'N/A',
        isCorrect: entry.answer === original?.answer,
      }
    })

    const totalQuestions = questions.length
    const earnedMarks = result.score 
    const percentage = Math.round((earnedMarks / quiz.totalMarks) * 100)

    const response = {
      score: result.score,
      totalQuestions,
      totalMarks: quiz.totalMarks,
      earnedMarks,
      percentage,
      correctAnswers: result.correctQuestion.length,
      incorrectAnswers: result.incorrectQuestion.length,
      submittedAt: result.createdAt.toLocaleString(),
      questions: questionDetails,
    }

    return NextResponse.json({ data: response })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { message: 'Failed to fetch result' },
      { status: 500 }
    )
  }
}
