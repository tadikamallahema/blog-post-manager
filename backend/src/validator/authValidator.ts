/* import {z} from 'zod';

export const registerUser=z.object({
    name:z.string().min(3).max(50).trim(),
    email:z.string().email().trim().toLowerCase(),
    phoneNumber:z.string().regex(/^[0-9]{10}$/,"Phone must be 10 digits"),
    password:z.string().min(6).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
    "Password must contain uppercase, lowercase, number, and special character"),
    role: z.enum(["user", "admin", "super_admin"]).optional(),
    is_active: z.number().int().min(0).max(1).optional()
});

export const loginUser=z.object({
    email:z.string().email().trim().toLowerCase(),
    password:z.string().min(6).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
    "Password must contain uppercase, lowercase, number, and special character"
  )
});
export const blogSchema = z.object({
  title: z.string().min(3).max(200).trim(),
  content: z.string().min(10),
  category: z.string().min(3).max(100),
  status: z.enum(["draft", "published"]).optional(),
  image: z.string().url().optional().or(z.literal(""))
}); */

import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(3).max(50).trim(),
  email: z.string().email().trim().toLowerCase(),
  phoneNumber: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
  password: z.string().min(6).max(100).regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      "Password must contain uppercase, lowercase, number, and special character"
    ),
   role: z.enum(["user", "admin", "super_admin"]).optional(), 
});

export const loginUserSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(6).max(100).regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      "Password must contain uppercase, lowercase, number, and special character"
    )
})

export const updateUserSchema = registerUserSchema.partial()

export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID"),
});


export const blogSchema = z.object({
  title: z.string().min(3).max(200).trim(),
  content: z.string().min(10).max(5000),
  category: z.string().min(3).max(100).transform(val => val.trim().toLowerCase()),
  status: z.enum(["draft", "published"]),
  image: z.string().url().optional(),
})

export const updateBlogSchema = blogSchema.partial().strict();


//strict() --> is used to say that all the mentioned fields in schema are only possible to pass params 