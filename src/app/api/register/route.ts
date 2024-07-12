import { NextResponse, NextRequest } from "next/server"
import bcrypt from "bcryptjs"
import ConnectDB from "@/app/config/db"

import User from "@/app/model/userModel"

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { name, email, password } = await req.json()
  console.log(name, email, password)

  try {
    await ConnectDB()

    const userExist = await User.findOne({ email })
    if (userExist) {
      // console.log(userExist)
      return new NextResponse(
        JSON.stringify({
          status: "failed",
          message: "User already exist",
        }),
        {
          status: 400,
        }
      )
    }

    // const hashPassword = await bcrypt.hash(password, 10)

    const createdUser = new User({
      name,
      email,
      password,
    })

    await createdUser.save()
    return new NextResponse(
      JSON.stringify({
        status: "success",
        name: createdUser.name,
        email: createdUser.email,
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
