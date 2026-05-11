export interface NewsType {
  date: string;
  content: string;
  link?: string;
}
export interface WorkType {
  title: string;
  poster: string;
  video: string;
}
export interface BlogType{
  slug:string;
  title:string;
  description?:string;
  created:string;
  updated?:string;
  tag?:string[] | string;
}