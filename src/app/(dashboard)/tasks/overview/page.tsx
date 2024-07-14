"use client"
import React from "react"
import ContentHeader from "../dashboard-components/ContentHeader"
import MainPage from "../page"

const Analytics = () => {
  return (
    <div className=" bg-[#F1F2F2]">
      <ContentHeader />
      <div className=" px-2 py-3">
        <div className="grid  grid-cols-1  sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <div className="border-2 bg-blue-500  border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-24">
            Grid
          </div>
          <div className="border-2 bg-blue-500 border-dashed  rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-24">
            Grid
          </div>
          <div className="border-2 bg-blue-500 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-24">
            Grid
          </div>
          <div className="border-2 border-dashed bg-white rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-24">
            Grid
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
