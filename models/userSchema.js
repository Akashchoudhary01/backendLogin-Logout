import mongoose from "mongoose";
import JWT from 'jsonwebtoken';
import { Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config(); 

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

userSchema.methods = {
  jwtToken(){
    return JWT.sign(
      {id: this._id , email:this.email},
      process.env.SECRET_KEY,
      {expiresIn : '24h'}
    )
  }
}


export const userModel = mongoose.model('user' , userSchema)