import mongoose, { Schema } from "mongoose"


export type Response = {
    question:Number,
    answer:String
}

export interface Result extends Document{
    quizId:mongoose.Types.ObjectId,
    userId:mongoose.Types.ObjectId,
    solution: Response[]
    score:Number,
    correctQuestion:mongoose.Types.ObjectId[],
    incorrectQuestion:mongoose.Types.ObjectId[],
    unattemptedQuestion:mongoose.Types.ObjectId[],
    toppersScore:Number,
    createdAt:Date,
    updatedAt:Date,
}

const responseSchema = new Schema<Response>({
    question:{
        type:Number,
        required: true,
    },
    answer:{
        type: String,
        required: true
    }
},{
    _id:false
})

const resultSchema = new Schema<Result>({
    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Quiz'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    solution: [responseSchema],
    score:{
        type:Number,
        required:true,
    },
    correctQuestion:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Questions'
        }
    ],
    incorrectQuestion:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Questions'
        }
    ],
    unattemptedQuestion:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Questions'
        }
    ],
    toppersScore:{
        type:Number
    }
},{
    timestamps:true
})
export const ResultModel = mongoose.models.Result || mongoose.model<Result>('Result',resultSchema)