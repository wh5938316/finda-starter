'use client';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import SyncIcon from '@mui/icons-material/Sync';
import WarningIcon from '@mui/icons-material/Warning';
import { Box, Button, CircularProgress, IconButton, Paper, Typography } from '@mui/material';
import { keyframes, styled, useTheme } from '@mui/material/styles';
import React, { forwardRef } from 'react';

import { Toast as ToastInterface, ToastType } from './ToasterContext';

// 向上滑出动画
const swipeOutUp = keyframes`
  from {
    transform: translateY(var(--swipe-amount-y));
    opacity: 1;
  }

  to {
    transform: translateY(calc(var(--swipe-amount-y) - 100%));
    opacity: 0;
  }
`;

// 向下滑出动画
const swipeOutDown = keyframes`
  from {
    transform: translateY(var(--swipe-amount-y));
    opacity: 1;
  }

  to {
    transform: translateY(calc(var(--swipe-amount-y) + 100%));
    opacity: 0;
  }
`;

// 向上滑入动画
const swipeInUp = keyframes`
  from {
    transform: translateY(calc(var(--swipe-amount-y) + 100%));
    opacity: 0;
  }

  to {
    transform: translateY(var(--swipe-amount-y));
    opacity: 1;
  }
`;

// 向下滑入动画
const swipeInDown = keyframes`
  from {
    transform: translateY(calc(var(--swipe-amount-y) - 100%));
    opacity: 0;
  }

  to {
    transform: translateY(var(--swipe-amount-y));
    opacity: 1;
  }
`;

// 扩展 ToastType，添加额外的类型
type ExtendedToastType = ToastType | 'info' | 'warning' | 'default' | 'update' | 'delete';

// 默认 toast 高度
const DEFAULT_TOAST_HEIGHT = 80;

// 操作按钮接口
export interface ToastAction {
  label: string;
  onClick: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

// Toast 组件属性
export interface ToastProps {
  id: string | number;
  message: React.ReactNode;
  description?: React.ReactNode;
  type?: ExtendedToastType;
  isNew?: boolean;
  isExiting?: boolean;
  position: string;
  component?: React.ReactNode;
  onDismiss?: (id: string | number) => void;
  actions?: ToastAction[]; // 新增：操作按钮

  // 位置计算相关属性
  index: number;
  totalToasts: number;
  expanded: boolean;
  gap: number;
  visibleToasts: number;
  getToastHeight?: (id: string) => number;
  toasts?: ToastInterface[];
}

// Toast 项样式 - 更新为浅色设计
const ToastItemStyled = styled(Paper, {
  name: 'MuiToast',
  slot: 'root',
})<{
  ownerState: { isNew?: boolean; isExiting?: boolean; position: string; type: ExtendedToastType };
}>(({ theme, ownerState }) => {
  const [vertical] = ownerState.position.split('-');
  const isTop = vertical === 'top';

  // 根据位置选择对应的动画
  const enterAnimation = isTop ? swipeInDown : swipeInUp;
  const exitAnimation = isTop ? swipeOutUp : swipeOutDown;

  return {
    width: '356px',
    boxShadow: theme.shadows[2],
    overflow: 'hidden',
    position: 'absolute', // 始终使用绝对定位
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: 400,
    }),
    cursor: 'pointer',
    borderRadius: theme.shape.borderRadius,
    '--swipe-amount-y': '0px', // 默认滑动起始位置
    right: 0,
    left: 0,
    backgroundColor: theme.palette.background.paper, // 浅色背景

    // 不同类型的边框样式
    ...(ownerState.type === 'success' && {
      borderLeft: `4px solid ${theme.palette.success.main}`,
    }),
    ...(ownerState.type === 'error' && {
      borderLeft: `4px solid ${theme.palette.error.main}`,
    }),
    ...(ownerState.type === 'warning' && {
      borderLeft: `4px solid ${theme.palette.warning.main}`,
    }),
    ...(ownerState.type === 'info' && {
      borderLeft: `4px solid ${theme.palette.info.main}`,
    }),
    ...(ownerState.type === 'message' && {
      borderLeft: `4px solid ${theme.palette.primary.main}`,
    }),
    ...(ownerState.type === 'loading' && {
      borderLeft: `4px solid ${theme.palette.info.main}`,
    }),
    ...(ownerState.type === 'promise' && {
      borderLeft: `4px solid ${theme.palette.info.main}`,
    }),
    ...(ownerState.type === 'action' && {
      borderLeft: `4px solid ${theme.palette.primary.main}`,
    }),
    ...(ownerState.type === 'cancel' && {
      borderLeft: `4px solid ${theme.palette.grey[500]}`,
    }),
    ...(ownerState.type === 'default' && {
      borderLeft: `4px solid ${theme.palette.grey[500]}`,
    }),
    ...(ownerState.type === 'update' && {
      borderLeft: `4px solid ${theme.palette.info.main}`,
    }),
    ...(ownerState.type === 'delete' && {
      borderLeft: `4px solid ${theme.palette.warning.main}`,
    }),

    // 新通知滑入动画
    ...(ownerState.isNew && {
      animation: `${enterAnimation} 300ms ease-out forwards`,
    }),

    // 退出通知滑出动画
    ...(ownerState.isExiting && {
      animation: `${exitAnimation} 300ms ease-out forwards`,
      pointerEvents: 'none', // 禁用鼠标事件
    }),

    '&:hover': {
      boxShadow: theme.shadows[4],
    },

    [theme.breakpoints.down('sm')]: {
      width: 'calc(100vw - 32px)',
    },
  };
});

