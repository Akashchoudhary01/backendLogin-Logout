import { userModel } from "../models/userSchema.js";

const signup = async (req, res , next) => {
    const { name, email, password, confirmPassword } = req.body;

    console.log(name, email, password, confirmPassword);
    if(!name || !email || !password || !confirmPassword){
        return res.status(400).json({
            success: false,
            message: "Every Fild is mendatory"
        })

    }

    try {
         const userInfo = userModel(req.body);

    const result = await userInfo.save();

    return res.status(200).json({
        success: true,
        data: result
    });
        
    } catch (error) {
        if(error.code = 11000){
            return res.status(400).json({
            success : false,
            message : "Account Alredy exists with provided Email id"
        })
        }

            return res.status(400).json({
                success : false,
                message : error.message
            }) 
    }
};

export default signup;
