import { ResultSetHeader, RowDataPacket } from 'mysql2';
import db from '../config/db';


type createBlog={
    title:string;
    content:string;
    author_id:number;
    category:string;
    status:"draft"|"published";
    image:string|null;
}

export async function insertBlog(data:createBlog):Promise<ResultSetHeader>{
    const {title,content,author_id,category,image}=data;
    const { status = "draft" } = data;
    const [res]=await db.execute<ResultSetHeader>(
        `insert into blogs(title,content,author_id,category,status,image)
        values(?,?,?,?,?,?)`,[title,content,author_id,category,status,image]
    );
    return res;
}
export async function getBlogsByAuthorId(author_id:number):Promise<RowDataPacket[] >{
    const [res]=await db.execute<RowDataPacket[]>(
        `select * from blogs where author_id=?`,[author_id]
    )
    return res;
}
export async function getPublishedBlogs():Promise<RowDataPacket[]>{
    const [res]=await db.execute<RowDataPacket[]>(
        `select * from blogs where status="published"`
    )
    return res;
}
export async function allBlogs():Promise<RowDataPacket[]>{
    const [res]=await db.execute<RowDataPacket[]>(
        `select * from blogs`
    )
    return res;
}
export async function getPostById(id:number):Promise<RowDataPacket|null>{
    const [res]=await db.execute<RowDataPacket[]>(
        `select * from blogs where id=?`,[id]
    )
    return res.length?res[0]:null;
}
export async function toggleStatus(id:number):Promise<ResultSetHeader>{
    const [res]=await db.execute<ResultSetHeader>(
        `update blogs set status=case 
        when status='draft' then 'published'
        else 'draft'
        end 
        where id=?`,[id]
    )
    return res;
}
export async function deleteBlog(id:number):Promise<ResultSetHeader>{
    const [res]=await db.execute<ResultSetHeader>(
        `delete from blogs where id=?`,[id]
    )
    return res;
}
type UpdateBlog = Partial<createBlog>;

export async function updatePost(
  id: number,
  data: UpdateBlog
): Promise<ResultSetHeader> {

  const fields = [];
  const values = [];

  for (const key in data) {
    fields.push(`${key} = ?`);
    values.push((data as any)[key]);
  }

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  const query = `
    UPDATE blogs
    SET ${fields.join(", ")}
    WHERE id = ?
  `;

  values.push(id);

  const [res] = await db.execute<ResultSetHeader>(query, values);
  return res;
}
export const getBlogByCategory=async(category:string):Promise<RowDataPacket[]>=>{
    const [res]=await db.execute<RowDataPacket[]>(
        `select * from blogs where lower(category)=lower(?) and status='published'`,[category]
    );
    return res;
}
export const getAllCat=async():Promise<RowDataPacket[]>=>{
    const [res]=await db.execute<RowDataPacket[]>(
        `select distinct category from blogs`
    );
    return res;
}