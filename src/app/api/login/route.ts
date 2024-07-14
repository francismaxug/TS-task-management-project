import { NextResponse, NextRequest } from "next/server"
import bcrypt from "bcryptjs"
import ConnectDB from "@/app/config/db"

import User from "@/app/model/userModel"

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { email, password } = await req.json()
  console.log(email, password)

  try {
    await ConnectDB()
    const userExist = await User.findOne({ email })
    if (!userExist) {
      // console.log(userExist)
      return new NextResponse(
        JSON.stringify({
          status: "failed",
          message: "Invalid credentials",
        }),
        {
          status: 404,
        }
      )
    }

    const isMatch = await userExist.comparePassword(password)
    if (!isMatch) {
      return new NextResponse(
        JSON.stringify({
          status: "failed",
          message: "Invalid credentials",
        }),
        {
          status: 400,
        }
      )
    }

    // const hashPassword = await bcrypt.hash(password, 10)

    return new NextResponse(
      JSON.stringify({
        status: "success",
        id: userExist._id,
        name: userExist.name,
        email: userExist.email,
      }),
      { status: 201 }
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
