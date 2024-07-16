"use client"
import React from "react"
import { ITaskStats } from "@/lib/types"
import BarChartt from "./BarChart"
import { PieChartt } from "./PieChart"

const Charts = ({ data }: { data: ITaskStats }) => {
  return (
    <div className="border-2 border-dashed border-l-purple-400 border-r-[#8b81f7e1] border-t-[hsl(251,82%,67%)] border-b-purple-600  flex md:items-end gap-x-4 flex-col md:flex-row items-center gap-y-3 md:gap-y-0 justify-between bg-white rounded-lg  dark:border-gray-600 h-auto mb-4 py-6 px-4">
      <BarChartt data={data} />
      <PieChartt data={data} />
    </div>
  )
}

export default Charts
