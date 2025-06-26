import { dbConnect } from '@/lib/dbConnect'
import { QuestionModel } from '@/models/question.model'
import { QuizModel } from '@/models/quiz.model'
import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'

export async function POST(req:NextRequest){
    await dbConnect() // ensure DB connection

    const sampleQuiz = {
      name: 'Basic Web Development Quiz',
      description: 'A quiz covering basic HTML, CSS, and JavaScript concepts.',
      questionData: new mongoose.Types.ObjectId('685a9c85eb88b6fd58cbfd76'), // Replace with your Question document _id
      participants: [
        // new mongoose.Types.ObjectId('64f9d6b7c9876543210fedcb'), // Replace with User _id
        // new mongoose.Types.ObjectId('64f9d6b7c0123456789fedcb'),
      ],
      totalMarks: 30,
    }

    const createdSet = await QuizModel.create(sampleQuiz)
     await createdSet.populate('questionData')

    
    return NextResponse.json({
      message: `data loaded ${createdSet._id} ${createdSet.questionData.questions[0].question} `,
    })

}