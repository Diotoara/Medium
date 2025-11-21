import type { Blog } from "../hooks"
import AppBar from "./AppBar"
import Avatar from "./Avatar"

const FullBlog = ({blog}:{blog:Blog}) => {
  return (
    <div>
        <AppBar/>
        <div className="flex justify-center">

            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-2xl pt-12">
                <div className=" col-span-10 md:col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-1 pl-1">
                        Posted on 3rd March, 2025
                    </div>
                    <div className="pt-4 pl-1">
                        {blog.content}
                    </div>
                </div>


                <div className="col-span-4 invisible md:visible">
                    <div className="text-slate-600 pl-3">
                        Author
                    </div>
                    <div className="flex pt-1">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar name={blog.author.name || "Anon"} size="big" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="text-slate-600 pr:3 lg:pr-9 ">
                                Random catchphrase about the author's abbility to grab the user's attention
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default FullBlog