 import express from 'express';
import { deleteAdminByS, getAdmins, toggleStatusOfAdmin, updateAdminByS } from '../controllers/adminController';


const sadminRoute=express.Router();

sadminRoute.get('/all',getAdmins);
sadminRoute.post('/update/:id',updateAdminByS);
sadminRoute.delete('/del/:id',deleteAdminByS);
sadminRoute.put('/toggle/:id',toggleStatusOfAdmin)
export default sadminRoute; 