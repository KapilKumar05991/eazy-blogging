import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchBlogById, setBlogLoading } from "../features/blogSlice";
import Blog from "../components/Blog";
import { Angry, Loader2 } from "lucide-react";

const BlogDetails = () => {
  // parameter : blog ID
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBlogById(String(id)));
    return () => {
      dispatch(setBlogLoading(true));
    };
  }, []);

  let blog = useAppSelector((state) => state.blog.blogDetails[String(id)]);
  let loading = useAppSelector((state) => state.blog.blogLoading);
  let error = useAppSelector((state) => state.blog.error);

  if (!(error === "idle" || loading)) {
    return (
      <div className="container m-auto min-h-screen flex items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Angry size={30} />
          <h1 className="text-2xl font-bold">Something Went Wrong !! Either Blog Deleted or Not Found.</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="container max-w-5xl 2xl:max-w-7xl sm:m-auto p-6">
      {!loading ? (
        <Blog blog={blog} />
      ) : (
        <div className="h-screen flex items-center justify-center">
          <Loader2 className="animate-spin" size={45} />
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
