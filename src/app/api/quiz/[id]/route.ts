import { dbConnect } from "@/lib/dbConnect"

import { QuestionModel } from "@/models/question.model" 

import { QuizModel } from "@/models/quiz.model"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
  await dbConnect()
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()
  console.log(id)

//   if (!id || mongoose.Types.ObjectId.isValid(id)) {
//     return NextResponse.json({
//       message: 'Invalid Id',
//       data: id,
//     })
//   }
  //685a9e9deb88b6fd58cbfd9c - QuizId

  try {
    const quiz = await QuizModel.findById(id)
    if (!quiz) {
      return NextResponse.json({ message: 'Error occured' })
    }
    const question = await QuestionModel.findById(quiz.questionData)

    const questions = question?.questions.map((question: any) => {
      return { question: question.question, options: question.options }
    })
    
    return NextResponse.json({ message: 'Quiz loaded', data:{
      name:quiz.name,
      description: quiz.description,
      totalMarks:quiz.totalMarks,
      questions: questions
    } })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: 'error while fetching quiz',
    })
  }
}

export async function GET(req: NextRequest) {
  await dbConnect()
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()

  // if (!id || !mongoose.Types.ObjectId.isValid(id)) {
  //   return NextResponse.json({ message: 'Invalid Id', data: id })
  // }

  try {
    const quiz = await QuizModel.findById(id)
    if (!quiz) {
      return NextResponse.json({ message: 'Quiz not found' })
    }

    const question = await QuestionModel.findById(quiz.questionData)


    const questions = question?.questions.map((question: any) => {
      return { question: question.question, options: question.options }
    })

    return NextResponse.json({
      message: 'Quiz loaded',
      data: questions,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      message: 'Error while fetching quiz',
    })
  }
}
