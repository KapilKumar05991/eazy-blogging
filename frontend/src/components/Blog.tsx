import DomPurify from "dompurify";
import useDate from "../hooks/useDate";
import useColor from "../hooks/useColor";
import useLetter from "../hooks/useLetter";
import { Blog as BlogType } from "../types/type";
import { Dot } from "lucide-react";
import useReadTime from "../hooks/useReadTime";
import { useEffect, useRef } from "react";
import hljs from "highlight.js";

interface Props {
  blog: BlogType;
}
const Blog = ({ blog }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const date = useDate(blog.created_at);
  const letters = useLetter(blog.author.name);
  const color = useColor(blog.author.name);
  const readTime = useReadTime(blog.content);
  const pureHtml = DomPurify.sanitize(blog.content);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const codeBlocks = document.querySelectorAll("pre code");
    codeBlocks.forEach((block) => {
      const btn = block.querySelector("button");
      if (btn == null) {
        hljs.highlightElement(block as HTMLElement);
        const button = document.createElement("button");
        button.textContent = "Copy";
        button.addEventListener("click", () => {
          navigator.clipboard.writeText(block.textContent || "").then(() => {
            button.textContent = "Copied";
            setTimeout(() => {
              button.textContent = "Copy";
            }, 4000);
          });
        });
        block.append(button);
      }
    });
  }, [blog]);

  return (
    <div className="min-h-screen">
      <div>
        <div className="flex flex-wrap-reverse lg:flex-nowrap justify-between space-x-4">
          <div className="lg:w-3/5">
            <div className="text-4xl text-gray-900 font-bold">{blog.title}</div>
            <div className="pt-4 sm:text-lg text-gray-500 font-semibold flex items-center">
              <time dateTime="2020-03-16">Posted on {date}</time>
              <p className="flex">
                <Dot size={20} /> {readTime} Min(s) read
              </p>
            </div>
          </div>
          <div className="lg:w-2/5 p-2">
            <p className="font-medium sm:text-xl text-gray-500">Author</p>
            <div className="p-2 flex justify-center space-x-4">
              <span
                className={`size-10 min-w-10 font-semibold rounded-full flex items-center justify-center ${color}`}
              >
                {letters}
              </span>
              <div className="flex flex-col">
                <p className="font-bold text-2xl sm:text-3xl text-gray-900">
                  {blog.author.name}
                </p>
                <p className="text-gray-600 sm:text-lg font-semibold">
                  {blog.author.role}
                </p>
                <p className="text-gray-600 sm:text-lg font-normal">
                  {blog.author.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="blog-content font-serif"
          ref={containerRef}
          dangerouslySetInnerHTML={{ __html: pureHtml }}
        ></div>
      </div>
    </div>
  );
};

export default Blog;
