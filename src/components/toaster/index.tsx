'use client';

import { useToast } from './ToasterContext';

export { default as Toaster } from './Toaster';
export { ToasterProvider, useToast } from './ToasterContext';
export type { Toast, ToastType } from './ToasterContext';
export type { ToasterProps } from './Toaster';
export type { ToastProps } from './Toast';

// 创建一个简单的使用示例
export const ToasterExample = () => {
  const toast = useToast();

  const showSuccessToast = () => toast.success('操作成功完成！');
  const showErrorToast = () => toast.error('出现了一个错误');
  const showMessageToast = () => toast.message('这是一条普通消息');
  const showActionToast = () => toast.action('操作已执行');
  const showPromiseToast = () => {
    const promise = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve('成功数据') : reject(new Error('发生错误'));
      }, 2000);
    });

    toast.promise(promise, {
      loading: '正在处理...',
      success: (data: string) => `操作成功: ${data}`,
      error: (err: Error) => `操作失败: ${err.message}`,
    });
  };

  return null;
};
