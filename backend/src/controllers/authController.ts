import { Request,Response } from "express";
import User from '../types/user';
import { getUserByEmail, insertUser } from "../servicer/user.servicer";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
//console.log(process.env.JWT_SECRET_REFRESH);

export const registerUser=async(req:Request,res:Response)=>{
    try{
        const {name,email,phoneNumber,password,role}:User=req.body;
        if(!name||!email||!phoneNumber|| !password){
            return res.status(400).json({success:false,message:"Few details are missing"});
        }
        const existingUser=await getUserByEmail(email);
        if(existingUser){
            return res.status(409).json({success:false,message:"User already exists"});
        }
        const hashed=await bcrypt.hash(password,10);
        const user=await insertUser({
            name,email,phoneNumber,password:hashed,role
        })
        return res.status(201).json({success:true,message:"User Signedup successfully",user})
    }catch(err:any){
        return res.status(500).json({success:false,message:err.message});
    }
}

export async function login(req:Request,res:Response){
    try{
        const {email,password}:User=req.body;
        if(!email|| !password){
          return res.status(400).json({success:false,message:"Few details are missing"});
        }
        const existingUser=await getUserByEmail(email);
        if(!existingUser){
            return res.status(404).json({success:false,message:"User doesn'tt exists"});
        }
        const passwordmatch=await bcrypt.compare(password,existingUser.password);
        if(!passwordmatch){
             return res.status(400).json({ message: "Wrong password" });
        }
        const token=jwt.sign({id:existingUser.id,role:existingUser.role},process.env.JWT_SECRET!,{expiresIn:'15m'});
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:15*60*1000       //15 min
        })
        
        const refreshToken=jwt.sign({id:existingUser.id,role:existingUser.role},process.env.JWT_SECRET_REFRESH!,{expiresIn:'1d'});
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:24*60*60*1000    //1 day
        })
        return res.status(200).json({success:true,message:"User Logged in Successfull"})
    }catch(err:any){
        return res.status(500).json({success:false,message:err.message});
    }
}

export async function logout(req:Request,res:Response){
    try{
        res.clearCookie("token",{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    })
    res.clearCookie("refreshToken",{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    })
    return res.status(200).json({success:true,message:"User Logged out successfully"});
    }catch(err:any){
        return res.status(500).json({success:false,message:err.message});
    }
}

