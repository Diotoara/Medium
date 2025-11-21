import AppBar from "../components/AppBar"
import BlogCard from "../components/BlogCard"
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

const Blogs = () => {
  const {loading, blogs} = useBlogs();

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