'use client';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { Box, CircularProgress, IconButton, Paper, Typography } from '@mui/material';
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
type ExtendedToastType = ToastType | 'info' | 'warning' | 'default';

// 默认 toast 高度
const DEFAULT_TOAST_HEIGHT = 80;

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

  // 新增位置计算相关属性
  index: number;
  totalToasts: number;
  expanded: boolean;
  gap: number;
  visibleToasts: number;
  getToastHeight?: (id: string) => number;
  toasts?: ToastInterface[];
}

// Toast 项样式
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
    boxShadow: theme.shadows[3],
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
      boxShadow: theme.shadows[6],
      transform: 'translateY(-2px)',
    },

    [theme.breakpoints.down('sm')]: {
      width: 'calc(100vw - 32px)',
    },
  };
});

// Toast 内容样式
const ToastContentStyled = styled('div', {
  name: 'MuiToast',
  slot: 'content',
})<{ ownerState: { type: ExtendedToastType } }>(({ theme, ownerState }) => {
  // 不同类型背景色
  const getBackgroundColor = (type: ExtendedToastType) => {
    switch (type) {
      case 'success':
        return theme.palette.success.light;
      case 'error':
        return theme.palette.error.light;
      case 'warning':
        return theme.palette.warning.light;
      case 'info':
      case 'message':
        return theme.palette.info.light;
      case 'loading':
      case 'promise':
        return theme.palette.background.paper;
      case 'action':
        return theme.palette.primary.light;
      case 'cancel':
        return theme.palette.grey[200];
      default:
        return theme.palette.background.paper;
    }
  };

  return {
    padding: theme.spacing(2),
    backgroundColor: getBackgroundColor(ownerState.type),
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    minHeight: '64px',
  };
});

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

// 关闭按钮
const CloseButton = styled(IconButton, {
  name: 'MuiToast',
  slot: 'closeButton',
})(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  padding: theme.spacing(0.5),
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
    const theme = useTheme();
    const isBottom = position.includes('bottom');

    const handleDismiss = () => {
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
        opacity: index < visibleToasts ? 1 : 0,
      } as React.CSSProperties;

      // 展开/折叠特定样式
      if (expanded) {
        return {
          ...style,
          transform: `translateY(${isBottom ? '-' : ''}${yOffset}px)`,
        };
      } else {
        return {
          ...style,
          transform: `translateY(${isBottom ? '-' : ''}${index * 16}px) scale(${1 - index * 0.05})`,
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
        onClick={handleDismiss}
      >
        <ToastContentStyled ownerState={{ type }}>
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
        </ToastContentStyled>
      </ToastItemStyled>
    );
  },
);

Toast.displayName = 'Toast';

export default Toast;
