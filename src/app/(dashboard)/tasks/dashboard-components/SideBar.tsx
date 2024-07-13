import SideBarLinks from "./NavLinks"
import Image from "next/image"
import { getSession } from "@/app/actions/auth"
import { redirect } from "next/navigation"

interface Iuser {
  user: {
    id?: string
    name: string
    email: string
  }
}

const SideBar = async () => {
  const data: Iuser = await getSession()
  if (!data) {
    redirect("/")
  }
  const { user } = data

  // console.log(user)
  return (
    <aside
      className={`fixed top-14  z-30 bottom-3 hidden lg:block 
      lg:w-[300px] w-0 lg:left-24 xl:left-32 3xl:w-[350px] 3xl:left-28 4xl:w-[400px]
          bg-white  `}
    >
      <div className="absolute w-full  h-full  flex flex-col gap-y-2 scrollbar-thump scrollbar-thin scrollbar-webkit overflow-y-auto overflow-x-clip ">
        <div className=" border bg-topNav flex justify-between items-center py-[0.4rem] 3xl:py-[0.9rem] lg:text-[0.85rem] text-white px-2 rounded ">
          <div className=" flex items-center gap-x-2">
            <Image
              src={"/images/pro.jpg"}
              alt=""
              width={1000}
              height={1000}
              className=" size-10 rounded-full"
            />
            <div className="text-[0.75rem]">
              <p>{user.name}</p>
              <p>{user.email}</p>
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
