import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import db from "../config/db";
import { getAllAdmins } from "../servicer/sadmin.servicer";
import User from "../types/user";
import { deleteAdmin, getUserById, toggleUser, updateAdmin } from "../servicer/user.servicer";

export async function seedSuperAdmin() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await db.execute(
    `INSERT INTO users (name, email,phoneNumber, password, role, is_active)
     VALUES (?, ?, ?,?, ?, ?)`,
    ["Super Admin", "admin@example.com","9441265762", hashedPassword, "super_admin", 1]
  );

  console.log("Super Admin Created");
}

export async function getAdmins(req:Request,res:Response){
  try{
    const all=await getAllAdmins();
    return res.status(200).json({success:true,message:"All admins in the website are",all});
  }catch(err:any){
    return res.status(500).json({success:false,message:err.message});
  }
}

export const updateAdminByS = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const adminId = Number(id);
    if (!id || isNaN(adminId)) {
      return res.status(400).json({success: false,message: "Invalid admin ID"});
    }

    const data = { ...req.body };
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const result = await updateAdmin(adminId, data);
    if (result.affectedRows === 0) {
      return res.status(404).json({success: false,message: "Admin not found or not allowed",});
    }
    return res.status(200).json({success: true,message: "Admin updated successfully",});
  } catch (err: any) {
    return res.status(500).json({success: false,message: err.message,});
  }
};

export const deleteAdminByS=async(req:Request,res:Response)=>{
  try{
    const {id}=req.params;
    const admin_id=Number(id);
    if (!id || isNaN(admin_id)) {
      return res.status(400).json({success: false,message: "Invalid admin ID"});
    }
    const user =await getUserById(admin_id);
    if(!user || user.role !== "admin"){
      return res.status(404).json({success:false,message:"User doesn't exists"});
    }
    const result=await deleteAdmin(admin_id);
    if (result.affectedRows === 0) {
      return res.status(404).json({success: false,message: "Admin not found or not allowed"});
    }
    return res.status(200).json({success:true,message:"User deleted successfully"})
  }catch(err:any){
    return res.status(500).json({success:false,message:err.message});
  }
}

export const toggleStatusOfAdmin=async(req:Request,res:Response)=>{
  try{
    const {id}=req.params;
    const superAdminId=Number(id);
    if (!id || isNaN(superAdminId)) {
    return res.status(400).json({success: false,message: "Invalid admin ID"});
    }
   const result= await toggleUser(superAdminId);
   if(result.affectedRows===0) return res.status(404).json({success:false,message:"Admin not found "})
    return res.status(200).json({success:true,message:"Updated Admin Status"})
  }catch(err:any){
    return res.status(500).json({success:false,message:err.message});
  }
}
