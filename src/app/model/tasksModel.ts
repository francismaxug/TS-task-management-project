import mongoose, { Document, Types, models } from "mongoose"

export interface ITask extends Document {
  title: string
  description: string
  startDate: Date
  dueDate: Date
  status: string
  assinedTo: Types.ObjectId
  priority: string,
  createdBy: Types.ObjectId
}
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date },
  dueDate: { type: Date },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Completed"],
    default: "Open",
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
})
const Task = models.Task ?? mongoose.model<ITask>("Task", taskSchema)
export default Task
