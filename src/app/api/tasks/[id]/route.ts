import { NextResponse, NextRequest } from "next/server"
import ConnectDB from "@/app/config/db"

import Task from "@/app/model/tasksModel"
import { getSession } from "@/app/actions/auth"
import { revalidatePath } from "next/cache"
export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string
    }
  }
) => {
  await ConnectDB()
  console.log(params.id)
  try {
    const singleTask = await Task.findById(params.id)
      .populate("assignedTo", "name")
      .populate("createdBy", "name")

    // console.log(singleTask)
    return new NextResponse(JSON.stringify(singleTask), { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Not Found" },
      {
        status: 404,
      }
    )
  }
}

export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string
    }
  }
) => {
  console.log(params.id)

  await ConnectDB()
  try {
    await Task.findByIdAndDelete(params.id)

    const path = req.nextUrl.pathname
    revalidatePath(path)
    return new NextResponse(
      JSON.stringify({ message: "Task deleted successfully" }),
      {
        status: 200,
      }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to delete Property" },
      {
        status: 404,
      }
    )
  }
}
export const PATCH = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string
    }
  }
) => {
  const {
    title,
    description,
    status,
    dueDate,
    assignedTo,
    priority,
    startDate,
  } = await req.json()
  const data = {
    title,
    description,
    status,
    dueDate,
    assignedTo,
    priority,
    startDate,
  }

  console.log(data)
  console.log(params.id)
  await ConnectDB()
  try {
    const findTask = await Task.findById(params.id)
    if (!findTask) {
      return new NextResponse(
        JSON.stringify({ message: "error updataing task" }),
        {
          status: 400,
        }
      )
    }

    const data = {
      title: title || findTask.title,
      description:description || findTask.description,
      status:status || findTask.status,
      dueDate:dueDate || findTask.dueDate,
      assignedTo:assignedTo || findTask.assignedTo,
      priority:priority || findTask.priority,
      startDate:startDate || findTask.startDate,
    }
    await Task.findByIdAndUpdate(params.id, data, {
      new: true,
    })

    console.log("ok")
    const path = req.nextUrl.pathname
    revalidatePath(path)
    return new NextResponse(
      JSON.stringify({ message: "Updated Successfully" }),
      {
        status: 201,
      }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to delete Property" },
      {
        status: 404,
      }
    )
  }
}
