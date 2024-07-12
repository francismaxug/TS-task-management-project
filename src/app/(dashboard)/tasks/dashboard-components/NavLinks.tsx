"use client"

import React, { useState } from "react"
import Loading from "./Loading"
import { FaRegTrashAlt } from "react-icons/fa"
// import { useAppContext } from "@/app/context/AppContext"
import ConfirmationModal from "./DeleteTasks"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { FiPlus } from "react-icons/fi"

const SideBarLinks = () => {
  const router = useRouter()
  const params = useParams()
  // console.log(params)

  const [openModal, setOpenModal] = useState(false)
  // const [conversationId, setConversationId] = useState<number | null>(null)

  // console.log(onConfirm)
  // console.log(conversationId)
  const handleDeleteConversation = () => {}

  return (
    <>
      <div className="  flex flex-col gap-y-[0.35rem]"></div>

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
