import express from 'express';
import { createPost, deletePost, getAllCategories, getAllPost, getAllPublishedPosts, getPostsByCategory, getPostsById, togglePostStatus, updatePostById } from '../controllers/blogController';
import { verifyToken } from '../middleware/authMiddleware';

const postRoutes=express.Router();


postRoutes.post('/create',verifyToken,createPost);
postRoutes.get('/published',getAllPublishedPosts);
postRoutes.get('/post/:id',getPostsById);
postRoutes.put('/:id',verifyToken,updatePostById);
postRoutes.get('/getall',getAllPost);
postRoutes.delete('/post/:id',verifyToken,deletePost);
postRoutes.put('/post/:id/toggle',verifyToken,togglePostStatus);
postRoutes.get('/allc',getAllCategories);
postRoutes.get('/postbycat',getPostsByCategory);
export default postRoutes;