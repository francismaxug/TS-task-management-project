import { NextResponse, NextRequest } from "next/server"
import ConnectDB from "@/app/config/db"
import { revalidatePath } from "next/cache"

import Task from "@/app/model/tasksModel"
import { getSession } from "@/app/actions/auth"
export const revalidate = true
export const POST = async (req: NextRequest, res: NextResponse) => {
  const {
    title,
    description,
    status,
    dueDate,
    assignedTo,
    priority,
    startDate,
  } = await req.json()
  const session = await getSession()
  console.log(session)
  console.log(
    title,
    description,
    status,
    dueDate,
    assignedTo,
    priority,
    startDate
  )

  try {
    await ConnectDB()

    // const hashPassword = await bcrypt.hash(password, 10)
    await Task.create({
      title,
      startDate,
      status,
      description,
      dueDate,
      assignedTo,
      priority,
      createdBy: session?.user?.id,
    })

    const path = req.nextUrl.pathname
    revalidatePath(path)
    return new NextResponse(
      JSON.stringify({
        status: "success",
      }),
      { status: 201 }
    )

    // return Response.redirect(`http://localhost:3000/tasks/overview`)
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

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await ConnectDB()
    const session = await getSession()
    console.log(session)

    const allTask = await Task.find({})
      .sort("-createdAt")
      .populate("assignedTo", "name")
      .populate("createdBy", "name")

    return new NextResponse(JSON.stringify(allTask), { status: 200 })
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
