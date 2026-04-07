import express, {  Request, Response } from 'express';
import { login, logout, registerUser } from '../controllers/authController';
import { refreshAccessToken, validateParams, validateZod, verifyToken } from '../middleware/authMiddleware';
import { authorize } from '../middleware/authorize';
import { loginUserSchema, registerUserSchema } from '../validator/authValidator';

const authRoutes=express.Router();

authRoutes.post('/register',validateZod(registerUserSchema),verifyToken,authorize("super_admin"),registerUser);
authRoutes.post('/login',validateZod(loginUserSchema),login);
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