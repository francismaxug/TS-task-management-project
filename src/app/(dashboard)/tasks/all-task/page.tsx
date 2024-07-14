import React from "react"
import ContentHeader from "../dashboard-components/ContentHeader"
import { AllTasks } from "@/components/DataTable"
import { toast } from "react-toastify"
import { format } from "date-fns"

async function getTasks() {
  try {
    const res = await fetch("http://localhost:3000/api/tasks")
    if (!res.ok) {
      toast.error("error fetching tasks")
      return
    }
    // toast.error("error fetching tasks")
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
const AllTask = async () => {
  const data = await getTasks()
  console.log(data)
  console.log(format(data.allTask[6].dueDate, "PPPPp"))
  return (
    <>
      <ContentHeader />
      <div>
        <AllTasks />
      </div>
    </>
  )
}

export default AllTask
