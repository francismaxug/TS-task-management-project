import ContentHeader from "../dashboard-components/ContentHeader"
import React from "react"
import { AllTasks } from "@/app/(dashboard)/tasks/dashboard-components/DataTable"
import { toast } from "react-toastify"
import { format } from "date-fns"
import LoadingMessages from "../loading"
import { ITasks } from "@/lib/types"
import { getSession } from "@/app/actions/auth"


const apiDOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || null
async function getTasks(id: string) {
  if(!apiDOMAIN) {  
    return []
  }
  try {
    const res = await fetch(
      `${apiDOMAIN}/tasks/task-created-by-me?id=${id}`
    )
    if (!res.ok) {
      return
    }
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
const TaskByMe = async () => {
  const user = await getSession()
  console.log(user)
  const data: ITasks[] = await getTasks(user?.user?.id)
  console.log(data)
  return (
    <>
      <ContentHeader />
      <AllTasks tasks={data} title="Task Created by Me" />
    </>
  )
}

export default TaskByMe
