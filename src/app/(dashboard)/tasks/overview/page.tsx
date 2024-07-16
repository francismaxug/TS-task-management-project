import React from "react"
import ContentHeader from "../dashboard-components/ContentHeader"
import MainPage from "../page"
import Image from "next/image"

async function getTasks() {
  try {
    const res = await fetch("http://localhost:3000/api/tasks/task-stats", {
      cache: "no-cache",
    })
    if (!res.ok) {
      return
    }
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
const Analytics = async () => {
  const data = await getTasks()
  console.log(data)
  return (
    <div className=" bg-[#F1F2F2]">
      <ContentHeader />
      <div className=" px-2 py-3">
        <div className="grid  grid-cols-1  sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r  from-[hsl(211,100%,75%)] via-blue-500 to-[#2495ebe1]  border border-gray-300  dark:border-gray-600 h-32 md:h-24 rounded-lg rounded-tr-[40px] rounded-bl-[50px] shadow-sm px-4 py-2 hover:shadow-md hover:cursor-pointer">
            <div className=" flex items-start  justify-between">
              <div className=" flex flex-col ">
                <p className=" text-[1.4rem] font-semibold">8</p>
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
                  8
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
                <p className=" text-[1.4rem] font-semibold">8</p>
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
          <div className="bg-gradient-to-r  from-[hsl(211,100%,75%)] via-blue-500 to-[#2495ebe1]  border border-gray-300  dark:border-gray-600 h-32 md:h-24 rounded-lg rounded-tr-[40px] rounded-bl-[50px] shadow-sm px-4 py-2 hover:shadow-md hover:cursor-pointer">
            <div className=" flex items-start  justify-between">
              <div className=" flex flex-col ">
                <p className=" text-[1.4rem] font-semibold">8</p>
                <p className=" text-[0.84rem] text-white">
                  Task <br /> Overdue
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
        </div>
        <div className="border-2 border-dashed bg-white rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4 px-4">
          Grid
        </div>
      </div>
    </div>
  )
}

export default Analytics
