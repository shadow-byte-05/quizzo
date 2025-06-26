import mongoose, { Schema } from "mongoose"



export interface Quiz extends Document {
    name: string,
    description: string,
    questionData:mongoose.Types.ObjectId,
    participants:mongoose.Types.ObjectId[],
    totalMarks: number,
    createdAt: Date,
    updatedAt: Date,
    
}

const quizSchema = new Schema<Quiz>({
    name: {
        type: String,
        required: [true, 'Quiz Name is Required'],
    },
    description: {
        type: String,
        required: [true, 'Description is Required'],
    },
    questionData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questions',
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    totalMarks: {
        type:Number,
    }

    
},{timestamps:true,})

export const QuizModel = mongoose.models.Quiz || mongoose.model<Quiz>('Quiz',quizSchema)