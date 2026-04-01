import {  Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
//import { AuthRequest } from "../types/auth";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token||req.headers.authorization?.split(" ")[1];;

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    (req as any).user = {
      id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const refreshAccessToken=(req: Request,res:Response,)=>{
  const refreshToken=req.cookies?.refreshToken;
  if(!refreshToken){
    return res.status(401).json({success: false,message: "Refresh token missing"});
  }
  try{
    const decode=jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH!) as any;
    const newAccessToken=jwt.sign({id:decode.id,role:decode.role},process.env.JWT_SECRET_REFRESH!,{expiresIn:'15m'});
    res.cookie("refreshToken",newAccessToken,{
      httpOnly:true,
      secure:false,
      sameSite:"lax",
      maxAge:15*60*1000   //15 min
    })
    return res.status(200).json({success:true,message:"Access token refreshed"});
  }catch (err:any) {
    return res.status(403).json({success: false,message: "Invalid refresh token"});
  }
}