import { dbConnect } from '@/lib/dbConnect'
import '@/models/quiz.model'
import { UserModel } from '@/models/user.model'
import '@/models/user.model'
import '@/models/quiz.model'
import '@/models/result.model'
import { NextRequest, NextResponse } from 'next/server'


interface Quiz {
  name: string
  totalMarks: number
}

interface QuizResult {
  quizId: Quiz 
  score: number
  createdAt: string | Date
}

export async function POST(req: NextRequest) {
  await dbConnect()

  try {
    const userDetail = await req.json()
    // const Result = await ResultModel.findOne()
    // const quiz = await QuizModel.findOne()
    // console.log(userDetail)
    
    // console.log(mongoose.models)

    const user = await UserModel.findOne({ email: userDetail.email })
      .populate({
        path: 'quizResult',
        populate: { path: 'quizId' },
      })
      .lean()

      if (Array.isArray(user)){
        return NextResponse.json({
          message: 'user is not an array',
          
        })
      }
      // console.log(user)
      const quizzes = user?.quizResult?.map((result: QuizResult) => ({
        name: result.quizId?.name,
        score: result.score,
        date: new Date(result.createdAt).toLocaleDateString(),
        total: result.quizId.totalMarks,
      }))
      // console.log(quizzes)

    return NextResponse.json({
      message: 'Data fetched successfully',
      data: quizzes,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Result fetch failed' })
  }
}
