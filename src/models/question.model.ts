import mongoose, { Schema } from "mongoose"

 type Question = {
    question: string,
    options: string[],
    answer: string,
}
export interface Questions extends Document  {
    questions: Question[]
}
const questionItemSchema = new Schema<Question>({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
})
const questionSchema = new Schema<Questions>({
  questions: [questionItemSchema],
})

export const QuestionModel = (mongoose.models.Questions as mongoose.Model<Questions>) || (mongoose.model<Questions>('Questions',questionSchema))