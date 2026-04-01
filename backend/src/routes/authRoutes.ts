import express from 'express';
import { login, logout, registerUser } from '../controllers/authController';

const authRoutes=express.Router();

authRoutes.post('/register',registerUser);
authRoutes.post('/login',login);
authRoutes.post('/logout',logout);

export default authRoutes;