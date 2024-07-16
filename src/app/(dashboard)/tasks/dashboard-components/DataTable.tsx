"use client"
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ITasks } from "@/lib/types"
import { format } from "date-fns"
import { useState } from "react"
import Pagination from "./Pagination"
import Link from "next/link"
import TriggerActions from "./TriggerActions"

export function AllTasks({
  tasks,
  title = "All Task",
}: {
  title: string
  tasks: ITasks[]
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 4
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = tasks?.slice(startIndex, endIndex)

  function shortenDescription(str: string, maxWords = 4) {
    const words = str.split(" ") // Split the string into an array of words
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "..." // Take the first 10 words, join them back together, and add "..."
    }
    console.log(str, words)
    return str // If the string is already less than 10 words, return it as is
  }

  // console.log(paginatedData)
  // console.log(tasks)
  return (
    <div className="flex min-h-screen w-full flex-col  bg-muted/40 ">
      <div className="flex flex-col sm:gap-4 sm:py-4 ">
        <main className=" sm:px-3 sm:py-0 md:gap-8">
          <div className="flex items-center mb-4">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background  sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-0">
              <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
              </div>
            </header>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-7 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
            </div>
          </div>

          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle className=" text-[1rem]">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className=" text-[0.8rem]  ">
                    <TableHead>Task Title</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Description
                    </TableHead>
                    <TableHead>Status</TableHead>
                    {/* <TableHead className="hidden md:table-cell">
                      Total Sales
                    </TableHead> */}
                    <TableHead className="hidden md:table-cell">
                      Due Date
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="">
                  {paginatedData?.map((task) => (
                    <TableRow className=" text-[0.7rem]" key={task._id}>
                      <TableCell className="font-medium ">
                        {task?.title}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {shortenDescription(task?.description)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${
                            task?.status === "Open"
                              ? "bg-[#706ee2]"
                              : task?.status === "In Progress"
                              ? "bg-[#6a97f3]"
                              : task?.status === "Completed"
                              ? "bg-[#008000]"
                              : null
                          } text-white`}
                        >
                          {task?.status}
                        </Badge>
                      </TableCell>
                      {/* <TableCell className="hidden md:table-cell">
                          $499.99
                        </TableCell> */}
                      <TableCell className="hidden md:table-cell">
                        {format(task?.dueDate, "PPP")}
                      </TableCell>
                      <TableCell className=" py-2">
                        {title === "All Task" ||
                        title === "Task Assigned To Me" ? (
                          <Link
                            href={`/tasks/all-task/${task?._id}`}
                            className=" bg-gradient-to-r  from-[hsl(251,82%,67%)] via-purple-500 to-[#8b81f7e1] text-[0.7rem] py-1  flex items-center justify-center px-2 rounded-full  text-center text-white hover:bg-purple-500 hover:transition hover:from-purple-400 hover:via-purple-500 hover:to-purple-100 duration-700 ease-out"
                          >
                            View More
                          </Link>
                        ) : (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <TriggerActions id={task?._id} />
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {tasks?.length === 0 && (
                <div className=" text-[1rem] mt-4 ">
                  <p className="font-medium text-center">
                    No task at the moment
                  </p>
                </div>
              )}
              {!tasks && (
                <div className=" text-[1rem] mt-4 ">
                  <p className="font-medium text-center">
                    No task at the moment
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className=" flex items-end justify-end mt-4">
              {paginatedData && paginatedData?.length !== 0 && (
                <Pagination
                  totalItems={tasks?.length!}
                  itemsPerPage={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}
