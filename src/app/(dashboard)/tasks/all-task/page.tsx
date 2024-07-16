import React, { Suspense } from "react"
import ContentHeader from "../dashboard-components/ContentHeader"
import { AllTasks } from "@/app/(dashboard)/tasks/dashboard-components/DataTable"
import { toast } from "react-toastify"
import { format } from "date-fns"
import LoadingMessages from "../loading"
import { ITasks } from "@/lib/types"

async function getTasks() {
  try {
    const res = await fetch("http://localhost:3000/api/tasks", {
      cache: "no-cache",
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
