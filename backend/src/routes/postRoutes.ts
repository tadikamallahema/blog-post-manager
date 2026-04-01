import express from 'express';
import { createPost, deletePost, getAllPost, getAllPublishedPosts, getPostsById, togglePostStatus, updatePostById } from '../controllers/blogController';

const postRoutes=express.Router();


postRoutes.post('/create',createPost);
postRoutes.get('/published',getAllPublishedPosts);
postRoutes.get('/:id',getPostsById);
postRoutes.put('/:id',updatePostById);
postRoutes.get('/',getAllPost);
postRoutes.delete('/:id',deletePost);
postRoutes.put('/:id/toggle',togglePostStatus);
export default postRoutes;