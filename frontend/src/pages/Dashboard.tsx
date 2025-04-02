import {
  Angry,
  ArrowLeft,
  Dot,
  Eye,
  Loader2,
  SquarePen,
  Trash,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchUserBlogs } from "../features/userSlice";
import useDate from "../hooks/useDate";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Dialog from "../components/Dialog";
import useReadTime from "../hooks/useReadTime";
import { toast } from "sonner";
import Button from "../components/Button";
import { clearBlogSlice } from "../features/blogSlice";

const Dashboard = () => {
  const [markDelete, setMarkDelete] = useState({
    id: "",
    visible: false,
  });
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.user.posts);
  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);
  useEffect(() => {
    if(posts.length==0){
      dispatch(fetchUserBlogs());
    }
  }, []);

  async function handleDelete(id: string) {
    try {
       await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Berear ${localStorage.getItem("token")}`,
        },
      });
      dispatch(fetchUserBlogs())
      dispatch(clearBlogSlice())
      toast.success('Blog Deleted')
    } catch (e) {
      toast.error('Blog Deletion Failed !!')
    }
  }
  const data = {
    icon: <Trash2 size={20} />,
    iconBg: "bg-red-500",
    title: "Are You Sure?",
    message: "Are you sure you want to delete blog post. This action cannot be undone.",
    onClickYes: async () => {
      await handleDelete(markDelete.id);
      setMarkDelete({
        ...markDelete,
        visible: false,
      });
    },
    onClickNo: () => {
      setMarkDelete({
        ...markDelete,
        visible: false,
      });
    },
  };
  if (!(error == "idle")) {
    return (
      <div className="container m-auto min-h-screen flex items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Angry size={30} />
          <h1 className="text-2xl font-bold">Something Went Wrong !!</h1>
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-800" size={45} />
      </div>
    );
  }
  return (
    <div className="container max-w-5xl 2xl:max-w-7xl p-6 mx-auto min-h-screen">
      {markDelete.visible && <Dialog dialog={data} />}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/blogs"
            className="flex rounded-md text-sm sm:text-base gap-1 text-white font-semibold items-center px-3  py-2 bg-gray-900"
          >
            <ArrowLeft size={20} />
            Back
          </Link>
          <h1 className="text-xl sm:text-4xl font-bold">My Posts</h1>
        </div>
        <Link
          to="/publish"
          className="flex rounded-md text-sm sm:text-base gap-1 text-white font-semibold items-center px-3  py-2 bg-gray-900"
        >
          Create New Post
        </Link>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {posts.length == 0 ? (
          <h1 className="text-2xl text-gray-800 font-bold">
            You have't Create Post Yet. Try Creating New Post.{" "}
          </h1>
        ) : (
          posts.map((blog, index) => (
            <div key={index} className="w-full">
              <div className=" border border-gray-300 shadow-sm rounded-md w-full h-full p-4 flex flex-col justify-between leading-normal">
                <div className="mb-4">
                  <div className="text-sm sm:text-base text-gray-600 flex items-center">
                    <time dateTime="2025-03-25" className="text-gray-500">
                      {useDate(blog.created_at)}
                    </time>
                    <Dot size={20} />
                    <p>{useReadTime(blog.content)} Min(s) read</p>
                  </div>
                  <div className="my-1 flex items-center gap-1 flex-wrap">
                    {blog.tags.map((tag, index: number) => (
                      <Link
                        to="#"
                        key={index}
                        className="z-2 text-xs rounded-full bg-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-300"
                      >
                        {tag.tag}
                      </Link>
                    ))}
                  </div>
                  <h1 className="text-gray-900 font-bold text-xl sm:text-2xl mb-2">
                    {blog.title}
                  </h1>
                  <p className="text-gray-800 sm:text-lg font-serif line-clamp-3">
                    {blog.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Link
                    to={`/blog/${blog.id}`}
                    className="flex rounded-md sm:text-base gap-1 text-white font-semibold items-center px-3  py-2 bg-gray-900"
                  >
                    <Eye size={20} />
                    View
                  </Link>
                  <Link
                    to={`/edit/${blog.id}`}
                    className="flex rounded-md sm:text-base gap-1 text-white font-semibold items-center px-3  py-2 bg-gray-900"
                  >
                    <SquarePen size={20} />
                    Edit
                  </Link>
                  <Button onClick={() => {
                      setMarkDelete({
                        id: blog.id,
                        visible: true,
                      });
                    }} variant="danger" className="flex gap-1 justify-center items-center"><Trash size={20} />
                  Delete</Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
