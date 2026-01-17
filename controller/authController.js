import { userModel } from "../models/userSchema.js";
import emailValidator from "email-validator";

export const signup = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  console.log(name, email, password, confirmPassword);
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Every Fild is mendatory",
    });
  }
  const validEmail = emailValidator.validate(email);
  if (!validEmail) {
    return res.status(400).json({
      success: false,
      message: "Please Enter a Valid Email ID",
    });

    if (password != confirmPassword) {
      return res.status(400).json({
        success: false,
        data: "Password And confirm Password dosen't exists",
      });
    }
  }

  try {
    const userInfo = userModel(req.body);

    const result = await userInfo.save();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if ((error.code = 11000)) {
      return res.status(400).json({
        success: false,
        message: "Account Alredy exists with provided Email id",
      });
    }

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//////////////////////////////////
///////// signIn ////////////////
//////////////////////////////////

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Every Fild is mendatory",
    });
  }

  try {
    
      const user = await userModel
        .findOne({
          email,
        })
        .select("+password");
    
      if (!user || user.password !== password) {
        return res.status(400).json({
          success: false,
          message: "Invalid Credintial",
        });
      }
    
      const token = user.jwtToken();
      user.password = undefined;
    
      const cookieOptions = {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      };
    
      res.cookie("token", token, cookieOptions);
      res.status(200).json({
        success: true,
        data: user,
      });
  } catch (e) {
    res.status(400).json({
        success: false,
        message : "Invalid credintials"
    })
    
  }



};

export const getUser = async (req, res, next) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }

  const userId = req.user.id;

  try {
    const user = await userModel.findById(userId);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }
};




