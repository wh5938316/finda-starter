'use client';

import Box from '@mui/material/Box';
import { styled, useThemeProps } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';

import { useNotification } from './state';
import {
  NotificationHeightT,
  NotificationItem as NotificationItemType,
  NotificationProps,
  NotificationToDismiss,
} from './types';

// 默认可见通知数量
const VISIBLE_NOTIFICATIONS_AMOUNT = 3;

// 窗口边距
const VIEWPORT_OFFSET = '24px';

// 移动端窗口边距
const MOBILE_VIEWPORT_OFFSET = '16px';

// 通知之间的默认间隔
const DEFAULT_GAP = 14;

// 使用MUI的styled创建样式组件
const NotificationRoot = styled('div', {
  name: 'MuiNotification',
  slot: 'root',
})<{ ownerState: { position: string } }>(({ theme, ownerState }) => {
  // 根据position得到x和y方向
  const [y, x] = (ownerState.position || 'bottom-right').split('-');

  return {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
    boxSizing: 'border-box',
    zIndex: theme.zIndex.snackbar,
    transition: 'all 230ms cubic-bezier(0.21, 1.02, 0.73, 1)',

    // 纵向位置设置
    ...(y === 'top' ? { top: VIEWPORT_OFFSET } : {}),
    ...(y === 'bottom' ? { bottom: VIEWPORT_OFFSET } : {}),

    // 横向位置设置
    ...(x === 'left' ? { left: VIEWPORT_OFFSET } : {}),
    ...(x === 'right' ? { right: VIEWPORT_OFFSET } : {}),
    ...(x === 'center' ? { left: '50%', transform: 'translateX(-50%)' } : {}),

    // 移动端适配
    [theme.breakpoints.down('sm')]: {
      ...(y === 'top' ? { top: MOBILE_VIEWPORT_OFFSET } : {}),
      ...(y === 'bottom' ? { bottom: MOBILE_VIEWPORT_OFFSET } : {}),
      ...(x === 'left' ? { left: MOBILE_VIEWPORT_OFFSET } : {}),
      ...(x === 'right' ? { right: MOBILE_VIEWPORT_OFFSET } : {}),
    },
  };
});

// 单个通知项容器
const NotificationItemContainer = styled('div', {
  name: 'MuiNotification',
  slot: 'item',
})(({ theme }) => ({
  position: 'absolute',
  width: '356px',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
  overflow: 'hidden',
  pointerEvents: 'auto',
  cursor: 'pointer',
  transition: 'all 0.2s ease-out',

  // 为不同设备进行样式适配
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100vw - 32px)',
  },

  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[6],
  },
}));

// 通知内容
const NotificationContent = styled(Box, {
  name: 'MuiNotification',
  slot: 'content',
})(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
}));

