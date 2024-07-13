"use client"

import React, { useState } from "react"
import Loading from "./Loading"
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
import { TaskForm } from "@/components/TaskForm"

const SideBarLinks = () => {
  // const router = useRouter()
  // const params = useParams()
  // console.log(params)

  const [openModal, setOpenModal] = useState(false)

  const handleDeleteConversation = () => {}

  return (
    <>
      <div className="  flex flex-col gap-y-[0.35rem] px-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="default"
              className=" bg-indigo-900 rounded-sm text-white mt-4  text-center py-1 mx-7"
            >
              Add Task
            </Button>
          </DialogTrigger>
          <TaskForm />
        </Dialog>
        {/* <button className=" bg-indigo-900 rounded-sm text-white mt-4  text-center py-1 mx-7">
          Add Task
        </button> */}
        <div className=" space-y-2">
          {routes.map((route: IRoutes, index: number) => (
            <div
              key={route.name}
              className=" flex  flex-col items-center justify-center"
            >
              <Link href={`/${route.path}`}>{route.name}</Link>
            </div>
          ))}
        </div>
      </div>

      {openModal && (
        <ConfirmationModal
          modalState={openModal}
          // conversationId={conversationId!}
          setOpenModalFxn={setOpenModal}
          handleDeleteConversation={handleDeleteConversation}
        />
      )}
    </>
  )
}

export default SideBarLinks
