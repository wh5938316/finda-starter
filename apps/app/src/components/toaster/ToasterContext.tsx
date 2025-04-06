'use client';

import React, { createContext, useContext, useMemo, useReducer } from 'react';

import { ToastAction } from './Toast';

// 导入 ToastAction 接口

// Toast 类型定义
export type ToastType =
  | 'message'
  | 'success'
  | 'error'
  | 'action'
  | 'cancel'
  | 'promise'
  | 'loading'
  | 'custom'
  | 'headless'
  | 'update' // 新增：更新类型
  | 'delete'; // 新增：删除类型

// Toast 项类型
export interface Toast {
  id: string;
  message: React.ReactNode;
  description?: React.ReactNode;
  type: ToastType;
  height?: number;
  isNew?: boolean;
  isExiting?: boolean;
  duration?: number;
  createdAt: number;
  // 用于 promise toast
  promise?: Promise<any>;
  promiseStatus?: 'pending' | 'fulfilled' | 'rejected';
  // 用于 custom toast
  component?: React.ReactNode;
  // 用于操作按钮
  actions?: ToastAction[];
}

// Toaster 上下文状态
interface ToasterState {
  toasts: Toast[];
}

// Toaster 上下文操作
type ToasterAction =
  | { type: 'ADD_TOAST'; toast: Toast }
  | { type: 'REMOVE_TOAST'; id: string }
  | { type: 'UPDATE_TOAST'; id: string; toast: Partial<Toast> }
  | { type: 'DISMISS_TOAST'; id: string }
  | { type: 'CLEAR_ALL' };

// Toaster 上下文方法
interface ToasterContextValue extends ToasterState {
  addToast: (toast: Omit<Toast, 'id' | 'createdAt'>) => string;
  removeToast: (id: string) => void;
  updateToast: (id: string, toast: Partial<Toast>) => void;
  dismissToast: (id: string) => void;
  clearAll: () => void;

  // 便捷方法
  message: (
    message: React.ReactNode,
    options?: Partial<Omit<Toast, 'id' | 'createdAt' | 'message' | 'type'>>,
  ) => string;
  success: (
    message: React.ReactNode,
    options?: Partial<Omit<Toast, 'id' | 'createdAt' | 'message' | 'type'>>,
  ) => string;
  error: (
    message: React.ReactNode,
    options?: Partial<Omit<Toast, 'id' | 'createdAt' | 'message' | 'type'>>,
  ) => string;
  action: (
    message: React.ReactNode,
    options?: Partial<Omit<Toast, 'id' | 'createdAt' | 'message' | 'type'>>,
  ) => string;
  cancel: (
    message: React.ReactNode,
    options?: Partial<Omit<Toast, 'id' | 'createdAt' | 'message' | 'type'>>,
  ) => string;
  loading: (
    message: React.ReactNode,
    options?: Partial<Omit<Toast, 'id' | 'createdAt' | 'message' | 'type'>>,
  ) => string;
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: React.ReactNode;
      success: React.ReactNode | ((data: T) => React.ReactNode);
      error: React.ReactNode | ((error: any) => React.ReactNode);
    } & Partial<Omit<Toast, 'id' | 'createdAt' | 'message' | 'type' | 'promise'>>,
  ) => string;
  custom: (
    component: React.ReactNode,
    options?: Partial<Omit<Toast, 'id' | 'createdAt' | 'component' | 'type'>>,
  ) => string;
  headless: (options: Omit<Toast, 'id' | 'createdAt' | 'type'>) => string;
  update: (
    message: React.ReactNode,
    options?: Partial<Omit<Toast, 'id' | 'createdAt' | 'message' | 'type'>>,
  ) => string;
  deleteToast: (
    message: React.ReactNode,
    options?: Partial<Omit<Toast, 'id' | 'createdAt' | 'message' | 'type'>>,
  ) => string;
}

// 创建上下文
const ToasterContext = createContext<ToasterContextValue | undefined>(undefined);

// Reducer 处理状态更新
function toasterReducer(state: ToasterState, action: ToasterAction): ToasterState {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.id),
      };
    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === action.id ? { ...toast, ...action.toast } : toast,
        ),
      };
    case 'DISMISS_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === action.id ? { ...toast, isExiting: true } : toast,
        ),
      };
    case 'CLEAR_ALL':
      return {
        ...state,
        toasts: state.toasts.map((toast) => ({ ...toast, isExiting: true })),
      };
    default:
      return state;
  }
}

