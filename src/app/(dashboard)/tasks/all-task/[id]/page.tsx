import React, { Suspense } from "react"
import LoadingMessages from "../../loading"
import { formatDateTime } from "@/lib/helper"
import ContentHeader from "../../dashboard-components/ContentHeader"
import { ITasks } from "@/lib/types"
import { format } from "date-fns"
import { getSession } from "@/app/actions/auth"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { TiArrowBackOutline } from "react-icons/ti"
import GoBack from "../../dashboard-components/GoBack"

async function getATask(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`,
      {
        cache: "no-cache",
      }
    )
    if (!res.ok) {
      return
    }
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const SingleTask = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const data: ITasks = await getATask(params.id)
  // console.log(data)
  // console.log(params?.id)

  const user = await getSession()
  console.log(user)
  return (
    <div className="">
      <ContentHeader />
      <GoBack />

      {/* <Link
        href="/tasks/all-task"
        className=" flex items-center gap-x-1 text-[0.9rem] pl-3 underline group hover:text-green-600"
      >
        <TiArrowBackOutline className=" group-hover:text-green-600" />
        <p className=" group-hover:text-green-600">Back</p>
      </Link> */}
      <div className=" flex flex-col sm:flex-row  items-start mx-4 gap-x-2 font-semibold text-black/70 mt-4 bg-white rounded-lg py-6 ">
        <div className="px-4 border-r-0 sm:border-r-2 pr-9  space-y-3">
          <div>
            <h1>Task Title</h1>
            <p className=" text-[0.9rem] font-normal">{data?.title}</p>
          </div>
          <div>
            <h1>Priority</h1>
            <p
              className={`${
                data?.priority === "Medium"
                  ? "text-[rgb(255,187,128)]"
                  : data?.priority === "Low"
                  ? "text-[#6eb9de]"
                  : data?.priority === "High"
                  ? "text-[#FFA500]"
                  : null
              } text-[0.9rem] font-normal`}
            >
              {data?.priority}
            </p>
          </div>
          <div>
            <h1>Status</h1>
            <p
              className={`${
                data?.status === "Open"
                  ? "text-[#706ee2]"
                  : data?.status === "In Progress"
                  ? "text-[#6a97f3]"
                  : data?.status === "Completed"
                  ? "text-[#008000]"
                  : null
              } text-[0.9rem] font-normal`}
            >
              {data?.status}
            </p>
          </div>
          <div>
            <h1>Task Start Date</h1>
            <p className="text-[0.9rem] font-normal">
              {format(data?.startDate, "PPPPp")}
            </p>
          </div>
          <div>
            <h1>Task Due Date</h1>
            <p className="text-[0.9rem] font-normal">
              {format(data?.dueDate, "PPPPp")}
            </p>
          </div>
          <div>
            <h1>Assigned To</h1>
            <p className="text-[0.9rem] font-normal">
              {user?.user?.id === data?.assignedTo?._id
                ? "Me"
                : data?.assignedTo?.name}
            </p>
          </div>
          <div>
            <h1>Created By</h1>{" "}
            <p className="text-[0.9rem] font-normal">
              {user?.user?.id === data?.createdBy?._id
                ? "Me"
                : data?.createdBy?.name}
            </p>
          </div>
        </div>

        <div className=" px-4">
          <h1>Description</h1>
          <p className="text-[0.9rem] font-normal">{data.description}</p>
        </div>
      </div>
    </div>
  )
}

export default SingleTask
