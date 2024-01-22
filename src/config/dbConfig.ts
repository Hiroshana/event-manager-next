import { log } from "console";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || "");
    log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
