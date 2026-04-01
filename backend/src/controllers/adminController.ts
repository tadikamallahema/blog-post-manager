import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import db from "../config/db";

export async function seedSuperAdmin() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await db.execute(
    `INSERT INTO users (name, email,phoneNumber, password, role, is_active)
     VALUES (?, ?, ?,?, ?, ?)`,
    ["Super Admin", "admin@example.com","9441265762", hashedPassword, "super_admin", 1]
  );

  console.log("Super Admin Created");
}

