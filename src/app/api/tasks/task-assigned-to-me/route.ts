import { NextResponse, NextRequest } from "next/server"
import ConnectDB from "@/app/config/db"

import Task from "@/app/model/tasksModel"
import { getSession } from "@/app/actions/auth"

export const GET = async (req:NextRequest, res:NextResponse) => {
  // const session = await getSession()
  // console.log(session)
  const searchParams = req.nextUrl.searchParams;
  // console.log(searchParams);
  const id = searchParams.get("id");
  
  console.log(id)
  try {
    await ConnectDB()

    const myTasks = await Task.find({ assignedTo: id })
      .populate("assignedTo", "name")
      .populate("createdBy", "name")

    console.log(myTasks)

    return new NextResponse(JSON.stringify(myTasks), { status: 200 })
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
