export default interface Blog{
    id:number;
    title:string;
    content:string;
    author_id:number;
    category:string;
    status:"draft"|"published";
    image?:string|null;
    created_at:Date;
    updated_at:Date;
}