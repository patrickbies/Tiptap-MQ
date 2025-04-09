import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const extensions = [StarterKit]

const Tiptap = () => {
  return (
    <EditorProvider
      extensions={extensions}
      editorContainerProps={{
        className: 'border-1 border-black p-2 outline-none',
      }}
    />
  )
}

export default Tiptap
