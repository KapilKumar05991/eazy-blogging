import { FormEvent, useEffect, useState } from "react";
import Button from "../components/Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Angry, Loader2, X } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  clearBlogSlice,
  fetchBlogById,
  setBlogDetails,
  setBlogLoading,
} from "../features/blogSlice";
import { toast } from "sonner";
import { fetchUserBlogs } from "../features/userSlice";
import { BlogUpdateInput } from "../common/index";
import LabelledInput from "../components/LabelledInput";
import SimpleTextEditor from "../components/text_editor/v2/SimpleTextEditor";

const Edit = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBlogById(String(id)));
    return () => {
      dispatch(setBlogLoading(true));
    };
  }, []);

  const blog = useAppSelector((state) => state.blog.blogDetails[String(id)]);
  const loading = useAppSelector((state) => state.blog.blogLoading);
  const error = useAppSelector((state) => state.blog.error);

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setDescription(blog.description);
      setContent(blog.content);
      setTags(blog.tags.map((tag) => tag.tag));
    }
  }, [blog]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={45} />
      </div>
    );
  }

  async function handleUpdate() {
    if (!(title && description && content)) {
      return;
    }
    setIsSubmitting(true);
    try {
      const inputs:BlogUpdateInput = {
        title,
        description,
        content,
        tags,
      }
      await axios.put(
        `${BACKEND_URL}/api/v1/blog/${id}`,
        inputs
        ,
        {
          headers: { Authorization: `Berear ${localStorage.getItem("token")}` },
        }
      );

      const Tags = tags.map((tag: string) => ({ tag }));
      dispatch(
        setBlogDetails({ ...blog, title, description, content, tags: Tags })
      );
      toast.success('Blog Updated Successfully')
      dispatch(fetchUserBlogs())
      dispatch(clearBlogSlice())
      navigate("/dashboard");
    } catch (e) {
      toast.error('Blog Updating Failed!!')
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleAddTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag("");
    }
  };
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
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

  return (
    <div className="container max-w-5xl 2xl:max-w-7xl p-4 sm:p-6 m-auto">
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
        }}
        className="relative border bg-white/10 mt-4 p-6 space-y-4 rounded-md shadow-md border-gray-400"
      >
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">Edit Blog post</h1>
          <p className="text-sm sm:text-base">
            Update your blog post details below.
          </p>
        </div>
        <LabelledInput
            label="Title"
            placeholder="Enter Blog title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="sm:min-w-full"
          />
        <LabelledInput
            placeholder="Enter short description."
            value={description}
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="sm:min-w-full"
          />
        <div>
          
          
          <div className="flex mt-2 justify-between items-end gap-6">
          <LabelledInput
              label="Tags"
              placeholder="Add a tag"
              value={tag}
              className="md:min-w-xl lg:min-w-3xl"
              onChange={(e) => setTag(e.target.value)}
            />
            <Button variant="secondary" onClick={handleAddTag}>
              Add
            </Button>

          </div>
          <div className="mt-2 flex space-x-2 flex-wrap">
            {tags.length > 0 &&
              tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex gap-1 items-center rounded-md bg-gray-50 px-2 py-1 text-xs sm:text-sm font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                >
                  {tag}{" "}
                  <X
                    className="cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                    size={14}
                  />
                </span>
              ))}
          </div>
        </div>
        <div>
          <SimpleTextEditor setContent={setContent} content={blog.content}/>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={handleUpdate}
            disabled={isSubmitting}
            variant="secondary"
          >{isSubmitting ? "Updating ..." : "Update"}</Button>
          <Button variant="outline" onClick={()=>{navigate('/dashboard')}}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
