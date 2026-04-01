import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './config/db';
import createUserTable from './models/UserModel';
import createBlogTable from './models/BlogModel';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import { verifyToken } from './middleware/authMiddleware';
import { getAllPublishedPosts, getAllCategories, getPostsById, getPostsByCategory } from './controllers/blogController';


dotenv.config();

const app=express();
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

createUserTable();
createBlogTable();
app.use('/api/auth',authRoutes);

// Public blog routes (no auth required)
const publicBlogRoutes = express.Router();
publicBlogRoutes.get('/published', getAllPublishedPosts);
publicBlogRoutes.get('/allc', getAllCategories);
publicBlogRoutes.get('/post/:id', getPostsById);
publicBlogRoutes.get('/postbycat', getPostsByCategory);
app.use('/api/blog', publicBlogRoutes);

// Protected blog routes (auth required)
app.use('/api/blog', verifyToken, postRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
})