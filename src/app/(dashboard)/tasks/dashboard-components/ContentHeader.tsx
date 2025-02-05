"use client"
import React, { useEffect } from "react"
import Link from "next/link"
import { IoMenuOutline } from "react-icons/io5"
import { useState } from "react"
import MobileMenuRecords from "./MobileMenuRecords"
import { AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { getSession } from "@/app/actions/auth"

interface Iuser {
  user: {
    id?: string
    name: string
    email: string
  }
}
const ContentHeader = () => {
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  const pathname = usePathname()
  const path = pathname.split("/")[2]
  const [user, setUser] = useState<Iuser | null>(null)

  useEffect(() => {
    async function getUser() {
      const user = await getSession()
      setUser(user)
    }
    getUser()
  }, [])

  console.log(user)

  console.log(path)

  console.log(showMenu)
  return (
    <>
      <div className=" bg-topNav mb-3 px-2 sm:rounded py-3 border sm:py-2 lg:py-1 3xl:py-[0.5rem]  items-center gap-x-1 flex justify-between">
        <p className="capitalize py-2 text-[1rem] 2xl:text-[1.1rem] 3xl:text-[1.2rem]">
          {path}
        </p>
        <button className="lg:hidden">
          <IoMenuOutline
            onClick={() => setShowMenu((p) => !p)}
            className=" text-white text-3xl"
          />
        </button>
      </div>
      <AnimatePresence>
        {showMenu && <MobileMenuRecords user={user?.user!} />}
      </AnimatePresence>
    </>
  )
}

export default ContentHeader
