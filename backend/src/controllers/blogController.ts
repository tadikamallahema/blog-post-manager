import { Request, Response } from "express";
import Blog from '../types/blog';
import { allBlogs, deleteBlog, getBlogByCategory, getPostById, getPublishedBlogs, insertBlog, toggleStatus, updatePost } from "../servicer/blog.servicer";

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
export const getAllPublishedPosts=async(req:Request,res:Response)=>{
    try{
        const posts=await getPublishedBlogs();
        return res.status(200).json({success:true,message:"All published posts are ",posts})
    }catch(err:any){
        return res.status(500).json({success:false,message:err.message});
    }
}
export const getAllPost=async(req:Request,res:Response)=>{
    try{
        const posts=await allBlogs();
        return res.status(200).json({success:true,message:"All posts are ",posts})
    }catch(err:any){
        return res.status(500).json({success:false,message:err.message});
    }
}
export const getPostsById=async(req:Request,res:Response)=>{
   try{
     const {id}=req.params;
     if(!id){
        return res.status(404).json({success:false,message:"No Id is found"})
     }
     const post_id=Number(id);
     const post=await getPostById(post_id);
     return res.status(200).json({success:true,message:`Post of Id ${id}is`,post});
   }catch(err:any){
    return res.status(500).json({success:false,message:err.message});
   }

}
export async function updatePostById(req:Request,res:Response){
    try{
        const {id}=req.params;
        if(!id){
            return res.status(404).json({success:false,message:"No Id is found"})
        }
        const post_id=Number(id);
        if (isNaN(post_id)) {
            return res.status(400).json({success: false,message: "Invalid ID"});
        }
        const {title,content,category,status,image}=req.body;
        const updatedpost=await updatePost(post_id,{title,content,category,status,image});
        return res.status(200).json({success:true,message:"Updated post successfully",updatedpost});
    }catch(err:any){
    return res.status(500).json({success:false,message:err.message});
   }
}
export async function deletePost(req:Request,res:Response){
    try{
        const {id}=req.params;
     if(!id){
        return res.status(404).json({success:false,message:"No Id is found"})
     }
     const post_id=Number(id);
     await deleteBlog(post_id);
     return res.status(200).json({success:true,message:"Deleted blog successfully"});
    }catch(err:any){
    return res.status(500).json({success:false,message:err.message});
   }
}
export async function togglePostStatus(req:Request,res:Response){
    try{
        const {id}=req.params;
     if(!id){
        return res.status(404).json({success:false,message:"No Id is found"})
     }
     const post_id=Number(id);
     await toggleStatus(post_id);
     return res.status(200).json({success:true,message:"Changed status of post"})
    }catch(err:any){
    return res.status(500).json({success:false,message:err.message});
   }
}

export async function getPostsByCategory(req:Request,res:Response){
    try{
        const {category}=req.query;
        if(!category){
            return res.status(400).json({success:false,message:"Please give category"});
        }
        const cat=String(category);
        const posts=await getBlogByCategory(cat);
        /* if(posts.length==0){
                return res.status(404).json({success:false,message:"No post is found in this category"});
        } */
        return res.status(200).json({success:true,message:`Posts of category:${cat}`,posts})
    }catch(err:any){
        return res.status(500).json({success:false,message:err.message});
    }
}