import React from 'react';

import { NotificationItem, NotificationToDismiss } from './types';

let notificationCounter = 1;

class NotificationObserver {
  subscribers: Array<(notification: NotificationItem | NotificationToDismiss) => void>;
  notifications: Array<NotificationItem>;
  dismissedNotifications: Set<string | number>;

  constructor() {
    this.subscribers = [];
    this.notifications = [];
    this.dismissedNotifications = new Set();
  }

  // 订阅通知变化
  subscribe = (subscriber: (notification: NotificationItem | NotificationToDismiss) => void) => {
    this.subscribers.push(subscriber);

    return () => {
      const index = this.subscribers.indexOf(subscriber);
      this.subscribers.splice(index, 1);
    };
  };

  // 发布通知更新
  publish = (data: NotificationItem) => {
    this.subscribers.forEach((subscriber) => subscriber(data));
  };

  // 添加通知
  addNotification = (data: NotificationItem) => {
    this.publish(data);
    this.notifications = [...this.notifications, data];
  };

  // 创建通知
  create = (data: Partial<NotificationItem> & { message: React.ReactNode }) => {
    const id =
      typeof data?.id === 'number' || (data.id && data.id.toString().length > 0)
        ? data.id
        : notificationCounter++;

    const alreadyExists = this.notifications.find((notification) => {
      return notification.id === id;
    });

    const dismissible = data.dismissible === undefined ? true : data.dismissible;

    if (this.dismissedNotifications.has(id)) {
      this.dismissedNotifications.delete(id);
    }

    if (alreadyExists) {
      this.notifications = this.notifications.map((notification) => {
        if (notification.id === id) {
          const updatedNotification = { ...notification, ...data, id, dismissible };
          this.publish(updatedNotification);
          return updatedNotification;
        }
        return notification;
      });
    } else {
      const newNotification = { ...data, dismissible, id } as NotificationItem;
      this.addNotification(newNotification);
    }

    return id;
  };

  // 关闭通知
  dismiss = (id?: number | string) => {
    if (id) {
      this.dismissedNotifications.add(id);
      requestAnimationFrame(() => {
        this.subscribers.forEach((subscriber) => subscriber({ id, dismiss: true }));
      });
    } else {
      // 关闭所有通知
      this.notifications.forEach((notification) => {
        this.subscribers.forEach((subscriber) =>
          subscriber({ id: notification.id, dismiss: true }),
        );
      });
    }

    return id;
  };

  // 创建普通通知
  message = (message: React.ReactNode, data?: Partial<NotificationItem>) => {
    return this.create({ ...data, message, type: 'default' });
  };

  // 创建错误通知
  error = (message: React.ReactNode, data?: Partial<NotificationItem>) => {
    return this.create({ ...data, message, type: 'error' });
  };

  // 创建成功通知
  success = (message: React.ReactNode, data?: Partial<NotificationItem>) => {
    return this.create({ ...data, message, type: 'success' });
  };

  // 创建信息通知
  info = (message: React.ReactNode, data?: Partial<NotificationItem>) => {
    return this.create({ ...data, message, type: 'info' });
  };

  // 创建警告通知
  warning = (message: React.ReactNode, data?: Partial<NotificationItem>) => {
    return this.create({ ...data, message, type: 'warning' });
  };

  // 创建加载通知
  loading = (message: React.ReactNode, data?: Partial<NotificationItem>) => {
    return this.create({ ...data, message, type: 'loading' });
  };

  // 获取活跃的通知
  getActiveNotifications = () => {
    return this.notifications.filter(
      (notification) => !this.dismissedNotifications.has(notification.id),
    );
  };
}

// 创建全局状态实例
export const NotificationState = new NotificationObserver();

// 通知函数接口
interface NotificationFunction {
  (message: React.ReactNode, data?: Partial<NotificationItem>): string | number;
  success: (message: React.ReactNode, data?: Partial<NotificationItem>) => string | number;
  error: (message: React.ReactNode, data?: Partial<NotificationItem>) => string | number;
  info: (message: React.ReactNode, data?: Partial<NotificationItem>) => string | number;
  warning: (message: React.ReactNode, data?: Partial<NotificationItem>) => string | number;
  loading: (message: React.ReactNode, data?: Partial<NotificationItem>) => string | number;
  dismiss: (id?: number | string) => number | string | undefined;
}

// 通知函数
const notificationFunction = ((message: React.ReactNode, data?: Partial<NotificationItem>) => {
  return NotificationState.message(message, data);
}) as NotificationFunction;

// 其他便捷方法
notificationFunction.success = NotificationState.success;
notificationFunction.error = NotificationState.error;
notificationFunction.info = NotificationState.info;
notificationFunction.warning = NotificationState.warning;
notificationFunction.loading = NotificationState.loading;
notificationFunction.dismiss = NotificationState.dismiss;

export const notification = notificationFunction;

// 获取所有通知
export const getNotifications = () => NotificationState.getActiveNotifications();

// 创建上下文类型
export interface NotificationContextType {
  state: NotificationObserver;
}

// 创建React Context用于依赖注入
export const NotificationContext = React.createContext<NotificationContextType>({
  state: NotificationState,
});

// 自定义Hook用于访问通知状态
export const useNotification = () => {
  const context = React.useContext(NotificationContext);
  return {
    ...notification,
    state: context.state,
  };
};

// 提供者组件属性
export interface NotificationProviderProps {
  children: React.ReactNode;
  state?: NotificationObserver;
}

// 提供者组件
export const NotificationProvider = ({ children, state }: NotificationProviderProps) => {
  return (
    <NotificationContext.Provider value={{ state: state || NotificationState }}>
      {children}
    </NotificationContext.Provider>
  );
};
