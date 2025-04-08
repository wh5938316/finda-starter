import mitt from 'mitt';

// 定义Toast数据类型
export interface ToastData {
  id: number;
  message: React.ReactNode;
  description?: React.ReactNode;
  type?: 'info' | 'success' | 'warning' | 'error' | 'default';
  duration?: number;
  onClose?: () => void;
  position?: number;
  delete?: boolean;
  height?: number;
}

// 定义要删除的Toast类型
export type ToastToDismiss = { id: number; dismiss: boolean };

// 定义事件类型
export type ToasterEvents = {
  toast: ToastData | ToastToDismiss;
  clear: void;
};

// 创建事件发射器
const emitter = mitt<ToasterEvents>();

// 维护自增ID
let toastId = 0;

// 封装事件API
export const ToasterEvents = {
  // 添加Toast
  toast: (toast: Omit<ToastData, 'id'>) => {
    const id = ++toastId;
    emitter.emit('toast', { id, ...toast, position: Date.now() });
    return id;
  },

  // 添加各类型Toast的快捷方法
  success: (message: React.ReactNode, options?: Omit<ToastData, 'id' | 'message' | 'type'>) => {
    return ToasterEvents.toast({ message, type: 'success', ...options });
  },

  error: (message: React.ReactNode, options?: Omit<ToastData, 'id' | 'message' | 'type'>) => {
    return ToasterEvents.toast({ message, type: 'error', ...options });
  },

  info: (message: React.ReactNode, options?: Omit<ToastData, 'id' | 'message' | 'type'>) => {
    return ToasterEvents.toast({ message, type: 'info', ...options });
  },

  warning: (message: React.ReactNode, options?: Omit<ToastData, 'id' | 'message' | 'type'>) => {
    return ToasterEvents.toast({ message, type: 'warning', ...options });
  },

  // 删除指定ID的Toast
  dismiss: (id: number) => {
    emitter.emit('toast', { id, dismiss: true });
  },

  // 清除所有Toast
  clear: () => {
    emitter.emit('clear');
  },

  // 订阅事件
  subscribe: (callback: (toast: ToastData | ToastToDismiss) => void) => {
    emitter.on('toast', callback);
    return () => emitter.off('toast', callback);
  },

  // 订阅清除事件
  onClear: (callback: () => void) => {
    emitter.on('clear', callback);
    return () => emitter.off('clear', callback);
  },
};

// 导出默认实例
export default ToasterEvents;
