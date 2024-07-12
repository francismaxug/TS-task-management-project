import React from "react"
import { motion } from "framer-motion"
import AddTaskBtn from "./AddTasks"
import SideBarLinks from "./NavLinks"
import { FiPlus } from "react-icons/fi"

const MobileMenuRecords = () => {
  return (
    <motion.div
      initial={{ x: "-60vw", opacity: 1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      exit={{ x: "-60vw", opacity: 1, transition: { duration: 0.7 } }}
      className=" w-56 sm:w-60 flex gap-y-2 bg-white fixed z-50 top-[0.05rem] h-screen sm:h-[79vh]  lg:hidden overflow-y-auto overflow-x-clip   "
    >
      <div className="absolute w-full  h-full  flex flex-col gap-y-2 scrollbar-thump scrollbar-thin scrollbar-webkit overflow-y-auto overflow-x-clip  ">
        <div className=" bg-topNav flex justify-between  items-center py-[1.13rem] sm:py-[0.86rem] lg:py-1 text-[0.85rem] text-white px-2 lg:rounded ">
          <AddTaskBtn>
            <p className="text-lg">Add Task</p>
            <FiPlus className=" text-white text-2xl lg:text-[1.3rem]" />
          </AddTaskBtn>
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
