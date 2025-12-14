import mongoose from "mongoose";

import { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        require : [true , "Username is required"],
         minLength: [5, "Name must be at least 5 letters"],
         maxLength: [50, "Name must not exceed 50 letters"],
         trim : true,
    },
    email:{
        type:String,
        require : [true , "email is required"],
        unique : [true],
        lowercase : [true],
        unique : [true , "Already Registered"],
    
    },
    password:{
        type:String,
        require : [true , "password is required"],
        select : [false]
    },
    forgotPasswordToken:{
        type:String,
    },
    forgotPasswordExpirt:{
        type:Date,
    }


} , {
    timestamps: true,
});

export const userModel = mongoose.model('user' , userSchema)