// Toast 内容样式 - 更新为浅色设计
const ToastContentStyled = styled('div', {
  name: 'MuiToast',
  slot: 'content',
})<{ ownerState: { type: ExtendedToastType } }>(({ theme, ownerState }) => {
  // 浅色设计不需要特殊背景色，使用白色或浅灰色背景
  return {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
  };
});

// 顶部内容区域（图标+消息）
const HeaderContent = styled(Box, {
  name: 'MuiToast',
  slot: 'header',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(1),
}));

// 图标容器
const IconContainer = styled(Box, {
  name: 'MuiToast',
  slot: 'icon',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
  flexShrink: 0,
  marginTop: '2px',
}));

// 内容区域
const ContentArea = styled(Box, {
  name: 'MuiToast',
  slot: 'contentArea',
})(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));

// 按钮容器
const ActionsContainer = styled(Box, {
  name: 'MuiToast',
  slot: 'actions',
})(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

// 关闭按钮
const CloseButton = styled(IconButton, {
  name: 'MuiToast',
  slot: 'closeButton',
})(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  padding: theme.spacing(0.5),
  color: theme.palette.text.secondary,
}));

// 获取类型对应的图标
const getIconByType = (type: ExtendedToastType) => {
  switch (type) {
    case 'success':
      return <CheckCircleIcon color="success" />;
    case 'error':
      return <ErrorIcon color="error" />;
    case 'warning':
      return <WarningIcon color="warning" />;
    case 'info':
    case 'message':
      return <InfoIcon color="info" />;
    case 'loading':
    case 'promise':
      return <CircularProgress size={24} color="info" />;
    case 'action':
      return <DoneIcon color="primary" />;
    case 'cancel':
      return <CancelIcon color="action" />;
    case 'update':
      return <SyncIcon color="info" />;
    case 'delete':
      return <DeleteIcon color="warning" />;
    default:
      return null;
  }
};

// 计算展开状态下的位置偏移
const calculateExpandedPosition = (
  index: number,
  toasts: ToastInterface[],
  gap: number,
  getToastHeight?: (id: string) => number,
): number => {
  // 计算当前 toast 前面所有 toast 的高度总和
  let totalOffset = 0;
  for (let i = 0; i < index; i++) {
    const toast = toasts[i];
    const height = getToastHeight ? getToastHeight(toast.id) : DEFAULT_TOAST_HEIGHT;
    totalOffset += height + gap;
  }
  return totalOffset;
};

