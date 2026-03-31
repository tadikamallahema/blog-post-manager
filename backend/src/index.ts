import express from 'express';
import dotenv from 'dotenv';
import db from './config/db';
import createUserTable from './models/UserModel';
import createBlogTable from './models/BlogModel';
import authRoutes from './routes/authRoutes';


dotenv.config();
const app=express();
app.use(express.json());
const port:number=5009;


db.getConnection().then(
    conn =>{console.log("DB Connected");
    conn.release();})
    .catch(err =>{
        console.log(err);
        process.exit(1);
    })

createUserTable();
createBlogTable();
app.use('/api/auth',authRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
})