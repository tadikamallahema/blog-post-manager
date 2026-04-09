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
    const {title,content,author_id,category}=data;
    const { status = "draft" } = data;
    const [res]=await db.execute<ResultSetHeader>(
        `insert into blogs(title,content,author_id,category,status)
        values(?,?,?,?,?)`,[title,content,author_id,category,status]
    );
    return res;
}
export async function getBlogsByAuthorId(author_id:number):Promise<RowDataPacket[] >{
    const [res]=await db.execute<RowDataPacket[]>(
        `select * from blogs where author_id=?`,[author_id]
    )
    return res;
}
export async function getPublishedBlogs(limit:number,offset:number):Promise<RowDataPacket[]>{
    //console.log(limit,offset);
    const [res]=await db.execute<RowDataPacket[]>(
        `select * from blogs where status="published" order by updated_at asc
        limit ${limit} offset ${offset}`/* ,[offset,limit] */
    )
    return res;
}
export const getPublishedBlogsCount = async (): Promise<number> => {
  const [rows]: any = await db.execute(
    `SELECT COUNT(*) as total FROM blogs WHERE status = "published"`
  );

  return rows[0].total;
};
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
        `select b.id,
            b.title,
            b.content,
            b.category,
            b.status,
            b.created_at,
            b.updated_at,
            b.author_id,
            u.name AS author
         FROM blogs b
         JOIN users u ON b.author_id = u.id
         WHERE LOWER(b.category) = LOWER(?) 
           AND b.status = 'published'
        
        `,[category]
    );
    return res;
}
export const getAllCat=async():Promise<RowDataPacket[]>=>{
    const [res]=await db.execute<RowDataPacket[]>(
        `select distinct category from blogs`
    );
    return res;
}