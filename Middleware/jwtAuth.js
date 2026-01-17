import  JWT   from "jsonwebtoken";

export const jwtAuth = (req , res , next)=>{
    try {
        const token = (req.cookies && req.cookies.token) || null;
        
    } catch (e) {
        return res.status(400).json({
            success: false,
            message : 'user does not exists'
        })
        
    }


    next();

}