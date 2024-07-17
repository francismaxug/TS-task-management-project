import { z } from "zod"

export const formSchema = z.object({
  title: z
    .string({
      required_error: "please provide a title.",
    })
    .min(3, {
      message: "title must be at least 3 characters.",
    }),
  assignedTo: z
    .string({
      required_error: "this field is required",
    })
    .min(3, {
      message: "please select a person responsible.",
    }),
  priority: z
    .string({
      required_error: "please select priority level.",
    })
    .min(3, {
      message: "please select priority level.",
    }),
  status: z
    .string({
      required_error: "please select task status.",
    })
    .min(3, {
      message: "please select task status.",
    }),
  startDate: z.date({
    required_error: "start date is required.",
  }),
  dueDate: z.date({
    required_error: "end date is required.",
  }),
  description: z
    .string({
      required_error: "this filed is required",
    })
    .min(5, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Destription must not be longer than 500 characters.",
    }),
})
