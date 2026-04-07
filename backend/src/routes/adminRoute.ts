 import express from 'express';
import { deleteAdminByS, getAdmins, toggleStatusOfAdmin, updateAdminByS } from '../controllers/adminController';
import { superAdminLogin } from '../controllers/authController';
import { validateParams } from '../middleware/authMiddleware';
import { idParamSchema } from '../validator/authValidator';


const sadminRoute=express.Router();

sadminRoute.get('/all',getAdmins);
sadminRoute.post('/login',superAdminLogin)
sadminRoute.post('/update/:id',validateParams(idParamSchema),updateAdminByS);
sadminRoute.delete('/del/:id',validateParams(idParamSchema),deleteAdminByS);
sadminRoute.put('/toggle/:id',validateParams(idParamSchema),toggleStatusOfAdmin);
export default sadminRoute; 