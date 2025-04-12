// MathBlockNodeView.tsx
import React, { useEffect, useRef } from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';

const MathBlockNodeView: React.FC<NodeViewProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mathFieldRef = useRef<any>(null);

  useEffect(() => {
    // Get the Desmos MathQuill interface (v2)
    const MQ = (window as any).MathQuill.getInterface(2);
    if (containerRef.current) {
      mathFieldRef.current = MQ.MathField(containerRef.current, {
        spaceBehavesLikeTab: true,
        leftRightIntoCmdGoes: 'up',
        restrictMismatchedBrackets: false,
        sumStartsWithNEquals: true,
        supSubsRequireOperand: true,
        charsThatBreakOutOfSupSub: '+-=<>',
        autoCommands: 'pi theta sqrt sum int prod epsilon',
        autoOperatorNames: 'only',
        handlers: {
          edit: () => {
            // Update the node’s latex attribute on edit.
            const latex = mathFieldRef.current.latex();
            props.updateAttributes({ latex });
          },
          moveOutOf: (dir: string) => {
            // When MathQuill detects an arrow key at the edge,
            // call back to TipTap so that the selection moves out of the math block.
            // For left arrow:
            if (dir === MQ.L && props.getPos) {
              const pos = props.getPos();
              // Set the TipTap selection just before this node.
              props.editor.chain().focus().setTextSelection(pos).run();
            }
            // For right arrow:
            if (dir === MQ.R && props.getPos) {
              const pos = props.getPos();
              // Set the TipTap selection just after this node.
              props.editor.chain().focus().setTextSelection(pos + props.node.nodeSize).run();
            }
          }
        }
      });

      // Initialize the MathField with the node’s LaTeX content.
      if (props.node.attrs.latex) {
        mathFieldRef.current.latex(props.node.attrs.latex);
      }
    }
  }, [props]);

  return (
    <NodeViewWrapper className="mathblock-node-view">
      <div ref={containerRef} />
    </NodeViewWrapper>
  );
};

export default MathBlockNodeView;
