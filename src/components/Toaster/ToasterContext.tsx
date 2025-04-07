'use client';

import * as React from 'react';

import { ToastData } from './Toaster';

// Toaster上下文接口
export interface ToasterContextValue {
  /**
   * 添加一个Toast
   */
  addToast: (toast: Omit<ToastData, 'id'>) => number;
  /**
   * 移除指定ID的Toast
   */
  removeToast: (id: number) => void;
  /**
   * 所有Toast数据
   */
  toasts: ToastData[];
}

// 创建上下文
const ToasterContext = React.createContext<ToasterContextValue | null>(null);

ToasterContext.displayName = 'ToasterContext';

export default ToasterContext;
