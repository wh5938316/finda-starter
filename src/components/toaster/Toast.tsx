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
import { Button, CircularProgress, IconButton } from '@mui/material';
import { keyframes, styled, useThemeProps } from '@mui/material/styles';
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
  id: string;
  message: React.ReactNode;
  description?: React.ReactNode;
  type?: ExtendedToastType;
  isNew?: boolean;
  isExiting?: boolean;
  position: string;
  component?: React.ReactNode;
  onDismiss?: (id: string | number) => void;
  actions?: ToastAction[]; // 操作按钮

  // 位置计算相关属性
  index: number;
  totalToasts: number;
  expanded: boolean;
  gap: number;
  visibleToasts: number;
  getToastHeight?: (id: string) => number;
  toasts?: ToastInterface[];
  onHeightChange?: (id: string | number, height: number) => void;
  getFirstToastId: () => string;
}

// 拆分为位置容器和外观组件

// 1. 最外层位置容器 - 只负责位置、动画等，不涉及外观
const ToastPositioner = styled('div', {
  name: 'MuiToast',
  slot: 'positioner',
})<{
  ownerState: { isNew?: boolean; isExiting?: boolean; position: string };
}>(({ theme, ownerState }) => {
  const [vertical] = ownerState.position.split('-');
  const isTop = vertical === 'top';

  // 根据位置选择对应的动画
  const enterAnimation = isTop ? swipeInDown : swipeInUp;
  const exitAnimation = isTop ? swipeOutUp : swipeOutDown;

  return {
    width: '356px',
    position: 'absolute', // 绝对定位用于位置控制
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: 400,
    }),
    '--swipe-amount-y': '0px', // 默认滑动起始位置
    right: 0,
    left: 0,
    opacity: 0,

    // 新通知滑入动画
    ...(ownerState.isNew && {
      animation: `${enterAnimation} 300ms ease-out forwards`,
    }),

    // 退出通知滑出动画
    ...(ownerState.isExiting && {
      animation: `${exitAnimation} 300ms ease-out forwards`,
      pointerEvents: 'none', // 禁用鼠标事件
    }),

    [theme.breakpoints.down('sm')]: {
      width: 'calc(100vw - 32px)',
    },
  };
});

// 2. Toast外观容器 - 负责Toast的视觉样式
const ToastRoot = styled('div', {
  name: 'MuiToast',
  slot: 'root',
})<{
  ownerState: { type: ExtendedToastType };
}>(({ theme, ownerState }) => ({
  boxShadow: theme.shadows[2],
  overflow: 'hidden',
  cursor: 'pointer',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  width: '100%',

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

  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

// 3. Toast内容容器
const ToastContent = styled('div', {
  name: 'MuiToast',
  slot: 'content',
})(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  position: 'relative',
  width: '100%',
}));

// 4. 标题区域（图标+消息）
const ToastHeader = styled('div', {
  name: 'MuiToast',
  slot: 'header',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
}));

// 5. 图标容器
const ToastIcon = styled('div', {
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

// 6. 内容区域
const ToastMessage = styled('div', {
  name: 'MuiToast',
  slot: 'message',
})(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));

// 7. 按钮容器
const ToastActions = styled('div', {
  name: 'MuiToast',
  slot: 'actions',
})(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

// 8. 关闭按钮
const ToastCloseButton = styled(IconButton, {
  name: 'MuiToast',
  slot: 'closeButton',
})(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  padding: theme.spacing(0.5),
  color: theme.palette.text.secondary,
}));

// 9. 文本元素
const ToastTitle = styled('div', {
  name: 'MuiToast',
  slot: 'title',
})(({ theme }) => ({
  fontWeight: 500,
  fontSize: '0.875rem',
  lineHeight: 1.5,
}));

const ToastDescription = styled('div', {
  name: 'MuiToast',
  slot: 'description',
})(({ theme }) => ({
  fontSize: '0.75rem',
  lineHeight: 1.5,
  color: theme.palette.text.secondary,
}));

