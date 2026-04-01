import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './config/db';
import createUserTable from './models/UserModel';
import createBlogTable from './models/BlogModel';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import cookieParser from 'cookie-parser';
import sadminRoute from './routes/adminRoute';
//import { seedSuperAdmin } from './controllers/adminController';


dotenv.config();

const app=express();
app.use(cookieParser());     //reads cookies from incoming HTTP requests for req.cookies
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177', 'http://localhost:5178', 'http://localhost:5179', 'http://localhost:3000'],
    credentials: true,
}));
app.use(express.json());
const port:number=5009;


db.getConnection().then(
    conn =>{console.log("DB Connected");
    conn.release();})
    .catch(err =>{
        console.log(err);
        process.exit(1);
    })

//seedSuperAdmin();
createUserTable();
createBlogTable();
app.use('/api/auth',authRoutes);
app.use('/api/blog', postRoutes);
app.use('/api/sadmin',sadminRoute);
app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
})