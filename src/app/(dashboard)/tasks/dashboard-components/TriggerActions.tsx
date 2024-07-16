"use clent"
import React, { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import { EditTask } from "./EditTaskForm"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { Iuser } from "@/lib/types"

const TriggerActions = ({ id }: { id: string }) => {
  const [users, setUsers] = useState<Iuser[] | []>([])
  const [openSheet, setOpenSheet] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users")
        const data = await response.json()
        setUsers(data.user)
      } catch (error) {
        console.log(error)
        setUsers([])
      }
    }
    fetchUsers()
  }, [])
  console.log(users)
  const router = useRouter()
  const handleDeleteTask = async (id: string) => {
    try {
      confirm("Are you sure you want to delete this task?")
      if (!confirm) return
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/tasks/${id}`,
        {
          method: "DELETE",
        }
      )

      if (!res.ok) toast.error("Failed to delete task")
      const data = await res.json()
      router.push("/tasks/task-created-by-me")
      console.log(data)
      toast.success(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem>
        <Link href={`/tasks/all-task/${id}`}> View More</Link>
      </DropdownMenuItem>
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetTrigger asChild>
          <button className="w-full">Edit</button>
        </SheetTrigger>
        <EditTask id={id} users={users} onClose={setOpenSheet} />
      </Sheet>
      <DropdownMenuItem>
        <button
          onClick={() => {
            handleDeleteTask(id)
          }}
        >
          {" "}
          Delete
        </button>
      </DropdownMenuItem>
    </>
  )
}

export default TriggerActions