// Toast 组件
const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      id,
      message,
      description,
      type = 'message' as ExtendedToastType,
      isNew,
      isExiting,
      position,
      component,
      onDismiss,
      actions = [], // 默认为空数组
      index,
      totalToasts,
      expanded,
      gap,
      visibleToasts,
      getToastHeight,
      toasts = [],
    },
    ref,
  ) => {
    const isBottom = position.includes('bottom');

    const handleDismiss = (e?: React.MouseEvent) => {
      if (e) {
        e.stopPropagation(); // 防止点击关闭按钮时触发整个toast的点击事件
      }
      if (onDismiss) {
        onDismiss(id);
      }
    };

    // 计算样式
    const getToastStyle = (): React.CSSProperties => {
      // 根据位置计算滑动初始值
      let swipeAmountY;
      let yOffset;

      if (expanded) {
        yOffset = calculateExpandedPosition(index, toasts, gap, getToastHeight);
        swipeAmountY = `${isBottom ? '-' : ''}${yOffset}px`;
      } else {
        swipeAmountY = `${isBottom ? '-' : ''}${index * 30}%`;
      }

      // 通用样式
      const style = {
        '--gap': `${gap}px`,
        '--swipe-amount-y': swipeAmountY,
        zIndex: totalToasts - index,
        bottom: isBottom ? 0 : 'auto',
        top: !isBottom ? 0 : 'auto',
      } as React.CSSProperties;

      // 展开/折叠特定样式
      if (expanded) {
        return {
          ...style,
          transform: `translateY(${isBottom ? '-' : ''}${yOffset}px)`,
        };
      } else {
        // 折叠状态下的样式
        // 获取前一个toast的高度（考虑到toasts是按创建时间从新到旧排序的）
        let height;
        if (index === 0) {
          // 第一个toast使用默认高度或通过getToastHeight获取
          height = getToastHeight ? getToastHeight(id.toString()) : DEFAULT_TOAST_HEIGHT;
        } else if (toasts.length > index - 1) {
          // 不是第一个toast，使用前一个toast的高度
          const previousToastId = toasts[index - 1]?.id;
          height =
            previousToastId && getToastHeight
              ? getToastHeight(previousToastId.toString())
              : DEFAULT_TOAST_HEIGHT;
        } else {
          height = DEFAULT_TOAST_HEIGHT;
        }

        return {
          ...style,
          transform: `translateY(${isBottom ? '-' : ''}${index * 16}px) scale(${1 - index * 0.05})`,
          height: `${height}px`, // 设置高度为前一个toast的高度
        };
      }
    };

    // 自定义组件渲染
    if (type === 'custom' && component) {
      return (
        <ToastItemStyled
          ref={ref}
          ownerState={{ isNew, isExiting, position, type }}
          style={getToastStyle()}
          onClick={handleDismiss}
        >
          {component}
        </ToastItemStyled>
      );
    }

    // 无样式 headless 组件渲染
    if (type === 'headless') {
      return (
        <Box
          ref={ref}
          style={{
            ...getToastStyle(),
            position: 'absolute',
            animation: isNew
              ? `${position.includes('top') ? swipeInDown : swipeInUp} 300ms ease-out forwards`
              : isExiting
                ? `${position.includes('top') ? swipeOutUp : swipeOutDown} 300ms ease-out forwards`
                : 'none',
          }}
        >
          {message}
        </Box>
      );
    }

    // 标准 Toast 组件渲染
    return (
      <ToastItemStyled
        ref={ref}
        ownerState={{ isNew, isExiting, position, type }}
        style={getToastStyle()}
      >
        <ToastContentStyled ownerState={{ type }}>
          <HeaderContent>
            <IconContainer>{getIconByType(type)}</IconContainer>
            <ContentArea>
              <Typography variant="body1" fontWeight="500">
                {message}
              </Typography>
              {description && (
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              )}
            </ContentArea>
            <CloseButton size="small" onClick={handleDismiss}>
              <CloseIcon fontSize="small" />
            </CloseButton>
          </HeaderContent>

          {/* 添加操作按钮 */}
          {actions.length > 0 && (
            <ActionsContainer>
              {actions.map((action, actionIndex) => (
                <Button
                  key={actionIndex}
                  variant={action.variant || 'contained'}
                  color={action.color || 'primary'}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick();
                  }}
                  size="small"
                >
                  {action.label}
                </Button>
              ))}
            </ActionsContainer>
          )}
        </ToastContentStyled>
      </ToastItemStyled>
    );
  },
);

Toast.displayName = 'Toast';

export default Toast;
