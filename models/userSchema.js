import mongoose from "mongoose";

import { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
    minLength: [5, "Name must be at least 5 letters"],
    maxLength: [50, "Name must not exceed 50 letters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  forgotPasswordToken: String,
  forgotPasswordExpirt: Date,
}, { timestamps: true });


export const userModel = mongoose.model('user' , userSchema)