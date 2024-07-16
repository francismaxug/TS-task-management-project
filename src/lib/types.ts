import mongoose, { Document, Types, models } from "mongoose"

export interface IRoutes {
  name: string
  path: string
}
export interface Iuser {
  _id: string
  email: string
  name: string
}
export interface ITaskStats {
  status: string
  stats: {
    completed: number
    open: number
    inProgress: number
    overdue: number
    total: number
  }
}
export interface ITasks {
  _id: string
  title: string
  description: string
  startDate: string
  dueDate: string
  status: string
  assignedTo: { _id: string; name: string }
  priority: string
  createdBy: { _id: string; name: string }
}
export interface ITaskSchema
  extends Omit<
      ITasks,
      "assinedTo" | "createdBy" | "_id" | "startDate" | "dueDate"
    >,
    Document {
  startDate: Date
  dueDate: Date
  assinedTo: Types.ObjectId
  createdBy: Types.ObjectId
}
export interface IUserSchema extends Document {
  name: string
  email: string
  password: string
  comparePassword(candidatePassword: string): Promise<boolean>
}
