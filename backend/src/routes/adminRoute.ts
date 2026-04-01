 import express from 'express';
import { deleteAdminByS, getAdmins, updateAdminByS } from '../controllers/adminController';


const sadminRoute=express.Router();

sadminRoute.get('/all',getAdmins);
sadminRoute.post('/update/:id',updateAdminByS);
sadminRoute.delete('/del/:id',deleteAdminByS);
export default sadminRoute; 