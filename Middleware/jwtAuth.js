import  JWT   from "jsonwebtoken";

export const jwtAuth = (req , res , next)=>{
    
        const token = (req.cookies && req.cookies.token) || null;
        
     if(!token){
         return res.status(400).json({
             success: false,
             message : 'Not Authorized'
            })
        }
        
    


    next();

}