// 生成唯一ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Provider 组件
export function ToasterProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(toasterReducer, { toasts: [] });

  // 提供上下文方法
  const contextValue = useMemo(() => {
    // 添加 toast
    const addToast = (toast: Omit<Toast, 'id' | 'createdAt'>) => {
      const id = generateId();
      const newToast: Toast = {
        ...toast,
        id,
        createdAt: Date.now(),
        isNew: true,
        duration: toast.duration || 5000, // 默认持续5秒
      };

      dispatch({ type: 'ADD_TOAST', toast: newToast });

      // 动画结束后移除 isNew 标记，避免 animation 属性影响 transform
      setTimeout(() => {
        updateToast(id, { isNew: false });
      }, 300); // 与 CSS 动画持续时间一致

      // 设置自动消失
      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, newToast.duration);
      }

      return id;
    };

    // 移除 toast
    const removeToast = (id: string) => {
      dispatch({ type: 'REMOVE_TOAST', id });
    };

    // 更新 toast
    const updateToast = (id: string, toast: Partial<Toast>) => {
      dispatch({ type: 'UPDATE_TOAST', id, toast });
    };

    // 消失 toast (添加退出动画)
    const dismissToast = (id: string) => {
      dispatch({ type: 'DISMISS_TOAST', id });
      // 动画结束后移除
      setTimeout(() => {
        removeToast(id);
      }, 300); // 和 CSS 动画持续时间一致
    };

    // 清除所有 toast
    const clearAll = () => {
      dispatch({ type: 'CLEAR_ALL' });
    };

    // 各种类型的便捷方法
    const message = (message: React.ReactNode, options = {}) => {
      return addToast({ message, type: 'message', ...options });
    };

    const success = (message: React.ReactNode, options = {}) => {
      return addToast({ message, type: 'success', ...options });
    };

    const error = (message: React.ReactNode, options = {}) => {
      return addToast({ message, type: 'error', ...options });
    };

    const action = (message: React.ReactNode, options = {}) => {
      return addToast({ message, type: 'action', ...options });
    };

    const cancel = (message: React.ReactNode, options = {}) => {
      return addToast({ message, type: 'cancel', ...options });
    };

    const loading = (message: React.ReactNode, options = {}) => {
      return addToast({ message, type: 'loading', ...options, duration: 0 }); // loading 默认不自动消失
    };

    const promise = <T,>(
      promise: Promise<T>,
      options: {
        loading: React.ReactNode;
        success: React.ReactNode | ((data: T) => React.ReactNode);
        error: React.ReactNode | ((error: any) => React.ReactNode);
      } & Partial<Omit<Toast, 'id' | 'createdAt' | 'message' | 'type' | 'promise'>>,
    ) => {
      const id = addToast({
        message: options.loading,
        type: 'promise',
        promise,
        promiseStatus: 'pending',
        ...options,
        duration: 0, // promise toast 不自动消失
      });

      promise
        .then((data) => {
          const successMessage =
            typeof options.success === 'function' ? options.success(data) : options.success;

          updateToast(id, {
            message: successMessage,
            type: 'success',
            promiseStatus: 'fulfilled',
            duration: 5000, // 成功后5秒消失
          });

          // 设置自动消失
          setTimeout(() => dismissToast(id), 5000);
        })
        .catch((error) => {
          const errorMessage =
            typeof options.error === 'function' ? options.error(error) : options.error;

          updateToast(id, {
            message: errorMessage,
            type: 'error',
            promiseStatus: 'rejected',
            duration: 5000, // 错误后5秒消失
          });

          // 设置自动消失
          setTimeout(() => dismissToast(id), 5000);
        });

      return id;
    };

    const custom = (component: React.ReactNode, options = {}) => {
      return addToast({
        component,
        type: 'custom',
        message: '', // 添加空消息以满足类型要求
        ...options,
      });
    };

    const headless = (options: Omit<Toast, 'id' | 'createdAt' | 'type'>) => {
      return addToast({ ...options, type: 'headless' });
    };

    // 新增便捷方法 - update toast
    const update = (message: React.ReactNode, options = {}) => {
      return addToast({ message, type: 'update', ...options });
    };

    // 新增便捷方法 - delete toast
    const deleteToast = (message: React.ReactNode, options = {}) => {
      return addToast({ message, type: 'delete', ...options });
    };

    return {
      toasts: state.toasts,
      addToast,
      removeToast,
      updateToast,
      dismissToast,
      clearAll,
      message,
      success,
      error,
      action,
      cancel,
      loading,
      promise,
      custom,
      headless,
      update, // 新增
      deleteToast, // 新增
    };
  }, [state]);

  return <ToasterContext.Provider value={contextValue}>{children}</ToasterContext.Provider>;
}

// 使用钩子
export function useToast() {
  const context = useContext(ToasterContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToasterProvider');
  }
  return context;
}
