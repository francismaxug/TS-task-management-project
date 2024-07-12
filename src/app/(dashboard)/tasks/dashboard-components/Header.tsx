"use client"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { logout } from "@/app/actions/auth"
import Link from "next/link"

const Header = () => {
  // const { authToken } = useAppContext()
  const router = useRouter()

  const handleLogOut = async () => {
    await logout()
    router.push("/")
    if (typeof window !== "undefined")
      window.localStorage.removeItem("authToken")
  }

  // useEffect(() => {
  //   window.localStorage.removeItem("authToken")
  // }, [])
  return (
    <div className=" bg-white fixed left-0 top-0 right-0 w-full flex justify-between items-center px-3 sm:px-10 z-30 py-3 3xl:py-1 sm:py-1  border shadow-md">
      <Link
        href="/chat"
        className=" bg-pinkBtn rounded  font-manrope  h-[2.5rem] w-[3.7rem] text-[0.7rem] text-white/80 flex items-center justify-center 3xl:w-[4rem] 3xl:h-[2.5rem] "
      >
        CHATBOT
      </Link>
      <button
        onClick={handleLogOut}
        className="  bg-pinkBtn rounded  font-manrope h-[2.2rem] w-[4rem] text-[0.8rem] text-white/80 flex items-center justify-center 3xl:h-[2.1rem] "
      >
        Log Out
      </button>
    </div>
  )
}

export default Header
