import z from 'zod'

export const signUpSchema = z.object({
    username: z
        .string()
        .min(4, { message: 'Username must be at least 4 characters long' })
        .max(20, { message: 'Username must not exceed 20 characters' })
        .regex(/^[a-zA-Z0-9_]+$/, {
        message: 'Username can only contain letters, numbers, and underscores',
        }),
    email: z
        .string()
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: 'Invalid email address',
        })
        .toLowerCase(),
    password: z
        .string()
        // .min(6, { message: 'Password must be at least 6 characters long' })
        // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
        // message:
        //     'Password must contain at least one uppercase letter, one lowercase letter, and one number',})
})
