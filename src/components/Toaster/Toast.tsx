'use client';

import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Paper, PaperProps, Typography } from '@mui/material';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import * as React from 'react';

import { ToasterPosition } from './Toaster';
import { getToastUtilityClass } from './toastClasses';

// Toast属性接口
export interface ToastProps extends Omit<PaperProps, 'ref'> {
  /**
   * 通知内容
   */
  message: React.ReactNode;
  /**
   * 通知描述（可选）
   */
  description?: React.ReactNode;
  /**
   * 通知类型
   * @default 'default'
   */
  type?: 'info' | 'success' | 'warning' | 'error' | 'default';
  /**
   * 关闭回调函数
   */
  onClose?: () => void;
  /**
   * 自定义动画
   */
  animation?: string;
  /**
   * 组件内部状态
   */
  ownerState?: ToastOwnerState;
  /**
   * 自定义图标组件
   */
  slotIcon?: React.ElementType;
  /**
   * 图标组件的属性
   */
  slotIconProps?: Record<string, any>;
}

// Toast内部状态接口
export interface ToastOwnerState extends ToastProps {
  position: ToasterPosition;
  isNew?: boolean;
  isDeleting?: boolean;
}

// 获取组件样式类
const useUtilityClasses = (ownerState: ToastOwnerState) => {
  const { type, isNew, isDeleting } = ownerState;
  const slots = {
    root: [
      'root',
      type && `type${type.charAt(0).toUpperCase() + type.slice(1)}`,
      isNew && 'new',
      isDeleting && 'deleting',
    ],
    content: ['content'],
    message: ['message'],
    description: ['description'],
    closeButton: ['closeButton'],
  };

  return composeClasses(slots, getToastUtilityClass, {});
};

// 获取通知类型对应的背景色
const getBackgroundColor = (type: string | undefined, theme: any) => {
  switch (type) {
    case 'success':
      return theme.palette.success.light;
    case 'error':
      return theme.palette.error.light;
    case 'info':
      return theme.palette.info.light;
    case 'warning':
      return theme.palette.warning.light;
    default:
      return theme.palette.background.paper;
  }
};

// Toast根元素样式
const ToastRoot = styled(Paper, {
  name: 'MuiToast',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'ownerState' && prop !== 'animation',
})<{ ownerState: ToastOwnerState; animation?: string }>(({ theme, ownerState, animation }) => ({
  width: '100%',
  position: 'absolute',
  boxShadow: theme.shadows[3],
  overflow: 'hidden',
  transition: theme.transitions.create(['transform', 'opacity'], {
    duration: 300,
    easing: theme.transitions.easing.easeOut,
  }),
  cursor: 'default',

  // 添加间隔的伪元素
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    height: 'calc(var(--gap) + 1px)',
    bottom: '100%',
    width: '100%',
    pointerEvents: 'none', // 确保不会干扰鼠标事件
  },

  // 悬停效果
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'translateY(-2px)',
  },

  // 删除状态
  ...(ownerState.isDeleting && {
    pointerEvents: 'none',
  }),
}));

// 通知内容样式
const ToastContent = styled(Box, {
  name: 'MuiToast',
  slot: 'Content',
})<{ ownerState: ToastOwnerState }>(({ theme, ownerState }) => ({
  padding: theme.spacing(2),
  backgroundColor: getBackgroundColor(ownerState.type, theme),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  position: 'relative',
}));

// 通知消息样式
const ToastMessage = styled(Typography, {
  name: 'MuiToast',
  slot: 'Message',
})(({ theme }) => ({
  fontWeight: 500,
}));

// 通知描述样式
const ToastDescription = styled(Typography, {
  name: 'MuiToast',
  slot: 'Description',
})(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

// 关闭按钮样式
const CloseButton = styled(IconButton, {
  name: 'MuiToast',
  slot: 'CloseButton',
})(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  padding: theme.spacing(0.5),
}));

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(function Toast(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiToast' });
  const {
    message,
    description,
    type = 'default',
    onClose,
    animation,
    ownerState: ownerStateProp,
    slotIcon: IconComponent,
    slotIconProps = {},
    ...other
  } = props;

  const ownerState = {
    ...props,
    type,
    ...ownerStateProp,
  };

  const classes = useUtilityClasses(ownerState as ToastOwnerState);

  return (
    <ToastRoot
      ref={ref}
      elevation={3}
      className={classes.root}
      ownerState={ownerState as ToastOwnerState}
      animation={animation}
      {...other}
    >
      <ToastContent className={classes.content} ownerState={ownerState as ToastOwnerState}>
        {IconComponent && <IconComponent {...slotIconProps} />}

        <ToastMessage variant="body1" className={classes.message}>
          {message}
        </ToastMessage>

        {description && (
          <ToastDescription variant="body2" className={classes.description}>
            {description}
          </ToastDescription>
        )}

        {onClose && (
          <CloseButton
            size="small"
            aria-label="关闭通知"
            onClick={onClose}
            className={classes.closeButton}
          >
            <CloseIcon fontSize="small" />
          </CloseButton>
        )}
      </ToastContent>
    </ToastRoot>
  );
});

Toast.displayName = 'Toast';

export default Toast;
