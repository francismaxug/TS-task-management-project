import { cn } from "@/lib/utils"
import React from "react"

const Button = ({
  className,
  children,
  onClick,
  type,
}: {
  className?: string
  children?: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        "rounded-full sm:p-1 text-white text-sm transition ease-linear duration-200 py-2 px-5  sm:px-4 bg-gradient-to-r from-[hsl(251,82%,67%)] to-purple-500",
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
