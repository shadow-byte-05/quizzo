import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    await dbConnect()
    try {
        const data = await req.json()
        return NextResponse.json(data)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message:"error occured while connecting database"
        })
}
}