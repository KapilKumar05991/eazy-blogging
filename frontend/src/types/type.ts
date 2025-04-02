export interface Blog {
    id:string
    title:string
    description:string
    content:string
    tags:tag[]
    created_at:string
    author:User
}
interface tag{
  tag:string
}
export interface User {
  id:string,
  name:string
  role:string
  bio:string
}

