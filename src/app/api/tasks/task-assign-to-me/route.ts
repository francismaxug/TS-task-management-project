import { NextResponse, NextRequest } from "next/server"
import ConnectDB from "@/app/config/db"

import Task from "@/app/model/tasksModel"
import { getSession } from "@/app/actions/auth"

export const GET = async (req: NextRequest, res: NextResponse) => {
  const session = await getSession()
  try {
    await ConnectDB()

    const myTasks = await Task.find({ assignedTo: session?.user?.id })

    return new NextResponse(
      JSON.stringify({
        status: "success",
        myTasks,
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
