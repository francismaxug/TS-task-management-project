import { NextResponse, NextRequest } from "next/server"
import ConnectDB from "@/app/config/db"

import User from "@/app/model/userModel"

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await ConnectDB()

    const user = await User.find({}).select("-password")


    return new NextResponse(
      JSON.stringify({
        status: "success",
        user,
      }),
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return new NextResponse(
      JSON.stringify({
        status: "failed",
        message: "something went wrong",
      }),
      {
        status: 500,
      }
    )
  }
}
