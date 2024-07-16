import { z } from "zod"

export const formSchema = z.object({
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
