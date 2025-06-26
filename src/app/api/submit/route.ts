import { dbConnect } from "@/lib/dbConnect";
import { QuestionModel } from "@/models/question.model";
import { QuizModel } from "@/models/quiz.model";
import { ResultModel } from "@/models/result.model";
import { UserModel } from "@/models/user.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

type answer = {
  question: number,
  answer:string
}

type Questions = {
  question: string,
  options: string[],
  answer: string,
  _id?: mongoose.Types.ObjectId | string
}


export async function POST(req:NextRequest){
    const submittedAnswer = await req.json()
    // console.log(submittedAnswer)
    await dbConnect()
    try {
        const user = await UserModel.findOne({email:submittedAnswer.userEmail})
        const quiz = await QuizModel.findById(submittedAnswer.quizId)
        const questions = await QuestionModel.findById(quiz?.questionData)

        if(!user){
            return NextResponse.json({
              message:"User not found"
            })
        }
        // return NextResponse.json({date:questions?.questions.length})

        const length = questions?.questions.length

        let score = 0
        const correctQuestion = []
        const incorrectQuestion = []
        const unattemptedQuestion = []

        if (length) {
          for (let i = 0; i < length; i++) {
            const question: Questions = questions.questions[i]
            const submitted = submittedAnswer.answers.find((a:answer) => a.question === i)
            // console.log(question)
            if (!submitted) {
              unattemptedQuestion.push(question._id)
              continue
            }

            if (question.answer === submitted.answer) {
              score = score +4
              correctQuestion.push(question._id)
            } else {
              score--
              incorrectQuestion.push(question._id)
            }
          }

          const result = await ResultModel.create({
            quizId:quiz._id,
            userId:user._id,
            solution: submittedAnswer.answers,
            score:score,
                correctQuestion:correctQuestion,
                incorrectQuestion:incorrectQuestion,
                unattemptedQuestion:unattemptedQuestion,
                toppersScore:'',
          })
          await UserModel.findByIdAndUpdate(
            user._id,
            { $addToSet: { quizResult: result._id } }, 
            { new: true } 
          )
          

          return NextResponse.json({
            success: true,
            redirectTo: `/quiz/${quiz._id}/submitted`,
          })
        }

        
        }
     catch (error) {
        console.log(error)
        return NextResponse.json({
            
            message:"error occured while submitting"
    })
    }
}