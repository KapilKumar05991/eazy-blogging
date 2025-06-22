import { Link } from "react-router";
import useDate from "../hooks/useDate";
import useColor from "../hooks/useColor";
import useLetter from "../hooks/useLetter";
import { Blog } from "../types/type";
import { Dot } from "lucide-react";
import useReadTime from "../hooks/useReadTime";

interface Props {
  blog: Blog;
}

const BlogCard = ({ blog }: Props) => {
  const date = useDate(blog.created_at);
  const color = useColor(blog.author.name);
  const letters = useLetter(blog.author.name);
  const readTime = useReadTime(blog.content);
  return (
    <article className="flex max-w-5xl 2xl:max-w-7xl flex-col items-start justify-between bg-white/10 py-2 px-4 rounded-md">
      <div className="transition all ease-in-out hover:scale-105">
        <div className="text-sm sm:text-base">
          <div className="flex">
            <time dateTime="2025-03-25">{date}</time>
            <p className="flex">
              <Dot size={20} /> {readTime} Min(s) read
            </p>
          </div>
          <div className="mt-2 flex items-center gap-1 flex-wrap">
            {blog.tags.map((tag: any, index: number) => (
              <Link
                to="#"
                key={index}
                className="relative z-10 text-xs rounded-full bg-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-300"
              >
                {tag.tag}
              </Link>
            ))}
          </div>
        </div>
        <Link to={`/blog/${blog.id}`}>
          <div className="group relative">
            <h3 className="mt-2 text-2xl sm:text-3xl font-bold line-clamp-3">
              {blog.title}
            </h3>
            <p className="mt-4 text-base line-clamp-3">
              {blog.description}
            </p>
          </div>
        </Link>
      </div>
      <div className="relative mt-4 flex items-center gap-x-4">
        <span
          className={`size-10 font-semibold rounded-full flex items-center justify-center ${color}`}
        >
          {letters}
        </span>
        <div className="text-sm sm:text-base">
          <p className="font-semibold">
            <span className="text-inherit"></span>
            {blog.author.name}
          </p>
          <p>{blog.author.role}</p>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
