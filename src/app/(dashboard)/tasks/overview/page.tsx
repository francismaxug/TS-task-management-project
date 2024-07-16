import React from "react"
import ContentHeader from "../dashboard-components/ContentHeader"
import MainPage from "../page"
import Image from "next/image"
import Card from "../dashboard-components/Card"
import Charts from "../dashboard-components/Charts"
import { ITaskStats } from "@/lib/types"

async function getTasks() {
  try {
    const res = await fetch("http://localhost:3000/api/tasks/task-stats", {
      cache: "no-cache",
    })
    if (!res.ok) {
      return
    }
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
const Analytics = async () => {
  const data: ITaskStats = await getTasks()
  console.log(data)
  return (
    <div className=" ">
      <ContentHeader />
      <div className=" px-2 py-3">
        <Card data={data} />
        <Charts data={data} />
      </div>
    </div>
  )
}

export default Analytics
