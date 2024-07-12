import mongoose from "mongoose"

console.log("MONGO_URL", process.env.MONGO_URL)
const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!)

    console.log("MongoDB Connected")
  } catch (error) {
    console.log("Error connecting to MongoDB", error)
  }
}

export default ConnectDB
