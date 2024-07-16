import React, { useState, useEffect } from "react"
import ContentHeader from "../dashboard-components/ContentHeader"
import MainPage from "../page"
import Image from "next/image"
import Card from "../dashboard-components/Card"
import Charts from "../dashboard-components/Charts"
import { ITaskStats } from "@/lib/types"
import { toast } from "react-toastify"
import PageLoader from "../loading"

const apiDOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || null

async function getTasks() {
  if (!apiDOMAIN) {
    return {}
  }
  try {
    const res = await fetch(`${apiDOMAIN}/tasks/task-stats`, {
      cache: "no-cache",
    })
    if (!res.ok) {
      return
    }
    return res.json()
  } catch (error) {
    throw new Error("Network response was not ok")
  }
}
const Analytics = async () => {
  // const [data, setData] = useState<ITaskStats | null>(null)
  // const [loading, setLoading] = useState(true)
  const data: ITaskStats = await getTasks()
  console.log(data)

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
