import ContentHeader from "../dashboard-components/ContentHeader"
import React from "react"
import { getSession } from "@/app/actions/auth"
import { AllTasks } from "@/app/(dashboard)/tasks/dashboard-components/DataTable"

import { ITasks } from "@/lib/types"

const apiDOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || null
async function getTasks(id: string) {
  if (!apiDOMAIN) {
    return []
  }
  try {
    const res = await fetch(`${apiDOMAIN}/tasks/task-assigned-to-me?id=${id}`)
    if (!res.ok) {
      return
    }
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
const TaskToMe = async () => {
  const user = await getSession()
  console.log(user)
  const data: ITasks[] = await getTasks(user?.user?.id)
  console.log(data)
  return (
    <>
      <ContentHeader />
      <AllTasks tasks={data} title="Task Assigned To Me" />
    </>
  )
}

export default TaskToMe
