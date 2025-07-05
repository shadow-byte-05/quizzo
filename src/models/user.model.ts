import mongoose, {Schema} from "mongoose"



export interface User extends Document {
    username?: string
    email: string
    password?: string
    image?: string
    provider: 'credentials' | 'google'
    quizParticipated: mongoose.Types.ObjectId[],
    quizResult: mongoose.Types.ObjectId[],
    quizCreated:mongoose.Types.ObjectId[]
    createdAt: Date
    updatedAt: Date
}

const userSchema = new Schema<User>(
    {
        username: {
        type: String,
        unique: true,
        trim: true,
        minlength: 4,
        maxlength: 20,
        required: function () {
            return this.provider === 'credentials'
        },
        },
        email: {
        type: String,
        required: true,
        unique: true,
        },
        password: {
        type: String,
        // minlength: 6,
        default: '',
        },
        image: {
        type: String,
        default: null,
        },
        provider: {
        type: String,
        enum: ['credentials', 'google'],
        required: true,
        },
        quizParticipated:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Quiz'
            }
        ],
        quizCreated:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Quiz'
            }
        ],
        quizResult:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Result'
            }
        ]

    },
    {
        timestamps: true,
    }
)


export const UserModel = mongoose.models.User || mongoose.model<User>('User',userSchema)