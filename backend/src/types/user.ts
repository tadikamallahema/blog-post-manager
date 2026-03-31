export default interface User{
    id:number;
    name:string;
    email:string;
    phoneNumber:string;
    password:string;
    role:"user" | "admin" | "super_admin";
    is_active:0|1;
    created_at: Date;
    updated_at: Date;
}