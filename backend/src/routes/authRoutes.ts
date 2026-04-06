import express, {  Request, Response } from 'express';
import { login, logout, registerUser } from '../controllers/authController';
import { refreshAccessToken, verifyToken } from '../middleware/authMiddleware';
import { authorize } from '../middleware/authorize';

const authRoutes=express.Router();

authRoutes.post('/register',verifyToken,authorize("super_admin"),registerUser);
authRoutes.post('/login',login);
authRoutes.post('/logout',logout);
authRoutes.post('/refresh', refreshAccessToken);

authRoutes.get('/me', verifyToken, (req: Request, res: Response) => {
  const user=(req as any).user;
  return res.status(200).json({
    success: true,
    id: user?.id,
    role: user?.role
  });
});
export default authRoutes;