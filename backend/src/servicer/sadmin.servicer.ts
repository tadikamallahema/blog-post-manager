import { RowDataPacket } from 'mysql2';
import db from '../config/db';

//db.excute --> prevents SQL injection and can reuse execution plans → better for repeated queries
export const getAllAdmins=async():Promise<RowDataPacket[]>=>{
    const [rows]=await db.execute<RowDataPacket[]>(
        `select * from users where role="admin"`
    );
    return rows;
}
