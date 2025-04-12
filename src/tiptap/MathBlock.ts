// MathBlock.ts
import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import MathBlockNodeView from './MathBlockNodeView';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    mathBlock: {
      insertMathBlock: () => ReturnType;
    };
  }
}

export const MathBlock = Node.create({
  name: 'mathBlock',
  group: 'block',
  atom: true,
  selectable: true,
  addAttributes() {
    return {
      latex: {
        default: '',
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="mathBlock"]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'mathBlock' }), 0];
  },
  addCommands() {
    return {
      insertMathBlock:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { latex: '' },
          });
        },
    };
  },
  addKeyboardShortcuts() {
    return {
      '`': () => this.editor.commands.insertMathBlock(),
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(MathBlockNodeView);
  },
});
