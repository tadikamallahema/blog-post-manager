import express from 'express';
import { createPost, deletePost, getAllCategories, getAllPost, getAllPublishedPosts, getPostsByCategory, getPostsById, togglePostStatus, updatePostById } from '../controllers/blogController';
import { validateParams, validateZod, verifyToken } from '../middleware/authMiddleware';
import { blogSchema, idParamSchema } from '../validator/authValidator';

const postRoutes=express.Router();


postRoutes.post('/create',validateZod(blogSchema),verifyToken,createPost);
postRoutes.get('/published',getAllPublishedPosts);
postRoutes.get('/post/:id',validateParams(idParamSchema),getPostsById);
postRoutes.put('/:id',validateParams(idParamSchema),verifyToken,updatePostById);
postRoutes.get('/getall',getAllPost);
postRoutes.delete('/post/:id',validateParams(idParamSchema),verifyToken,deletePost);
postRoutes.put('/post/:id/toggle',validateParams(idParamSchema),verifyToken,togglePostStatus);
postRoutes.get('/allc',getAllCategories);
postRoutes.get('/postbycat',getPostsByCategory);
export default postRoutes;