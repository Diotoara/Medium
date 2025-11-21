import { Link } from "react-router-dom";
import Avatar from "./Avatar";

interface BlogCardProps{
    authorName : string;
    title : string;
    content : string;
    publishedDate : string;
    id: string;
}

const BlogCard = ({id, authorName, title, content, publishedDate} : BlogCardProps) => {
  return (

    <Link to={`/blog/${id}`}>

    <div className="p-4 border-b w-screen max-w-screen-md cursor-pointer pb-4 border-blue-300">
        <div className="flex pb-2">
            <div className="flex justify-center flex-col">
                <Avatar name={authorName} />
            </div>
            <div className="font-extralight pl-2">
                {authorName}
            </div>
            <div className="pl-2 font-thin text-sm flex justify-center flex-col text-slate-500">
                {publishedDate}
            </div>
        </div>

        <div className="text-xl font-bold">
            {title}
        </div>
        <div className="text-sm font-extralight">
            {content.slice(0,150) + "..."}
        </div>
        <div className=" pt-2 text-slate-700 text-sm font-thin">
            {`${Math.ceil(content.length/100)} minute(s) read`}
        </div>
    </div>
    </Link>
  )
}

export default BlogCard