// 11. Headless 容器
const ToastHeadlessContainer = styled('div', {
  name: 'MuiToast',
  slot: 'headless',
})(({ theme }) => ({
  position: 'absolute',
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
  let totalOffset = 0;
  for (let i = 0; i < index; i++) {
    const toast = toasts[i];
    const height = getToastHeight ? getToastHeight(toast.id) : DEFAULT_TOAST_HEIGHT;
    totalOffset += height + gap;
  }
  return totalOffset;
};

// Toast 组件
const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiToast' });
  const {
    id,
    message,
    description,
    type = 'message' as ExtendedToastType,
    isNew,
    isExiting,
    position,
    component,
    onDismiss,
    actions = [],
    index,
    totalToasts,
    expanded,
    gap,
    visibleToasts,
    getToastHeight,
    toasts = [],
    onHeightChange,
    getFirstToastId,
  } = props;

  const [mounted, setMounted] = React.useState(false);
  const isBottom = position.includes('bottom');
  const toastRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // 测量和更新高度
  React.useEffect(() => {
    const toastNode = toastRef.current;
    if (toastNode) {
      const height = toastNode.getBoundingClientRect().height;
      if (onHeightChange) {
        onHeightChange(id, height);
      }
    }
  }, [id, onHeightChange, message, description, actions.length]);

  const handleDismiss = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (onDismiss) {
      onDismiss(id);
    }
  };

  // 计算样式
  const getToastStyle = (): React.CSSProperties => {
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
      '--y': mounted ? '0px' : '-100%',
      '--scale': '1',
      zIndex: totalToasts - index,
      bottom: isBottom ? 0 : 'auto',
      top: !isBottom ? 0 : 'auto',
      opacity: mounted ? (index < visibleToasts ? 1 : 0) : 0,
      transform: 'translateY(var(--y)) scale(var(--scale))',
    } as React.CSSProperties;

    // 展开/折叠特定样式
    if (expanded) {
      return {
        ...style,
        '--y': mounted ? `${isBottom ? '-' : ''}${yOffset}px` : '100%',
      } as React.CSSProperties;
    } else {
      // 折叠状态下的样式
      let height;
      if (index === 0) {
        height = 'auto';
      } else {
        const firstToastId = getFirstToastId();
        height = firstToastId && getToastHeight ? getToastHeight(firstToastId) : 'auto';
      }

      return {
        ...style,
        '--y': mounted ? `${isBottom ? '-' : ''}${index * 16}px` : '100%',
        '--scale': `calc(1 - ${index * 0.05})`,
        height: typeof height === 'number' ? `${height}px` : height,
      } as React.CSSProperties;
    }
  };

  // 自定义组件渲染
  if (type === 'custom' && component) {
    return (
      <ToastPositioner
        ref={toastRef}
        ownerState={{ isNew, isExiting, position }}
        style={getToastStyle()}
      >
        {component}
      </ToastPositioner>
    );
  }

  // 无样式 headless 组件渲染
  if (type === 'headless') {
    return (
      <ToastHeadlessContainer ref={toastRef} style={getToastStyle()}>
        {message}
      </ToastHeadlessContainer>
    );
  }

  // 标准 Toast 组件渲染
  const positionerProps = { isNew, isExiting, position };
  const rootProps = { type };

  return (
    <ToastPositioner ref={toastRef} ownerState={positionerProps} style={getToastStyle()}>
      <ToastRoot ownerState={rootProps} onClick={handleDismiss}>
        <ToastContent>
          <ToastHeader>
            <ToastIcon>{getIconByType(type)}</ToastIcon>
            <ToastMessage>
              <ToastTitle>{message}</ToastTitle>
              {description && <ToastDescription>{description}</ToastDescription>}
            </ToastMessage>
            <ToastCloseButton size="small" onClick={handleDismiss}>
              <CloseIcon fontSize="small" />
            </ToastCloseButton>
          </ToastHeader>

          {actions.length > 0 && (
            <ToastActions>
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
            </ToastActions>
          )}
        </ToastContent>
      </ToastRoot>
    </ToastPositioner>
  );
});

// 增加组件类型定义
export default Toast;
