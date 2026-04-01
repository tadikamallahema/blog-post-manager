import express from 'express';
import { login, logout, registerUser } from '../controllers/authController';
import { verifyToken } from '../middleware/authMiddleware';

const authRoutes=express.Router();

authRoutes.post('/register',registerUser);
authRoutes.post('/login',login);
authRoutes.post('/logout',logout);
authRoutes.get('/me',verifyToken,(req,res)=>{
    return res.status(200).json({success:true,id:req.user?.id,role:req.user?.role});
})
export default authRoutes;