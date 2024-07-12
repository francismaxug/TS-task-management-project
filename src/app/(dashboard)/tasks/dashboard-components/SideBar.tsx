"use client"
import { FiPlus } from "react-icons/fi"

import SideBarLinks from "./NavLinks"
import Image from "next/image"
import { getSession } from "@/app/actions/auth"
import { useEffect } from "react"

const SideBar = () => {
  useEffect(() => {
    async function g() {
      const r = await getSession()
      console.log(r)
    }
    g()
  }, [])
  // const pro = await getSession()
  // console.log(pro)
  return (
    <aside
      className={`fixed top-14  z-30 bottom-3 hidden lg:block 
      lg:w-[300px] w-0 lg:left-24 xl:left-32 3xl:w-[350px] 3xl:left-28 4xl:w-[400px]
          bg-white  `}
    >
      <div className="absolute w-full  h-full  flex flex-col gap-y-2 scrollbar-thump scrollbar-thin scrollbar-webkit overflow-y-auto overflow-x-clip ">
        <div className=" border bg-topNav flex justify-between items-center py-[0.4rem] 3xl:py-[0.9rem] lg:text-[0.85rem] text-white px-2 rounded ">
          <div className=" flex items-center">
            <Image
              src={"/images/pro.jpg"}
              alt=""
              width={1000}
              height={1000}
              className=" size-10 rounded-full"
            />
            <div>
              <p>Hello</p>
              <p>Hyy</p>
            </div>
          </div>
        </div>
        <div
          className={`duration-300 border bg-leftSideBar h-full shadow-lg rounded`}
        >
          <SideBarLinks />
        </div>
      </div>
    </aside>
  )
}

export default SideBar
