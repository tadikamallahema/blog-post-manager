/**
 createPost-d getAllPosts
getPublishedPosts
getPostById
updatePost
deletePost
togglePostStatus
 */

import { Request, Response } from "express";
import Blog from '../types/blog';
import { getPublishedBlogs, insertBlog } from "../servicer/blog.servicer";
export const createPost=async(req:Request,res:Response)=>{
    try{
        const {title,content,author_id,category,status,image}:Blog=req.body;
        //const author_id=req.user!.id;
        if(!title || !content || !category||!status){
            return res.status(400).json({success:false,message:"All details are required"})
        }
        const newpost=await insertBlog({title,content,author_id,category,status,image})
        return res.status(201).json({success:true,message:"Post created Successfully",newpost})
    }catch(err:any){
        return res.status(500).json({success:false,message:err.message});
    }
}
export const getAllPosts=async(req:Request,res:Response)=>{
    try{
        const posts=await getPublishedBlogs();
        return res.status(200).json({success:true,message:"All published posts are ",posts})
    }catch(err:any){
        return res.status(500).json({success:false,message:err.message});
    }
}