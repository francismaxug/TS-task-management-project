import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import { useRouter } from "next/navigation"

const formSchema = z.object({
  title: z.string().min(3, {
    message: "title must be at least 3 characters.",
  }),
  assignedTo: z.string().min(3, {
    message: "please select a person responsible.",
  }),
  priority: z.string().min(3, {
    message: "please select priority level.",
  }),
  status: z.string().min(3, {
    message: "please select task status.",
  }),
  startDate: z.date({
    required_error: "start date is required.",
  }),
  dueDate: z.date({
    required_error: "end date is required.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(160, {
      message: "Destription must not be longer than 160 characters.",
    }),
})

interface Iuser {
  _id: string
  email: string
  name: string
}

export function TaskForm({ users }: { users: Iuser[] | [] }) {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      assignedTo: "",
    },
  })

  console.log(form.formState.isSubmitting)
  function showToast() {
    toast.success("Task Created Successfully")
  }
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        toast.error("error creating new task")
        return
      }
      // window.location.href = window.location.href
      // setTimeout(showToast, 350)
      setTimeout(() => {
        toast.success("Task Created Successfully")
        setTimeout(() => {
          window.location.reload()
        }, 1000) // Delay the navigation by 1 second (adjust as needed)
      }, 550)

      // window.location.reload()
    } catch (error) {
      console.log(error)
    } finally {
      // router.push("/tasks/all-task")
    }
  }
  return (
    <>
      <DialogContent className="sm:max-w-lg">
        <div className="">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-gray-500 text-[0.75rem]">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Task title" {...field} />
                    </FormControl>
                    <FormMessage />
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
                        <SelectValue className="" placeholder="Select a user" />
                      </SelectTrigger>
                      <SelectContent className=" text-xs">
                        <SelectGroup>
                          <SelectLabel>Users</SelectLabel>
                          {users?.map((user: Iuser) => (
                            <SelectItem key={user._id} value={user._id}>
                              {user.name}
                            </SelectItem>
                          ))}
                          {/* <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem> */}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {/* <Input placeholder="Task title" {...field} /> */}

                    <FormMessage />
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
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-3 w-3 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto -mt-0 p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
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
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-3 w-3 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto -mt-0 p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
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
                          <SelectValue className="" placeholder="priority" />
                        </SelectTrigger>
                        <SelectContent className=" text-xs">
                          <SelectGroup>
                            {/* <SelectLabel>Users</SelectLabel> */}
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {/* <Input placeholder="Task title" {...field} /> */}

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className=" text-gray-500 text-[0.75rem]">
                        status
                      </FormLabel>

                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-[100%]">
                          <SelectValue className="" placeholder="status" />
                        </SelectTrigger>
                        <SelectContent className=" text-xs">
                          <SelectGroup>
                            {/* <SelectLabel>Users</SelectLabel> */}
                            <SelectItem value="Open">Open</SelectItem>
                            <SelectItem value="In Progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {/* <Input placeholder="Task title" {...field} /> */}

                      <FormMessage />
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
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" flex gap-x-3 items-center">
                <DialogFooter>
                  <DialogClose asChild>
                    <button className="bg-gradient-to-r from-gray-500 via-slate-200 to-gray-300  py-1 px-2 rounded-full ">
                      <p className="  text-[0.85rem] px-1"> Cancel</p>
                    </button>
                  </DialogClose>
                </DialogFooter>
                <button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className="bg-gradient-to-r  from-[hsl(251,82%,67%)] via-purple-500 to-[#8b81f7e1] relative before:w-0 before:hover:w-full before:duration-300 before:hover:bg-[hsl(251,82%,67%)] before:absolute text-white before:bg-opacity-30 before:inset-0 before:z-10 before:transition-all py-1 px-2 rounded-full before:rounded-full"
                >
                  <p className=" relative z-30 text-[0.85rem] px-1 flex items-center justify-center gap-x-2 text-center">
                    {form.formState.isSubmitting ? (
                      <Loader2 className=" animate-spin" />
                    ) : null}
                    Create Task
                  </p>
                </button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </>
  )
}
