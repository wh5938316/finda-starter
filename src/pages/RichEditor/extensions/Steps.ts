import { mergeAttributes,Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import StepComponent from './StepComponent';
import StepperComponent from './StepperComponent';

// 创建Step节点
export const Step = Node.create({
  name: 'step',

  group: 'block',

  content: 'block+',

  defining: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="step"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'step' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(StepComponent);
  },
});

// 创建Stepper节点 (容器)
export const Stepper = Node.create({
  name: 'stepper',

  group: 'block',

  content: 'step+',

  defining: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="stepper"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'stepper' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(StepperComponent);
  },
});

export default Stepper;
