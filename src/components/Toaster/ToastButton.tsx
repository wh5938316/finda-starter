'use client';

import { Button, ButtonProps } from '@mui/material';
import * as React from 'react';

import { useToast } from './useToast';

export interface ToastButtonProps extends ButtonProps {
  /**
   * Toast消息内容
   */
  message: React.ReactNode;
  /**
   * Toast描述内容
   */
  description?: React.ReactNode;
  /**
   * Toast类型
   * @default 'default'
   */
  toastType?: 'info' | 'success' | 'warning' | 'error' | 'default';
  /**
   * Toast持续时间（毫秒）
   * @default 4000
   */
  duration?: number;
}

/**
 * 点击触发Toast的按钮组件
 */
export default function ToastButton({
  message,
  description,
  toastType = 'default',
  duration = 4000,
  children,
  ...buttonProps
}: ToastButtonProps) {
  const toast = useToast();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    buttonProps.onClick?.(event);

    switch (toastType) {
      case 'success':
        toast.success(message, { description, duration });
        break;
      case 'error':
        toast.error(message, { description, duration });
        break;
      case 'warning':
        toast.warning(message, { description, duration });
        break;
      case 'info':
        toast.info(message, { description, duration });
        break;
      default:
        toast.toast(message, { description, duration });
        break;
    }
  };

  return (
    <Button {...buttonProps} onClick={handleClick}>
      {children}
    </Button>
  );
}
