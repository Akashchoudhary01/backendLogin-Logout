import JWT from "jsonwebtoken";

export const jwtAuth = (req, res, next) => {
  const token = (req.cookies && req.cookies.token) || null;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Not Authorized",
    });
  }

  try {
    const Payload = JWT.verify(token , process.env.SECRET_KEY);
    req.user = {id : Payload.id , email : Payload.email}
    
  } catch (e) {
    return res.status(400).json({
           success : false,
           message : 'Not Authorized'
    })    
  }

  next();
};
