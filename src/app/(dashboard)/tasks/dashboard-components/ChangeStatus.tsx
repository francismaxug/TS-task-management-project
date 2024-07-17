"use client"
import React from "react"
import { Loader2 } from "lucide-react"

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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  status: z
    .string({
      required_error: "please select task status.",
    })
    .min(3, {
      message: "task status must be 3 characters or more.",
    }),
})
export function ChangeStatus({ id }: { id: string }) {
  const router = useRouter()
  console.log(id)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/tasks/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )

      if (!res.ok) {
        toast.error("error updating task status")
        return
      }
      toast.success("Task status Updated Successfully")
      router.push("/tasks/task-assign-to-me")

      form.reset()
    } catch (error) {
      console.log(error)
    } finally {
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-3 items-center py-7 pl-4 text-[0.85rem] 2xl:text-[1rem] 3xl:text-[1.2rem]"
      >
        <p className="font-semibold">Change Status To:</p>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className=" bg-gradient-to-r  from-[hsl(251,82%,67%)] via-purple-500 to-[#8b81f7e1] text-[0.7rem] py-1  flex items-center justify-center px-4 rounded-full  text-center text-white gap-x-1  2xl:text-[0.9rem] 3xl:text-[1rem]"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className=" animate-spin" />
          ) : null}
          Update
        </button>
      </form>
    </Form>
  )
}
