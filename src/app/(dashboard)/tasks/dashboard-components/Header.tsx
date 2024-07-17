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
    router.push(`/login`)
  }

  // useEffect(() => {
  //   window.localStorage.removeItem("authToken")
  // }, [])
  return (
    <div className=" bg-white fixed left-0 top-0 right-0 w-full flex justify-between items-center px-3 sm:px-10 z-50 py-3 3xl:py-0 sm:py-0  border shadow-md">
      <div className=" flex flex-col text-[0.85rem] ">
        <p className=" font-bold text-[0.95rem]">Welcome 👋</p>
        <p className=" text-gray-500">Here is what you have for today </p>
      </div>
      <button
        onClick={handleLogOut}
        className="  bg-pinkBtn rounded  font-manrope h-[2rem] w-[4rem] text-[0.8rem] text-white/80 flex items-center justify-center 3xl:h-[2.1rem] "
      >
        Log Out
      </button>
    </div>
  )
}

export default Header
