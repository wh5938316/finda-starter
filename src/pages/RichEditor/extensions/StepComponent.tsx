import { Box, Typography } from '@mui/material';
import type { NodeViewProps } from '@tiptap/react';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import * as React from 'react';

type StepComponentProps = NodeViewProps;

const StepComponent = ({ editor, getPos }: StepComponentProps) => {
  // 计算当前步骤项的索引
  const calculateIndex = () => {
    if (typeof getPos === 'function') {
      const pos = getPos();
      const resolvedPos = editor.state.doc.resolve(pos);
      const { parent } = resolvedPos;
      const index = resolvedPos.index();

      // 如果父节点是stepper，直接返回索引
      if (parent.type.name === 'stepper') {
        return index;
      }

      // 否则尝试向上查找stepper节点
      const $pos = editor.state.doc.resolve(pos);
      for (let i = $pos.depth; i > 0; i--) {
        const node = $pos.node(i);
        if (node.type.name === 'stepper') {
          // 找到了stepper节点，计算当前step的索引
          const stepPos = $pos.before(i + 1);
          const stepperPos = $pos.before(i);
          const stepperNode = $pos.node(i);

          let index = 0;
          let found = false;

          stepperNode.forEach((child, offset) => {
            const childPos = stepperPos + offset + 1;
            if (childPos === stepPos) {
              found = true;
              return false; // 中断遍历
            }
            if (!found) index++;
          });

          return index;
        }
      }
    }

    return 0; // 默认索引
  };

  const stepIndex = calculateIndex();

  return (
    <NodeViewWrapper className="step-wrapper">
      <Box
        sx={{
          position: 'relative',
          mb: 4, // 增加步骤间距
          display: 'flex',
          flexDirection: 'column',
          pl: 1, // 轻微左边距，确保内容与数字对齐
        }}
      >
        {/* 步骤数字 */}
        <Box
          sx={{
            position: 'absolute',
            left: -41, // 调整圆圈位置
            top: 0,
            width: 32,
            height: 32,
            borderRadius: '50%',
            bgcolor: 'background.paper',
            border: '2px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            {stepIndex + 1}
          </Typography>
        </Box>

        <Box sx={{ ml: 0 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Step {stepIndex + 1}
          </Typography>
          <Box className={`step-content-${stepIndex}`} data-step-index={stepIndex}>
            <NodeViewContent className="step-content" />
          </Box>
        </Box>
      </Box>
    </NodeViewWrapper>
  );
};

export default StepComponent;
