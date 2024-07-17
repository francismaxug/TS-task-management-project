import React from "react"
import Image from "next/image"

interface Iuser {
  id?: string
  name: string
  email: string
}
const UserInfo = ({ user }: { user: Iuser }) => {
  return (
    <div className=" flex items-center gap-x-2">
      <Image
        src={"/images/pro.jpg"}
        alt=""
        width={1000}
        height={1000}
        className=" size-10 rounded-full"
      />
      <div className="text-[0.75rem] 2xl:text-[0.85rem] 3xl:text-[1rem]">
        <p className=" font-bold">{user?.name}</p>
        <p>{user?.email}</p>
      </div>
    </div>
  )
}

export default UserInfo
