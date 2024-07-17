This is a [Next.js](https://nextjs.org/) project with TypeScript (Fullstack NextjsApp)

## Clone Repository

git clone https://github.com/francismaxug/TS-task-management-project.git
cd TS-task-management-project

## Install dependencies

npm install

## Configure Environment Variables

Create a .env file at the root of the project with the following content:

NEXT_PUBLIC_API_DOMAIN=http://localhost:3000/api
NEXT_PUBLIC_DOMAIN=http://localhost:3000
SECRET_KEY = mysecrete
DATABASE_URL = ""

## Run the project

npm run dev

![My Project Screenshot](/images/Screenshot (890).png)

## Project structure
This Fulstack Task management application was build with Nextjs.
## 2. Technologies Used
* **Nextjs:**  A React Framwork.
* **Mongoose:**  Object Data Modeling (ODM) for MongoDB.
* **MongoDB:**  NoSQL database.
* **JWT (JSON Web Tokens):**  Used for user authentication.
* **TypeScript:**  For improved type safety and code maintainability.
* **Framer Motion:**  An animation libary that enhances user experience.
* **ZOD:**  For validating inputs to ensure data intergrity.
* **REACT-HOOK-FORM:**  For form submissions.
* **Date-fns:**  For formating Dates.


##  Database Schema
### 1. User
```typeScript
// model/userModel.ts
import mongoose, { Schema, model, models } from "mongoose"
import bcrypt from "bcryptjs"
import { IUserSchema } from "@/lib/types"

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

UserSchema.pre<IUserSchema>("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password as string, salt)
  next()
})
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}
const User = models.User ?? model<IUserSchema>("User", UserSchema)
export default User

```

### 2. Task
```typeScript
// model/userModel.ts
import mongoose, { models } from "mongoose"
import { ITaskSchema } from "@/lib/types"

const taskSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
)
const Task = models.Task ?? mongoose.model<ITaskSchema>("Task", taskSchema)
export default Task


```



