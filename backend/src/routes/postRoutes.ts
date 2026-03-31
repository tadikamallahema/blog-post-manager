import express from 'express';
import { createPost, getAllPosts } from '../controllers/blogController';

const postRoutes=express.Router();


postRoutes.post('/create',createPost);
postRoutes.get('/getall',getAllPosts);
export default postRoutes;