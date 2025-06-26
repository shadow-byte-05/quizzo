import mongoose from "mongoose"
import { UserModel } from "@/models/user.model"
import { QuizModel } from "@/models/quiz.model"
import { QuestionModel } from "@/models/question.model"
import { ResultModel } from "@/models/result.model"

type connectionObject = {
    isConnected?: number;
}

const connection: connectionObject = {}

export const dbConnect  = async () => {
    try {
        if (connection.isConnected) {
            console.log("Database is already connected")
            return
        }

        const db = await mongoose.connect(`${process.env.MONGODB_URI}/quizzo`)


        connection.isConnected = db.connections[0].readyState

        console.log("Database connected successfully")
    } catch (error) {
        console.error("Database connection error:", error)
        throw new Error("Failed to connect to the database")
        
    }
}