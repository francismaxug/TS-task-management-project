"use client"
import React, { useState, useEffect } from "react"
import ContentHeader from "../dashboard-components/ContentHeader"
import MainPage from "../page"
import Image from "next/image"
import Card from "../dashboard-components/Card"
import Charts from "../dashboard-components/Charts"
import { ITaskStats } from "@/lib/types"
import { toast } from "react-toastify"
import PageLoader from "../loading"

// async function getTasks() {
//   try {
//     const res = await fetch("http://localhost:3000/api/tasks/task-stats", {
//       cache: "no-cache",
//     })
//     if (!res.ok) {
//       toast.error("Failed to fetch data")
//     }
//     return res.json()
//   } catch (error) {
//     throw new Error("Network response was not ok")
//   }
// }
const Analytics = () => {
  const [data, setData] = useState<ITaskStats | null>(null)
  const [loading, setLoading] = useState(true)
  // const data: ITaskStats = await getTasks()
  // console.log(data)

  useEffect(() => {
    async function getTasks() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/task-stats`,
          {
            cache: "no-cache",
          }
        )
        if (!res.ok) {
          toast.error("Failed to fetch data")
        }
        const data = await res.json()
        setData(data)
      } catch (error) {
        throw new Error("Network response was not ok")
      } finally {
        setLoading(false)
      }
    }
    getTasks()
  }, [])

  console.log(data)
  return (
    <div className=" ">
      <ContentHeader />
      {loading && <PageLoader />}
      {!loading && (
        <div className=" px-2 py-3">
          <Card data={data!} />
          <Charts data={data!} />
        </div>
      )}
    </div>
  )
}

export default Analytics
