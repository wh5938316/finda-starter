import React from 'react';

// 通知类型
export type NotificationType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';

// 通知项数据
export interface NotificationItem {
  id: string | number;
  message: React.ReactNode;
  description?: React.ReactNode;
  type?: NotificationType;
  duration?: number;
  dismissible?: boolean;
  onDismiss?: () => void;
  position?: NotificationPosition;
  action?: {
    label: React.ReactNode;
    onClick: () => void;
  };
  // 其他可能的属性
  [key: string]: any;
}

// 通知位置
export type NotificationPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

// 通知组件属性
export interface NotificationProps {
  /**
   * 位置，默认右下角
   */
  position?: NotificationPosition;

  /**
   * 通知之间的间隔
   */
  gap?: number;

  /**
   * 是否展开显示全部通知
   */
  expand?: boolean;

  /**
   * 默认是否展开
   */
  expandByDefault?: boolean;

  /**
   * 是否反转颜色
   */
  invert?: boolean;

  /**
   * 通知显示时长(毫秒)
   */
  duration?: number;

  /**
   * 自定义样式
   */
  style?: React.CSSProperties;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 通知消息的自定义类名
   */
  messageClassName?: string;

  /**
   * 通知描述的自定义类名
   */
  descriptionClassName?: string;

  /**
   * 最大可见通知数量
   */
  visibleNotifications?: number;

  /**
   * 是否显示关闭按钮
   */
  closeButton?: boolean;

  /**
   * 关闭按钮的aria-label
   */
  closeButtonAriaLabel?: string;

  /**
   * 窗口偏移量
   */
  offset?: string | number | { horizontal?: string | number; vertical?: string | number };

  /**
   * 移动端窗口偏移量
   */
  mobileOffset?: string | number | { horizontal?: string | number; vertical?: string | number };

  /**
   * 自定义图标
   */
  icons?: {
    [key in NotificationType]?: React.ReactNode;
  };

  /**
   * 子元素
   */
  children?: React.ReactNode;
}

// 待关闭的通知
export interface NotificationToDismiss {
  id: string | number;
  dismiss: true;
}

// 内部使用的通知状态对象
export interface NotificationHeightT {
  height: number;
  notificationId: string | number;
  position?: NotificationPosition;
}
