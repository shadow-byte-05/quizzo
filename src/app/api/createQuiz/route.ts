import { dbConnect } from "@/lib/dbConnect";
import { QuestionModel } from "@/models/question.model";
import { QuizModel } from "@/models/quiz.model";
import { UserModel } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    await dbConnect()
    try {
        const {title,description,totalMarks,createdBy,questions} = await req.json()

        if(!title && !description && !totalMarks && !createdBy && !questions )
        {
            return NextResponse.json({
                message: "parameters Missing to create quiz"
            },{
                status:400
            })
        }
        

        

        const newQuestions = await QuestionModel.create({
            questions:questions
        })
        const newQuiz = await QuizModel.create({
            name: title,
            description: description,
            totalMarks: totalMarks,
            questionData: newQuestions._id,
        })
        const user = await UserModel.findOneAndUpdate({email:createdBy},{
            $push:{quizCreated:newQuiz._id}},
            {new:true}
        )
        if (!user) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }
        
        
        return NextResponse.json({
            userData: user,
            Quiz:newQuiz,
            questions:newQuestions
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message:"error occured while connecting database"
        })
}
}