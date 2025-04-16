import './steps.css';

import { Add } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import type { NodeViewProps } from '@tiptap/react';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import * as React from 'react';

type StepperComponentProps = NodeViewProps;

const StepperComponent = ({ editor, getPos, node }: StepperComponentProps) => {
  const addNewStep = () => {
    if (typeof getPos === 'function') {
      const pos = getPos();

      // 找到stepper节点的结束位置
      const stepperEndPos = pos + node.nodeSize - 1;

      // 使用insertContentAt在stepper末尾插入一个新的step
      editor.commands.insertContentAt(stepperEndPos, {
        type: 'step',
        content: [
          {
            type: 'paragraph',
          },
        ],
      });

      // 聚焦到编辑器
      editor.commands.focus();
    }
  };

  const isEditable = editor.view.editable;

  return (
    <NodeViewWrapper className="stepper-wrapper">
      <Box sx={{ position: 'relative', mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            ml: 4, // 调整左边距，确保内容有足够空间，原为5
          }}
        >
          {/* 步骤指示线 - 只在编辑模式下显示 */}
          {isEditable && (
            <Box
              sx={{
                position: 'absolute',
                left: -25, // 调整连接线位置
                top: 16,
                bottom: isEditable ? 16 : 'auto', // 在非编辑模式下不延伸到底部
                width: 2,
                bgcolor: 'divider',
                zIndex: 0,
              }}
            />
          )}

          {/* 步骤内容区域 - 使用NodeViewContent作为容器来渲染所有step节点 */}
          <NodeViewContent className="stepper-content" />

          {/* 添加按钮 - 只在编辑模式下显示 */}
          {isEditable && (
            <IconButton
              onClick={addNewStep}
              sx={{
                position: 'absolute',
                left: -25, // 将按钮与连接线对齐
                bottom: -16,
                transform: 'translateX(-50%)', // 居中对齐按钮
                bgcolor: 'background.paper',
                border: '2px solid',
                borderColor: 'divider',
                zIndex: 1,
              }}
              size="small"
            >
              <Add fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>
    </NodeViewWrapper>
  );
};

export default StepperComponent;
