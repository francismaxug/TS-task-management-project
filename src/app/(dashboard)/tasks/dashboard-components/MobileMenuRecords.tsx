import React from "react"
import { motion } from "framer-motion"
import SideBarLinks from "./NavLinks"
import { FiPlus } from "react-icons/fi"
import UserInfo from "./UserInfo"
interface Iuser {
  id?: string
  name: string
  email: string
}

const MobileMenuRecords = ({ user }: { user: Iuser }) => {
  return (
    <motion.div
      initial={{ x: "-60vw", opacity: 1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      exit={{ x: "-60vw", opacity: 1, transition: { duration: 0.7 } }}
      className=" w-56 sm:w-60 flex gap-y-2 bg-white fixed z-50 top-[0.05rem] h-screen sm:h-[79vh]  lg:hidden overflow-y-auto overflow-x-clip   "
    >
      <div className="absolute w-full  h-full  flex flex-col gap-y-2 scrollbar-thump scrollbar-thin scrollbar-webkit overflow-y-auto overflow-x-clip  ">
        <div className=" bg-topNav flex justify-between  items-center py-[0.8rem] sm:py-[0.5rem] lg:py-1 text-[0.85rem] text-white px-2 lg:rounded ">
          <UserInfo user={user} />
        </div>

        <div
          className={`duration-300 border bg-leftSideBar h-full shadow-lg rounded`}
        >
          <SideBarLinks />
        </div>
      </div>
    </motion.div>
  )
}

export default MobileMenuRecords
