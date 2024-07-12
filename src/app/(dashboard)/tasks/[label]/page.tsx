"use client"
import React, { Suspense } from "react"
import LoadingMessages from "../loading"
import { formatDateTime } from "@/lib/helper"
import ContentHeader from "../dashboard-components/ContentHeader"

const Chat = () => {
  // const time = formatDateTime(new Date())

  return (
    <main>
      <ContentHeader />
      {/* <h1 className="text-center  text-xs 3xl:text-lg">{time}</h1> */}
    </main>
  )
}

export default Chat
