import AppBar from "../components/AppBar"
import BlogCard from "../components/BlogCard"
import BlogSkeleton from "../components/BlogSkeleton";
import RegsterCard from "../components/RegsterCard";
import { useBlogs } from "../hooks"

const Blogs = () => {
  const {loading, blogs, error} = useBlogs();


  if(error){
    return(
    <div className="flex flex-col min-h-screen">
      <div>
        <AppBar/>
      </div>

      <div className="flex justify-center items-center flex-1">
        <RegsterCard/>
      </div>

    </div>
    )
  }

  if(loading) {
    return(
      <div>
        <AppBar/>
        <div className="flex justify-center">
          <div>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
          </div>
        </div>
      </div>
    )
  }

  {console.log(blogs)}

  return (
    <div>
      <AppBar/>
    <div className="flex justify-center">
      <div className="">
        {blogs.map(blog => <BlogCard 
          id={`${blog.id}`}
          authorName={blog.author.name || "Anonymous"}
          content={blog.content}
          publishedDate="09-01-2024" 
          title={blog.title}
          />
        )}
      </div>
    </div>
    </div>
  )
}

export default Blogs