import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

export default function SimpleTextEditor({setContent,content}:any) {
  return <SimpleEditor setContent={setContent} content={content} />
}
