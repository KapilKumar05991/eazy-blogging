import DomPurify from "dompurify";
import useDate from "../hooks/useDate";
import useColor from "../hooks/useColor";
import useLetter from "../hooks/useLetter";
import { Blog as BlogType } from "../types/type";
import { Dot, ShareIcon } from "lucide-react";
import useReadTime from "../hooks/useReadTime";
import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import { toast } from "sonner";
import { useLocation } from "react-router";

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

  let location = useLocation()
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
        button.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/></svg>';
        button.addEventListener("click", () => {
          navigator.clipboard.writeText(block.textContent || "").then(() => {
            toast.success("Copied");
          });
        });
        block.parentElement?.classList.add("relative");
        button.classList.add("copy-button");
        block.append(button);
      }
    });
  }, [blog]);

  return (
    <div className="min-h-screen">
      <div>
        <div className="flex flex-wrap-reverse lg:flex-nowrap justify-between space-x-4">
          <div className="lg:w-3/5">
            <div className="text-4xl font-bold">{blog.title}</div>
            <div className="pt-4 sm:text-lg font-semibold flex items-center">
              <time dateTime="2020-03-16">Posted on {date}</time>
              <p className="flex">
                <Dot size={20} />
                {readTime} Min(s) read
                <button
                  onClick={() => {
                    let url = 'https://eazy-blogging.vercel.app'+location.pathname + location.search + location.hash
                    navigator.clipboard
                      .writeText(url)
                      .then(() => {
                        toast.success("Link Copied");
                      });
                  }}
                >
                  <ShareIcon className="ml-4 cursor-pointer" size={20} />
                </button>
              </p>
            </div>
          </div>
          <div className="lg:w-2/5 p-2">
            <p className="font-medium sm:text-xl">Author</p>
            <div className="p-2 flex justify-center space-x-4">
              <span
                className={`size-10 min-w-10 font-semibold rounded-full flex items-center justify-center ${color}`}
              >
                {letters}
              </span>
              <div className="flex flex-col">
                <p className="font-bold text-2xl sm:text-3xl">
                  {blog.author.name}
                </p>
                <p className="sm:text-lg font-semibold">{blog.author.role}</p>
                <p className="sm:text-lg font-normal">{blog.author.bio}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tiptap ProseMirror "
          ref={containerRef}
          dangerouslySetInnerHTML={{ __html: pureHtml }}
        ></div>
      </div>
    </div>
  );
};

export default Blog;
