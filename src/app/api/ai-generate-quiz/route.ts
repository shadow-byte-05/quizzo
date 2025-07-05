import { NextRequest, NextResponse } from "next/server";
import {GoogleGenAI, Type} from "@google/genai"
import { QuestionModel } from "@/models/question.model";
import { QuizModel } from "@/models/quiz.model";
import { UserModel } from "@/models/user.model";
import { dbConnect } from "@/lib/dbConnect";

const ai = new GoogleGenAI({})

export async function POST (req:NextRequest){
  await dbConnect()
  try {
    const data = await req.json()
    const {
      noOfQuestion,
      topicName,
      createdBy,
    } = data
    let questions
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `List ${noOfQuestion} MCQ for the topic ${topicName} with 4 option and answers`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: {
                  type: Type.STRING,
                },
                options: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.STRING,
                  },
                },
                answer: {
                  type: Type.STRING,
                },
              },
              propertyOrdering: ['question', 'options', 'answer'],
            },
          },
        },
      })
      questions = await JSON.parse(response.text || '')
    } catch (error) {
      console.error(error)
      return NextResponse.json({
        message:"Problem in generating question"
      })
    }
    return NextResponse.json({
      questions,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      message:"Problem in generating questions"
    })
  }

 
}