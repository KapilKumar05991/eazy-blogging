// src/Tiptap.tsx
import { useEditor, EditorContent } from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import { memo } from "react";

// define your extension array
const extensions = [
  StarterKit.configure({
    bulletList:{
      HTMLAttributes:{
        class:'list-disc'
      }
    },
    orderedList:{
      HTMLAttributes:{
        class:'list-decimal'
      }
    }
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];
const mock = "<h2>Write your thoughts ...</h2>";

interface Prop{
  setContent:(content:any)=>void
  content?:string
}

const Tiptap = ({setContent,content}:Prop) => {
  const editor = useEditor({
    extensions,
    content:content || mock,
    editorProps: {
      attributes: {
        class: "tiptap min-h-lg font-serif p-4 focus:outline-none",
      },
    },
    onUpdate: () => {
      setContent(editor?.getHTML())
    }
  });

  return (
    <div className="flex flex-col border-1 border-slate-400 rounded-md min-h-[50vh] bg-slate-50">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default memo(Tiptap);
