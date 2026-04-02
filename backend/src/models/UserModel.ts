import db from '../config/db';

const createUserTable=async()=>{
    try{
        await db.execute(
        `create table if not exists users(
        id int auto_increment primary key,
        name varchar(100) not null,
        email varchar(255) not null unique,
        phoneNumber varchar(25) not null ,
        role enum ('user','admin','super_admin') default 'admin',
        password varchar(255) not null,
        is_active tinyint(1) default 1,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
        
        )`
    );
    console.log("Users table is created ");
    }catch(err:any){
        console.log(err.message);
    }
}
export default createUserTable;