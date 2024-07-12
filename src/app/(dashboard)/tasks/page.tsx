"use client"
import Image from "next/image"
import React from "react"

import ContentHeader from "./dashboard-components/ContentHeader"
import Analytics from "./overview/page"

const Chat = () => {
  return (
    <main>
      <ContentHeader />
      <Analytics />
    </main>
  )
}

export default Chat
