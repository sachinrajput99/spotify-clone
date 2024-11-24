import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true },
    fullName: { type: String, required: true },
    imageUrl: { type: String },
    clerkUrl: { type: String },
    
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