// 通知组件
const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  function Notification(inProps, ref) {
    // 使用useThemeProps来集成MUI的主题
    const props = useThemeProps({ props: inProps, name: 'MuiNotification' });

    const {
      position = 'bottom-right',
      gap = DEFAULT_GAP,
      expand = true,
      expandByDefault = true,
      visibleNotifications = VISIBLE_NOTIFICATIONS_AMOUNT,
      style,
      className,
      children,
      ...other
    } = props;

    // 通知状态
    const { state } = useNotification();
    const [notifications, setNotifications] = useState<NotificationItemType[]>([]);
    const [heights, setHeights] = useState<NotificationHeightT[]>([]);
    const [expanded, setExpanded] = useState(expandByDefault);
    const [mounted, setMounted] = useState(false);
    const notificationsRef = useRef<HTMLDivElement>(null);

    // 监听通知变化
    useEffect(() => {
      setMounted(true);

      // 订阅通知更新
      const unsubscribe = state.subscribe((notification) => {
        if ('dismiss' in notification) {
          // 处理关闭通知
          handleDismissNotification(notification as NotificationToDismiss);
        } else {
          // 处理新通知
          handleNewNotification(notification as NotificationItemType);
        }
      });

      // 获取现有通知
      setNotifications(state.getActiveNotifications());

      return unsubscribe;
    }, [state]);

    // 处理新通知
    const handleNewNotification = (notification: NotificationItemType) => {
      setNotifications((prevNotifications) => {
        const exists = prevNotifications.findIndex((t) => t.id === notification.id);

        if (exists >= 0) {
          return prevNotifications.map((t) => (t.id === notification.id ? notification : t));
        }

        // 新通知放在最前面
        return [notification, ...prevNotifications];
      });
    };

    // 处理关闭通知
    const handleDismissNotification = (notification: NotificationToDismiss) => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((t) => t.id !== notification.id),
      );

      setHeights((prevHeights) => prevHeights.filter((h) => h.notificationId !== notification.id));
    };

    // 移除通知
    const removeNotification = (notification: NotificationItemType) => {
      state.dismiss(notification.id);
    };

    // 更新通知高度信息
    const updateHeights = (notificationId: string | number, height: number) => {
      setHeights((prevHeights) => {
        const existingIndex = prevHeights.findIndex((h) => h.notificationId === notificationId);

        if (existingIndex >= 0) {
          return prevHeights.map((h) =>
            h.notificationId === notificationId ? { ...h, height } : h,
          );
        }

        return [...prevHeights, { notificationId, height, position }];
      });
    };

    // 获取通知垂直位置
    const getNotificationStyles = (index: number): React.CSSProperties => {
      const isVisible = expanded || index < visibleNotifications;
      const zIndex = notifications.length - index;

      // 计算垂直偏移
      const verticalOffset = heights.slice(0, index).reduce((acc, curr) => {
        return acc + curr.height + gap;
      }, 0);

      // Y轴基本位置（与position有关）
      const yPosition = position.includes('top') ? 0 : undefined;
      const isBottom = position.includes('bottom');

      // 展开状态下的样式
      if (expanded) {
        return {
          zIndex,
          position: 'relative',
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? `translateY(${isBottom ? '-' : ''}${verticalOffset}px)`
            : `translateY(${isBottom ? '-20px' : '20px'})`,
          pointerEvents: isVisible ? ('auto' as const) : ('none' as const),
          top: yPosition,
          bottom: isBottom ? 0 : undefined,
        };
      }

      // 折叠状态下的样式
      return {
        zIndex,
        position: 'absolute',
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? `translateY(${isBottom ? '-' : ''}${index * 5}px) scale(${1 - index * 0.05})`
          : `translateY(${isBottom ? '-20px' : '20px'})`,
        pointerEvents: isVisible ? ('auto' as const) : ('none' as const),
        top: yPosition,
        bottom: isBottom ? 0 : undefined,
        right: 0,
        left: 0,
      };
    };

    // 切换展开/折叠状态
    const toggleExpand = () => {
      setExpanded(!expanded);
    };

    // 计算按钮位置
    const getToggleButtonPosition = () => {
      const isTop = position.includes('top');
      const isBottom = position.includes('bottom');

      if (isTop) {
        return { top: '100%', marginTop: '8px' };
      }

      if (isBottom) {
        return { bottom: '100%', marginBottom: '8px' };
      }

      return {};
    };

    // 渲染通知列表
    return (
      <NotificationRoot
        ref={ref}
        ownerState={{ position }}
        className={className}
        style={style}
        {...other}
      >
        {/* 通知项容器 */}
        <Box
          ref={notificationsRef}
          sx={{
            position: 'relative',
            width: '100%',
            height: 'auto',
          }}
        >
          {notifications.map((notification, index) => (
            <NotificationItemContainer
              key={notification.id}
              style={getNotificationStyles(index)}
              onClick={() => {
                if (notification.onDismiss) {
                  notification.onDismiss();
                }
                removeNotification(notification);
              }}
            >
              <NotificationContent>{notification.message}</NotificationContent>
            </NotificationItemContainer>
          ))}
        </Box>

        {/* 展开/折叠按钮 - 仅当有多个通知时显示 */}
        {notifications.length > 1 && (
          <Box
            onClick={toggleExpand}
            sx={{
              position: 'absolute',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              fontSize: '12px',
              ...getToggleButtonPosition(),
            }}
          >
            {expanded ? '折叠' : '展开'}({notifications.length})
          </Box>
        )}
      </NotificationRoot>
    );
  },
);

export { Notification, useNotification };
export * from './state';
export * from './types';
