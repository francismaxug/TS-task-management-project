import React, { useState, useEffect } from "react"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

const Pagination = ({
  color = "white",
  totalItems,
  itemsPerPage,
  currentPage: propCurrentPage,
  onPageChange,
}: {
  color?: string
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
}) => {
  const [currentPage, setCurrentPage] = useState(propCurrentPage)

  useEffect(() => {
    setCurrentPage(propCurrentPage)
  }, [propCurrentPage])

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1
      setCurrentPage(newPage)
      onPageChange(newPage)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1
      setCurrentPage(newPage)
      onPageChange(newPage)
    }
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className={`my-3 flex items-center justify-center `}>
      <button onClick={handlePrev} disabled={currentPage === 1}>
        <IoIosArrowBack
          strokeWidth={1}
          className={`h-4 w-4 ${currentPage === 1 ? "text-gray-400" : ""}`}
        />
      </button>
      {/* <button onClick={handlePrev} disabled={currentPage === 1}>
        Previous
      </button> */}
      <span style={{ margin: "0 15px" }} className="text-[0.85rem]">
        Page {currentPage} of {totalPages} ({startItem}-{endItem} of{" "}
        {totalItems})
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        <IoIosArrowForward
          strokeWidth={1}
          className={`h-4 w-4 ${
            currentPage === totalPages ? "text-gray-400" : ""
          }`}
        />
      </button>
      {/* <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button> */}
    </div>
  )
}

export default Pagination
