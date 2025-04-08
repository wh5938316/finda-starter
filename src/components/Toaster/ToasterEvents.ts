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

// 创建全局事件处理器
type Listener = (data: ToastData | ToastToDismiss) => void;
type ClearListener = () => void;

// 简化的事件系统
class ToasterEventSystem {
  private listeners: Listener[] = [];
  private clearListeners: ClearListener[] = [];
  private toastId = 0;

  // 添加Toast
  toast(toast: Omit<ToastData, 'id'>): number {
    const id = ++this.toastId;
    const newToast = { id, ...toast, position: Date.now() } as ToastData;

    console.log('发送toast事件:', newToast);
    this.notifyListeners(newToast);
    return id;
  }

  // 添加各类型Toast的快捷方法
  success(message: React.ReactNode, options?: Omit<ToastData, 'id' | 'message' | 'type'>) {
    return this.toast({ message, type: 'success', ...options });
  }

  error(message: React.ReactNode, options?: Omit<ToastData, 'id' | 'message' | 'type'>) {
    return this.toast({ message, type: 'error', ...options });
  }

  info(message: React.ReactNode, options?: Omit<ToastData, 'id' | 'message' | 'type'>) {
    return this.toast({ message, type: 'info', ...options });
  }

  warning(message: React.ReactNode, options?: Omit<ToastData, 'id' | 'message' | 'type'>) {
    return this.toast({ message, type: 'warning', ...options });
  }

  // 删除指定ID的Toast
  dismiss(id: number) {
    console.log('发送dismiss事件:', id);
    this.notifyListeners({ id, dismiss: true });
  }

  // 清除所有Toast
  clear() {
    console.log('发送clear事件');
    this.notifyClearListeners();
  }

  // 通知所有监听器
  private notifyListeners(data: ToastData | ToastToDismiss) {
    this.listeners.forEach((listener) => {
      try {
        listener(data);
      } catch (err) {
        console.error('Toast listener error:', err);
      }
    });
  }

  // 通知所有清除监听器
  private notifyClearListeners() {
    this.clearListeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error('Clear listener error:', err);
      }
    });
  }

  // 订阅事件
  subscribe(callback: (data: ToastData | ToastToDismiss) => void) {
    this.listeners.push(callback);
    console.log('新增toast订阅, 当前订阅数:', this.listeners.length);

    // 返回取消订阅函数
    return () => {
      this.listeners = this.listeners.filter((listener) => listener !== callback);
      console.log('取消toast订阅, 剩余订阅数:', this.listeners.length);
    };
  }

  // 订阅清除事件
  onClear(callback: () => void) {
    this.clearListeners.push(callback);

    // 返回取消订阅函数
    return () => {
      this.clearListeners = this.clearListeners.filter((listener) => listener !== callback);
    };
  }
}

// 创建单例实例
export const ToasterEvents = new ToasterEventSystem();

// 导出默认实例
export default ToasterEvents;
