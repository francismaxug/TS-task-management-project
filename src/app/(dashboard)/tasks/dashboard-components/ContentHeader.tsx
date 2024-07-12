"use client"
import React from "react"
import Link from "next/link"
import { IoMenuOutline } from "react-icons/io5"
import { useState } from "react"
import MobileMenuRecords from "./MobileMenuRecords"
import { AnimatePresence } from "framer-motion"

import Image from "next/image"

const ContentHeader = () => {
  const [showMenu, setShowMenu] = useState(false)

  console.log(showMenu)
  return (
    <>
      <div className=" bg-topNav mb-3 px-2 sm:rounded py-3 border sm:py-2 lg:py-1 3xl:py-[0.5rem]  items-center gap-x-1 flex justify-between">
        <p>Hello</p>
        <button className="lg:hidden">
          <IoMenuOutline
            onClick={() => setShowMenu((p) => !p)}
            className=" text-white text-3xl"
          />
        </button>
      </div>
      <AnimatePresence>{showMenu && <MobileMenuRecords />}</AnimatePresence>
    </>
  )
}

export default ContentHeader
