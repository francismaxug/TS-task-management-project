"use client"

import { useEffect } from "react"
import { toast } from "react-toastify"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    toast.error(error.message)
    console.error(error)
  }, [error])

  return (
    <div className=" flex items-center justify-center min-h-screen">
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
