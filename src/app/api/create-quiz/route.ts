import { dbConnect } from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    await dbConnect()
    try {
        const data = await req.json()
        return NextResponse.json(data)
    } catch (error) {
        return new Error
}
}