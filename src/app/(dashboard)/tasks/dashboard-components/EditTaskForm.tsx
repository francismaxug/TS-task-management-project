import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Dialog } from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import { useRouter } from "next/navigation"
import { formSchema } from "@/lib/formSchema"
import { ITasks, Iuser } from "@/lib/types"

export function EditTask({
  id,
  users,
  onClose,
}: {
  id: string
  users: Iuser[] | []
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const router = useRouter()

  console.log(id)
  const [task, setTask] = useState<ITasks | null>(null)
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`
        )
        const data = await response.json()
        // console.log(data)
        setTask(data)
        form.reset({
          title: data.title, // Use the fetched task data
          description: data.description,
          assignedTo: data.assignedTo._id,
          startDate: new Date(data.startDate),
          dueDate: new Date(data.dueDate),
          priority: data.priority,
          status: data.status,
        })
      } catch (error) {
        console.log(error)
        setTask(null)
      }
    }
    fetchTask()
  }, [id])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title,
      description: task?.description,
      assignedTo: task?.assignedTo._id,
      startDate: task?.startDate
        ? new Date(task?.startDate! as string)
        : new Date(),
      dueDate: task?.startDate
        ? new Date(task?.dueDate! as string)
        : new Date(),
      priority: task?.priority,
      status: task?.status,
    },
  })

  // console.log(form.formState.isSubmitting)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        toast.error("error updating task")
        return
      }
      toast.success("Task Updated Successfully")
      router.push("/tasks/all-task")
      onClose(false)

      form.reset()
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  return (
    <SheetContent side={"left"}>
      <SheetHeader>
        <SheetTitle>Edit Task</SheetTitle>
      </SheetHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-gray-500 text-[0.85rem]">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    defaultValue={task?.title}
                    placeholder="Task title"
                    {...field}
                  />
                </FormControl>
                <FormMessage className=" py-0 pb-0 mb-0 h-[0.27rem]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="assignedTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-gray-500 text-[0.75rem]">
                  Assign To
                </FormLabel>

                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="w-[100%]">
                    <SelectValue
                      className=""
                      defaultValue={
                        form.getValues("assignedTo")
                          ? form.getValues("assignedTo")
                          : ""
                      }
                      placeholder={
                        task?.assignedTo.name!
                          ? task?.assignedTo.name!
                          : "Select User"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className=" text-xs">
                    <SelectGroup>
                      <SelectLabel>Users</SelectLabel>
                      {users?.map((user: Iuser) => (
                        <SelectItem key={user._id} value={user._id}>
                          {user._id === task?.createdBy._id
                            ? "Myself"
                            : user.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <FormMessage className=" py-0 pb-0 mb-0 h-[0.27rem]" />
              </FormItem>
            )}
          />
          <div className=" flex items-center gap-x-10 justify-between w-full">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col  w-full">
                  <FormLabel className=" text-gray-500 mt-2 text-[0.75rem]">
                    Task Start Date
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[100%] pl-3 text-left font-normal h-3 py-4 border",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>
                              {task?.startDate ? (
                                format(task?.startDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </span>
                          )}
                          <CalendarIcon className="ml-auto h-3 w-3 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto -mt-0 p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage className=" py-0 pb-0 mb-0 h-[0.27rem]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel className=" text-gray-500 mt-3 text-[0.75rem]">
                    Task Due Date
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[100%] pl-3 h-3 py-4 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>
                              {task?.dueDate ? (
                                format(task?.dueDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </span>
                          )}
                          <CalendarIcon className="ml-auto h-3 w-3 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto -mt-0 p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage className=" py-0 pb-0 mb-0 h-[0.27rem]" />
                </FormItem>
              )}
            />
          </div>
          <div className=" flex items-center  gap-x-10 justify-between w-full">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className=" text-gray-500 text-[0.75rem]">
                    Priority
                  </FormLabel>

                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-[100%]">
                      <SelectValue
                        className=""
                        defaultValue={task?.priority! ? task?.priority : ""}
                        placeholder={
                          task?.priority! ? task?.priority : "Select Priority"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className=" text-xs">
                      <SelectGroup>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage className=" py-0 pb-0 mb-0 h-[0.27rem]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className=" text-gray-500 text-[0.75rem]">
                    Status
                  </FormLabel>

                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-[100%]">
                      <SelectValue
                        className=""
                        defaultValue={task?.status! ? task?.status : ""}
                        placeholder={
                          task?.status! ? task.status : "Select Status"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className=" text-xs">
                      <SelectGroup>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage className=" py-0 pb-0 mb-0 h-[0.27rem]" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-gray-500 text-[0.75rem]">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    defaultValue={task?.description || ""}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className=" py-0 pb-0 mb-0 h-[0.27rem]" />
              </FormItem>
            )}
          />
          <div className=" flex gap-x-3 items-center">
            <SheetFooter>
              <SheetClose asChild>
                <button className="bg-gradient-to-r from-gray-500 via-slate-200 to-gray-300  py-1 px-2 rounded-full ">
                  <p className="  text-[0.85rem] px-1"> Cancel</p>
                </button>
              </SheetClose>

              <button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="bg-gradient-to-r  from-[hsl(251,82%,67%)] via-purple-500 to-[#8b81f7e1] relative before:w-0 before:hover:w-full before:duration-300 before:hover:bg-[hsl(251,82%,67%)] before:absolute text-white before:bg-opacity-30 before:inset-0 before:z-10 before:transition-all py-1 px-2 rounded-full before:rounded-full"
              >
                <p className=" relative z-30 text-[0.85rem] px-1 flex items-center justify-center gap-x-2 text-center">
                  {form.formState.isSubmitting ? (
                    <Loader2 className=" animate-spin" />
                  ) : null}
                  Update Task
                </p>
              </button>
            </SheetFooter>
          </div>
        </form>
      </Form>
    </SheetContent>
  )
}
