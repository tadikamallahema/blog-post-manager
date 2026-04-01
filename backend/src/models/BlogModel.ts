import db from '../config/db';

 
const createBlogTable=async()=>{
    try {
        await db.execute(
        `create table if not exists blogs(
        id int auto_increment primary key,
        title varchar(200) not null  ,
        content text not null,
        author_id int not null,
        category varchar(100) not null ,
        status enum('draft','published') default 'draft',
        image varchar(255),

        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp,
         INDEX idx_author_id (author_id),

        foreign key(author_id) references users(id)  on delete cascade
       
        )`
        );
    console.log("Blog Table is created ");
    }catch(err){
        console.log(err);
    }
}
export default createBlogTable;