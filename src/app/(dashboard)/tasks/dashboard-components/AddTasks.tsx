"use client"
import React from "react"

const AddTaskBtn = ({ children }: { children: React.ReactNode }) => {

  return (
    <button
      className=" flex justify-between items-center w-full "
      // onClick={handleAddConversation}
    >
      {children}
    </button>
  )
}

export default AddTaskBtn
