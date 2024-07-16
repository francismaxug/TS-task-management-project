import React from "react"
import Image from "next/image"
import { ITaskStats } from "@/lib/types"
const Card = ({ data }: { data: ITaskStats }) => {
  return (
    <div className="grid  grid-cols-1  sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      <div className="bg-gradient-to-r  from-[hsl(211,100%,75%)] via-blue-500 to-[#2495ebe1]  border border-gray-300  dark:border-gray-600 h-32 md:h-24 rounded-lg rounded-tr-[40px] rounded-bl-[50px] shadow-sm px-4 py-2 hover:shadow-md hover:cursor-pointer">
        <div className=" flex items-start  justify-between">
          <div className=" flex flex-col ">
            <p className=" text-[1.4rem] font-semibold">{data.stats.total}</p>
            <p className=" text-[0.84rem] text-white">
              Total <br /> Task
            </p>
          </div>

          <Image
            src="/images/all-task.svg"
            alt="revenue"
            width={1000}
            height={1000}
            className=" w-10 h-10"
          />
        </div>{" "}
      </div>
      <div className="bg-gradient-to-r  from-[hsl(251,82%,67%)] via-purple-500 to-[#8b81f7e1]  border border-gray-300  dark:border-gray-600 h-32 md:h-24 rounded-lg rounded-tr-[40px] rounded-bl-[50px] shadow-sm px-4 py-2 hover:shadow-md hover:cursor-pointer">
        <div className=" flex items-start  justify-between">
          <div className=" flex flex-col ">
            <p className=" text-[1.4rem] font-semibold text-orange-400">
              {data.stats.inProgress}
            </p>
            <p className=" text-[0.84rem] text-white">Task In Progress</p>
          </div>
          <Image
            src="/images/in-progress.svg"
            alt="revenue"
            width={1000}
            height={1000}
            className=" w-9 h-9"
          />
        </div>{" "}
      </div>
      <div className="bg-gradient-to-r  from-[hsl(211,100%,75%)] via-blue-500 to-[#2495ebe1]  border border-gray-300  dark:border-gray-600 h-32 md:h-24 rounded-lg rounded-tr-[40px] rounded-bl-[50px] shadow-sm px-4 py-2 hover:shadow-md hover:cursor-pointer">
        <div className=" flex items-start  justify-between">
          <div className=" flex flex-col ">
            <p className=" text-[1.4rem] font-semibold">
              {data.stats.completed}
            </p>
            <p className=" text-[0.84rem] text-white">Task Completed</p>
          </div>

          <Image
            src="/images/task-completed.svg"
            alt="revenue"
            width={1000}
            height={1000}
            className=" w-10 h-10"
          />
        </div>{" "}
      </div>
      <div className="bg-gradient-to-r  from-[hsl(251,82%,67%)] via-purple-500 to-[#8b81f7e1]  border border-gray-300  dark:border-gray-600 h-32 md:h-24 rounded-lg rounded-tr-[40px] rounded-bl-[50px] shadow-sm px-4 py-2 hover:shadow-md hover:cursor-pointer">
        <div className=" flex items-start  justify-between">
          <div className=" flex flex-col ">
            <p className=" text-[1.4rem] font-semibold text-orange-400">{data.stats.overdue}</p>
            <p className=" text-[0.84rem] text-white">
              Task <br /> Overdue
            </p>
          </div>

          <Image
            src="/images/overdue-tasks.svg"
            alt="revenue"
            width={1000}
            height={1000}
            className=" w-12 h-12"
          />
        </div>{" "}
      </div>
    </div>
  )
}

export default Card
