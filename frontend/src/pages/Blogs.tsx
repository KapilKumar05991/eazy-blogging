import { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchBlogs } from "../features/blogSlice";
import { Angry, Loader2 } from "lucide-react";

const Blogs = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    if(blogs.length == 0){
      dispatch(fetchBlogs());
    }
  }, []);
  const blogs = useAppSelector((state) => state.blog.blogs);
  const loading = useAppSelector((state) => state.blog.blogsLoading);
  const error = useAppSelector((state) => state.blog.error);

  if (!(error === "idle")) {
    return (
      <div className="container m-auto min-h-screen flex items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Angry size={30} />
          <h1 className="text-2xl font-bold">Something Went Wrong !!</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="container min-h-screen mx-auto py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-pretty">
            Popular Blogs of the Day
          </h2>
          <p className="mt-2 text-lg">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        {!loading ? (
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-6 border-t border-gray-300 pt-8 sm:mt-6 sm:pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {/* all blogs */}
            {blogs.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="h-[60vh] flex items-center justify-center">
            <Loader2 className="animate-spin" size={45} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
