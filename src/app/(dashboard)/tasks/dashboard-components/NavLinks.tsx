"use client"

import React, { useEffect, useState } from "react"
import { FaRegTrashAlt } from "react-icons/fa"
// import { useAppContext } from "@/app/context/AppContext"
import ConfirmationModal from "./DeleteTasks"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { FiPlus } from "react-icons/fi"
import { routes } from "@/lib/utils"
import { IRoutes } from "@/lib/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { TaskForm } from "@/app/(dashboard)/tasks/dashboard-components/TaskForm"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { AddTaskForm } from "@/app/(dashboard)/tasks/dashboard-components/AddTaskForm"
import { usePathname } from "next/navigation"

interface Iuser {
  _id: string
  email: string
  name: string
}
const SideBarLinks = () => {
  // const router = useRouter()
  // const params = useParams()
  // console.log(params)

  const [openModal, setOpenModal] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)
  const [users, setUsers] = useState<Iuser[] | []>([])
  const pathname = usePathname()
  const path = pathname.split("/")[2]
  // console.log(pathname)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users")
        const data = await response.json()
        setUsers(data.user)
      } catch (error) {
        console.log(error)
        setUsers([])
      }
    }
    fetchUsers()
  }, [])
  // console.log(users)

  return (
    <>
      <div className="  flex flex-col gap-y-[0.35rem] px-6">
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetTrigger asChild>
            <button className=" bg-indigo-600 hover:bg-indigo-900 duration-200 ease-linear rounded-sm text-white mt-4  text-center py-1 mx-7">
              Add Task
            </button>
          </SheetTrigger>
          <AddTaskForm onClose={setOpenSheet} users={users} />
        </Sheet>
        {/* <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="default"
              className=" bg-indigo-900 rounded-sm text-white mt-4  text-center py-1 mx-7"
            >
              Add Task
            </Button>
          </DialogTrigger>
          <TaskForm users={users} />
        </Dialog> */}
        {/* <button className=" bg-indigo-900 rounded-sm text-white mt-4  text-center py-1 mx-7">
          Add Task
        </button> */}
        <div className=" space-y-3">
          {routes.map((route: IRoutes, index: number) => (
            <div
              key={route.name}
              className=" flex  flex-col items-center justify-center text-[0.85rem] mt-4"
            >
              <Link
                href={`/tasks/${route.path}`}
                className={`${
                  route.path === path
                    ? "bg-gradient-to-l from-gray-700 via-slate-500 to-gray-600 text-white"
                    : ""
                } rounded-full bg-gradient-to-r from-gray-500 via-slate-200 to-gray-300 transition-all duration-500 ease-in-out hover:transition-all hover:duration-500 hover:ease-in-out hover:bg-gradient-to-l hover:from-gray-400 hover:via-slate-200 hover:to-gray-200 hover:text-slate-600 px-5 py-1`}
              >
                {route.name}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {openModal && (
        <ConfirmationModal
          modalState={openModal}
          // conversationId={conversationId!}
          setOpenModalFxn={setOpenModal}
          // handleDeleteConversation={handleDeleteConversation}
        />
      )}
    </>
  )
}

export default SideBarLinks
