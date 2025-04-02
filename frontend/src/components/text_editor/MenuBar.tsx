import { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  CodeSquare,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  SeparatorHorizontal,
  Strikethrough,
  Text,
  Undo,
  WrapText,
} from "lucide-react";
interface Prop {
  editor: Editor|null;
}
const MenuBar = ({ editor }: Prop) => {
  if (!editor) {
    return null;
  }
  const Options = [
    {
      icon: <Heading1 size={20} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 size={20} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 size={20} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Heading4 size={20} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      pressed: editor.isActive("heading", { level: 4 }),
    },
    {
      icon: <Text size={20} />,
      onClick: () => editor.chain().focus().setParagraph().run(),
      pressed: editor.isActive("paragraph"),
    },
    {
      icon: <Bold size={20} />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic size={20} />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough size={20} />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <Code size={20} />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      pressed: editor.isActive('code'),
    },
    {
      icon: <WrapText size={20} />,
      onClick: () => editor.chain().focus().setHardBreak().run(),
      pressed: false,
    },
    {
      icon: <Quote size={20} />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      pressed: editor.isActive('blockquote'),
    },
    {
      icon: <AlignLeft size={20} />,
      onClick: () => () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter size={20} />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight size={20} />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <AlignJustify size={20} />,
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      pressed: editor.isActive({ textAlign: "justify" }),
    },
    {
      icon: <List size={20} />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive('bulletList')
    },
    {
      icon: <ListOrdered size={20} />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive('orderedList'),
    },
    {
      icon: <CodeSquare size={20} />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      pressed: editor.isActive('codeBlock'),
    },
    {
      icon: <SeparatorHorizontal size={20} />,
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      pressed: false,
    },
    {
      icon: <Undo size={20} />,
      onClick: () => editor.chain().focus().undo().run(),
      pressed: false,
    },
    {
      icon: <Redo size={20} />,
      onClick: () => editor.chain().focus().redo().run(),
      pressed: false,
    },
  ];
  return (
    <div className="p-1 border-1 border-slate-300 rounded-md bg-slate-100">
      <div className="flex flex-wrap justify-center items-center">
        {Options.map((option, index) => (
          <button
            key={index}
            onClick={option.onClick}
            className={`m-1 p-2  border border-slate-200 rounded-full hover:text-amber-400 focus:z-10 focus:ring-2  ${
              option.pressed ? "bg-sky-200" : "bg-slate-50"
            }`}
          >
            {option.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuBar;
