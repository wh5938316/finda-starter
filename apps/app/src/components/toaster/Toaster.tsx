'use client';

import { Box, Button } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import Toast from './Toast';
import { Toast as ToastInterface, useToast } from './ToasterContext';

// Toaster 属性
export interface ToasterProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  gap?: number;
  expand?: boolean;
  expandByDefault?: boolean;
  visibleToasts?: number; // 可见 toast 数量
  expandOnHover?: boolean; // 鼠标悬停时是否自动展开
}

// 固定的 toasts 列表容器
const ToasterContainer = styled(Box, {
  name: 'MuiToaster',
  slot: 'root',
})<{ ownerState: { position: string } }>(({ theme, ownerState }) => {
  const [vertical, horizontal] = ownerState.position.split('-');

  return {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    zIndex: theme.zIndex.snackbar,

    // 定位
    ...(vertical === 'top' ? { top: '24px' } : { bottom: '24px' }),
    ...(horizontal === 'left' ? { left: '24px' } : { right: '24px' }),

    // 移动端响应式
    [theme.breakpoints.down('sm')]: {
      ...(vertical === 'top' ? { top: '16px' } : { bottom: '16px' }),
      ...(horizontal === 'left' ? { left: '16px' } : { right: '16px' }),
    },
  };
});

// 默认 toast 高度
const DEFAULT_TOAST_HEIGHT = 80;

// 主 Toaster 组件
const Toaster: React.FC<ToasterProps> = ({
  position = 'bottom-right',
  gap = 14,
  expand = true,
  expandByDefault = true,
  visibleToasts = 3, // 默认可见3个 toast
  expandOnHover = true, // 默认启用鼠标悬停时自动展开
}) => {
  const theme = useTheme();
  const { toasts, dismissToast } = useToast();
  const [expanded, setExpanded] = useState(expandByDefault);
  const toastRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [isHovering, setIsHovering] = useState(false); // 是否正在悬停

  // 获取toast高度
  const getToastHeight = (id: string) => {
    return toastRefs.current[id]?.clientHeight || DEFAULT_TOAST_HEIGHT;
  };

  // 处理鼠标悬停事件
  const handleMouseEnter = () => {
    setIsHovering(true);
    if (expandOnHover && !expanded) {
      setExpanded(true);
    }
  };

  // 处理鼠标离开事件
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (expandOnHover && expanded && !expandByDefault) {
      setExpanded(false);
    }
  };

  // 处理展开/折叠按钮点击
  const handleExpandToggle = () => {
    const newExpandedState = !expanded;
    setExpanded(newExpandedState);

    // 如果手动折叠，我们需要记住这个状态，即使鼠标再次悬停
    if (!newExpandedState) {
      // 用户手动折叠了，暂时禁用悬停自动展开，直到鼠标再次离开
      setIsHovering(false);
    }
  };

  // 在展开状态下计算容器高度
  // useEffect(() => {
  //   if (expanded && toasts.length > 0) {
  //     // 更新每个 toast 的高度
  //     const heightsWithGap = toasts.map((toast) => {
  //       return getToastHeight(toast.id) + gap;
  //     });

  //     // 计算总高度
  //     const totalHeight = heightsWithGap.reduce((sum, height) => sum + height, 0);
  //     setContainerHeight(totalHeight);
  //   } else {
  //     setContainerHeight(100); // 折叠状态下固定高度
  //   }
  // }, [expanded, toasts.length, gap]);

  // 获取ref回调函数
  const getRefCallback = (id: string) => (element: HTMLDivElement | null) => {
    toastRefs.current[id] = element;
  };

  // 对toasts按创建时间从新到旧排序
  const sortedToasts = useMemo(() => {
    return toasts.sort((a, b) => b.createdAt - a.createdAt).slice(0, visibleToasts + 1);
  }, [toasts, visibleToasts]);

  const containerHeight = useMemo(() => {
    if (expanded) {
      return sortedToasts.length * getToastHeight(sortedToasts[0].id);
    }

    return 100;
  }, [expanded, sortedToasts, gap]);

  return (
    <>
      {/* Toast 容器 */}
      <ToasterContainer
        ownerState={{ position }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* 展开/折叠按钮 */}
        {toasts.length > 1 && expand && (
          <Button
            variant="contained"
            size="small"
            sx={{
              alignSelf: position.includes('right') ? 'flex-end' : 'flex-start',
              mb: position.includes('bottom') ? 1 : 0,
              mt: position.includes('top') ? 1 : 0,
            }}
            onClick={handleExpandToggle}
          >
            {expanded ? '折叠' : '展开'} ({toasts.length})
          </Button>
        )}

        {/* Toast 列表 */}
        <Box
          sx={{
            position: 'relative',
            width: '356px',
            height: expanded ? `${containerHeight}px` : '100px', // 使用计算的容器高度
            transition: 'height 0.3s ease',
            [theme.breakpoints.down('sm')]: {
              width: 'calc(100vw - 32px)',
            },
          }}
        >
          {/* 渲染排序后的toasts */}
          {sortedToasts.slice(0, visibleToasts + 1).map((toast, index) => (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              description={toast.description}
              type={toast.type}
              isNew={toast.isNew}
              isExiting={toast.isExiting}
              position={position}
              component={toast.component}
              onDismiss={() => dismissToast(toast.id)}
              // 使用函数引用回调代替直接的ref属性
              // @ts-ignore - 类型问题暂时忽略
              ref={(element) => getRefCallback(toast.id)(element)}
              // 传递必要信息让Toast自己计算位置
              index={index}
              totalToasts={sortedToasts.length}
              expanded={expanded}
              gap={gap}
              visibleToasts={visibleToasts}
              getToastHeight={getToastHeight}
              toasts={sortedToasts}
            />
          ))}
        </Box>
      </ToasterContainer>
    </>
  );
};

export default Toaster;
