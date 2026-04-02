
import db from '../config/db';
import { ResultSetHeader, RowDataPacket } from "mysql2";

/*
RequestSetHeader -> inseert/update/delete --> meta data about query not actual data 
RowDataPacket -> used for select   --> get actual data from DB 

Intially blocking happens , to stop them we use promsises in the ts
*/
type CreateUserInput = {
  name: string;
  email: string;
  phoneNumber: string;
  role?: "user" | "admin" | "super_admin";
  password: string;
  is_active:boolean;
};

export const insertUser=async(data:CreateUserInput):Promise<ResultSetHeader>=>{
    const {name,email,phoneNumber,role="admin",password,is_active=true}=data;
    const [result]=await db.execute<ResultSetHeader>(
        `insert into users(name,email,phoneNumber,role,password,is_active) values(?,?,?,?,?,?)`,
        [name,email,phoneNumber,role,password,is_active]
    );
    return result;
}

export const getUserById=async(id:number):Promise<RowDataPacket|null>=>{
    const [res]=await db.execute<RowDataPacket[]>(
        `select * from users where id=?`,[id]
    );
    return res.length?res[0]:null;
}

export const updateAdmin = async (id: number,data: Partial<CreateUserInput>): Promise<ResultSetHeader> => {
  const fields: string[] = [];
  const values: any[] = [];

  if (data.name) {
    fields.push("name=?");
    values.push(data.name);
  }
  if (data.email) {
    fields.push("email=?");
    values.push(data.email);
  }
  if (data.phoneNumber) {
    fields.push("phoneNumber=?");
    values.push(data.phoneNumber);
  }
  if (data.password) {
    fields.push("password=?");
    values.push(data.password);
  }
  if (data.role) {
    fields.push("role=?");
    values.push(data.role);
  }

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  const query = `UPDATE users SET ${fields.join(", ")} WHERE id=? and role='admin'`;
  values.push(id);
  const [res] = await db.execute<ResultSetHeader>(query, values);
  return res;
};

export const deleteAdmin=async(id:number):Promise<ResultSetHeader>=>{
    const [res]=await db.execute<ResultSetHeader>(
        `delete from users where id=? and role='admin'`,[id]
    );
    return res;
}

export const getUserByEmail=async(email:string):Promise<RowDataPacket|null>=>{
    const [res]=await db.execute<RowDataPacket[]>(
        `select * from users where email=?`,[email]
    )
    return res.length?res[0]:null;
}   

export const toggleUser=async(id:number):Promise<ResultSetHeader>=>{
  const [res]=await db.execute<ResultSetHeader>(
    `update users set is_active= case
        when is_active=1 then 0
        else 1
      end
    where id=? `,[id]
  );
  return res;
}
/* export const getAllAdmin=async():Promise<RowDataPacket[]>=>{
  const [res]=await db.execute<RowDataPacket[]>(
    `select * from users where role=admin`
  )
  return res;
} */