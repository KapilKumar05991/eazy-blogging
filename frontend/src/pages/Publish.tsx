import { FormEvent, useState } from "react";
import Button from "../components/Button";
import Tiptap from "../components/text_editor/TipTap";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { X } from "lucide-react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../hooks/hooks";
import { fetchUserBlogs } from "../features/userSlice";
import { toast } from "sonner";
import { BlogCreateInput } from "../common/index";
import LabelledInput from "../components/LabelledInput";
import { clearBlogSlice } from "../features/blogSlice";

const Publish = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  async function handlePublish() {
    if (!(title && description && content)) {
      return;
    }
    setIsSubmitting(true);
    try {
      const inputs: BlogCreateInput = {
        title,
        description,
        content,
        tags,
      };
      await axios.post(`${BACKEND_URL}/api/v1/blog`, inputs, {
        headers: { Authorization: `Berear ${localStorage.getItem("token")}` },
      });
      dispatch(fetchUserBlogs());
      dispatch(clearBlogSlice())
      toast.success("Blog Published");
      navigate("/dashboard");
    } catch (e) {
      toast.error("Blog Published Failed!!");
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

  return (
    <div className="container max-w-5xl 2xl:max-w-7xl p-4 sm:p-6 m-auto">
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
        }}
        className="border bg-white mt-4 p-6 space-y-4 rounded-md shadow-md border-gray-400"
      >
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Create new blog post
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Fill in the details below to publish a new blog post.
          </p>
        </div>
        <div>
          <LabelledInput
            label="Title"
            placeholder="Enter Blog title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="sm:min-w-full"
          />
          <p className="text-sm md:text-base text-gray-600">
            Main title of the blog post *
          </p>
        </div>
        <div>
          <LabelledInput
            placeholder="Enter short description."
            value={description}
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="sm:min-w-full"
          />
          <p className="text-sm md:text-base text-gray-600">
            Write a objective of blog or short summary *
          </p>
        </div>
        <div>
          
          <div className="flex justify-between mt-2 items-end gap-6">
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
          <p className="text-sm md:text-base mt-1 text-gray-600">Add relevent tags (Maximum-3)</p>
        </div>
        <div>
          <Tiptap setContent={setContent} />
        </div>
        <div className="flex gap-4">
          <Button
            variant="secondary"
            onClick={handlePublish}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing ..." : "Publish"}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Publish;
