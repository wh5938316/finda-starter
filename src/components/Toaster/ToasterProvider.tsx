'use client';

import * as React from 'react';
import { flushSync } from 'react-dom';

import { ToastData } from './Toaster';
import ToasterContext from './ToasterContext';

// 记录Toast的唯一ID
let toastCounter = 0;

export interface ToasterProviderProps {
  children: React.ReactNode;
  defaultDuration?: number;
  /**
   * 可见 Toast 的最大数量
   * @default 3
   */
  maxVisible?: number;
}

export default function ToasterProvider({
  children,
  defaultDuration = 4000,
  maxVisible = 3,
}: ToasterProviderProps) {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  // 添加新Toast
  const addToast = React.useCallback(
    (toast: Omit<ToastData, 'id'>) => {
      const id = ++toastCounter;
      const newToast = {
        ...toast,
        id,
        // 初始没有高度，表示是新添加的toast
        height: undefined,
      };

      // 使用flushSync以确保状态更新是同步的
      flushSync(() => {
        setToasts((current) => [newToast, ...current]);
      });

      // 如果有指定持续时间，则自动删除
      if (toast.duration !== undefined || defaultDuration) {
        const duration = toast.duration !== undefined ? toast.duration : defaultDuration;
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [defaultDuration],
  );

  // 移除Toast
  const removeToast = React.useCallback(
    (id: number) => {
      // 找到要删除的toast的索引
      setToasts((currentToasts) => {
        const sortedToasts = [...currentToasts].sort((a, b) => b.id - a.id);
        const indexToRemove = sortedToasts.findIndex((t) => t.id === id);

        // 如果索引大于等于maxVisible，直接删除；否则先标记为delete
        if (indexToRemove >= maxVisible) {
          return currentToasts.filter((t) => t.id !== id);
        } else {
          return currentToasts.map((t) => (t.id === id ? { ...t, delete: true } : t));
        }
      });

      // 动画结束后真正移除
      setTimeout(() => {
        setToasts((current) => current.filter((t) => t.id !== id || !t.delete));
      }, 300);
    },
    [maxVisible],
  );

  // 创建上下文值
  const contextValue = React.useMemo(
    () => ({
      addToast,
      removeToast,
      toasts,
    }),
    [addToast, removeToast, toasts],
  );

  return <ToasterContext.Provider value={contextValue}>{children}</ToasterContext.Provider>;
}
