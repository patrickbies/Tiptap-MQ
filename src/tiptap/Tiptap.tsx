// Editor.tsx
import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { MathBlock } from './MathBlock';

const Editor: React.FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      MathBlock,
    ]
  });

  return <EditorContent editor={editor} className='border-1 border-black p-2 outline-none'/>;
};

export default Editor;
