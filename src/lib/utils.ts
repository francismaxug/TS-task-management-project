import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { IRoutes } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const routes: IRoutes[] = [
  {
    name: "Overview",
    path: "overview",
  },
  {
    name: "All Task",
    path: "all-task",
  },
  {
    name: "Assigned To Me",
    path: "task-assign-to-me",
  },
  {
    name: "Created By Me",
    path: "task-created-by-me",
  },
]
