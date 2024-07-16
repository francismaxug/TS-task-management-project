"use client"
import React from "react"
import { TiArrowBackOutline } from "react-icons/ti"
import { useRouter } from "next/navigation"

const GoBack = () => {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className=" flex items-center gap-x-1 text-[0.9rem] pl-3 underline group hover:text-green-600"
    >
      <TiArrowBackOutline className=" group-hover:text-green-600" />
      <p className=" group-hover:text-green-600">Back</p>
    </button>
  )
}

export default GoBack
