import React from "react"
import { cn } from "@/lib/utils"

const Loading = ({className}:{
  className?: string
}) => {
  return (
    <div
      className={cn(
        "block w-10 h-10 rounded-full border-inActConvo border-[4px] border-t-pinkBtn border-r-pinkBtn animate-spin",
        className
      )}
    />
  )
}

export default Loading
