import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import { NextRequest,  } from "next/server";
import bcrypt from 'bcrypt'




export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, username, email, password } = await req.json()
    console.log('Received payload:', {
      firstName,
      lastName,
      username,
      email,
      password,
    })
    if (!firstName || !lastName || !username || !email || !password) {
      return Response.json(
        {
          success: false,
          message: 'please enter all the data to register',
        },
        { status: 400 }
      )
    }
    await dbConnect()
    const userRegisteredByUsername = await UserModel.findOne({
      username: username,
    })
    if (userRegisteredByUsername) {
      return Response.json(
        {
          success: false,
          message: 'Username already taken',
        },
        { status: 400 }
      )
    }

    const userRegisteredByEmail = await UserModel.findOne({ email: email })
    if (userRegisteredByEmail) {
      return Response.json(
        {
          success: false,
          message: 'Email already registered',
        },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await UserModel.create({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: hashedPassword,
    })

    return Response.json(
      {
        success: true,
        message: 'user Registered Successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: `error while registering: ${error}`,
      },
      {
        status: 500,
      }
    )
  }
}