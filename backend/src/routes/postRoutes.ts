import express from 'express';
import { createPost, deletePost, getAllCategories, getAllPost, getAllPublishedPosts, getPostsByCategory, getPostsById, togglePostStatus, updatePostById } from '../controllers/blogController';

const postRoutes=express.Router();


postRoutes.post('/create',createPost);
postRoutes.get('/published',getAllPublishedPosts);
postRoutes.get('/post/:id',getPostsById);
postRoutes.put('/:id',updatePostById);
postRoutes.get('/getall',getAllPost);
postRoutes.delete('/post/:id',deletePost);
postRoutes.put('/post/:id/toggle',togglePostStatus);
postRoutes.get('/allc',getAllCategories);
postRoutes.get('/postbycat',getPostsByCategory);
export default postRoutes;