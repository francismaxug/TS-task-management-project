import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { IRoutes } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const routes: IRoutes[] = [
  {
    name: "Overview",
    path: "tasks/overview",
  },
  {
    name: "All Task",
    path: "tasks/all-task",
  },
  {
    name: "Assigned To Me",
    path: "tasks/task-assign-to-me",
  },
  {
    name: "Created By Me",
    path: "tasks/task-created-by-me",
  },
]
