import { dbConnect } from "@/lib/dbConnect";
import { QuizModel } from "@/models/quiz.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET (req:NextRequest) {
    await dbConnect()
    try {
        const quiz = await QuizModel.aggregate(
        [
            {
                $project:{
                    _id:1,
                    name:1,
                    description:1,
                    totalMarks:1,
                }
            }
        ]
    )
    return NextResponse.json({
        message:"data fetched successfully",
        data: quiz
        
    })
        
    } catch (error) {
        return NextResponse.json({
            message:"Data fetching problem"
        })
    }

}