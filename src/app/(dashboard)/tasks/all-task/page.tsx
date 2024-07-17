import React, { Suspense } from "react"
import ContentHeader from "../dashboard-components/ContentHeader"
import { AllTasks } from "@/app/(dashboard)/tasks/dashboard-components/DataTable"

import { ITasks } from "@/lib/types"

const apiDOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || null
async function getTasks() {
  if (!apiDOMAIN) {
    return []
  }
  try {
    const res = await fetch(`${apiDOMAIN}/tasks`, {
      cache: "no-store",
    })
    if (!res.ok) {
      throw new Error("Something went wrong")
    }
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
const AllTask = async () => {
  const data: ITasks[] = await getTasks()
  console.log(data)
  // console.log(format(data[6]?.dueDate, "PPPPp"))
  return (
    <>
      <ContentHeader />

      <AllTasks tasks={data} title="All Task" />
    </>
  )
}

export default AllTask
