'use client';

import * as React from 'react';

import { ToastData } from './Toaster';
import ToasterContext from './ToasterContext';

/**
 * 使用Toast的自定义钩子
 * @returns Toast操作方法
 */
export function useToast() {
  const context = React.useContext(ToasterContext);

  if (!context) {
    throw new Error('useToast must be used within a ToasterProvider');
  }

  const { addToast, removeToast } = context;

  // 创建一个toast
  const toast = React.useCallback(
    (message: React.ReactNode, options?: Omit<ToastData, 'id' | 'message'>) => {
      return addToast({ message, ...options });
    },
    [addToast],
  );

  // 创建成功toast
  const success = React.useCallback(
    (message: React.ReactNode, options?: Omit<ToastData, 'id' | 'message' | 'type'>) => {
      return addToast({ message, type: 'success', ...options });
    },
    [addToast],
  );

  // 创建错误toast
  const error = React.useCallback(
    (message: React.ReactNode, options?: Omit<ToastData, 'id' | 'message' | 'type'>) => {
      return addToast({ message, type: 'error', ...options });
    },
    [addToast],
  );

  // 创建警告toast
  const warning = React.useCallback(
    (message: React.ReactNode, options?: Omit<ToastData, 'id' | 'message' | 'type'>) => {
      return addToast({ message, type: 'warning', ...options });
    },
    [addToast],
  );

  // 创建信息toast
  const info = React.useCallback(
    (message: React.ReactNode, options?: Omit<ToastData, 'id' | 'message' | 'type'>) => {
      return addToast({ message, type: 'info', ...options });
    },
    [addToast],
  );

  // 移除指定toast
  const remove = React.useCallback(
    (id: number) => {
      removeToast(id);
    },
    [removeToast],
  );

  return {
    toast,
    success,
    error,
    warning,
    info,
    remove,
  };
}

export default useToast;
