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
