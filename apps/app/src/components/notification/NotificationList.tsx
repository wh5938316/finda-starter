'use client';

import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { keyframes, styled, useTheme } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';

// 向上滑出动画
const swipeOutUp = keyframes`
  from {
    transform: translateY(var(--swipe-amount-y));
    opacity: 1;
  }

  to {
    transform: translateY(calc(var(--swipe-amount-y) - 100%));
    opacity: 0;
  }
`;

// 向下滑出动画
const swipeOutDown = keyframes`
  from {
    transform: translateY(var(--swipe-amount-y));
    opacity: 1;
  }

  to {
    transform: translateY(calc(var(--swipe-amount-y) + 100%));
    opacity: 0;
  }
`;

// 向上滑入动画
const swipeInUp = keyframes`
  from {
    transform: translateY(calc(var(--swipe-amount-y) + 100%));
    opacity: 0;
  }

  to {
    transform: translateY(var(--swipe-amount-y));
    opacity: 1;
  }
`;

// 向下滑入动画
const swipeInDown = keyframes`
  from {
    transform: translateY(calc(var(--swipe-amount-y) - 100%));
    opacity: 0;
  }

  to {
    transform: translateY(var(--swipe-amount-y));
    opacity: 1;
  }
`;

// 通知类型
type NotificationType = 'success' | 'error' | 'info' | 'warning' | 'default';

// 通知项类型
interface NotificationItem {
  id: string | number;
  message: React.ReactNode;
  description?: React.ReactNode;
  type?: NotificationType;
  height?: number; // 存储计算后的高度
  isNew?: boolean; // 标记是否是新通知
  isExiting?: boolean; // 标记是否正在退出
}

// 通知列表属性
interface NotificationListProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  gap?: number;
  expand?: boolean;
  expandByDefault?: boolean;
  visibleNotifications?: number; // 可见通知数量
}

// 右下角固定的通知列表容器
const NotificationContainer = styled(Box, {
  name: 'MuiNotificationContainer',
})<{ ownerState: { position: string } }>(({ theme, ownerState }) => {
  const [vertical, horizontal] = ownerState.position.split('-');

  return {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    zIndex: theme.zIndex.snackbar,

    // 定位
    ...(vertical === 'top' ? { top: '24px' } : { bottom: '24px' }),
    ...(horizontal === 'left' ? { left: '24px' } : { right: '24px' }),

    // 移动端响应式
    [theme.breakpoints.down('sm')]: {
      ...(vertical === 'top' ? { top: '16px' } : { bottom: '16px' }),
      ...(horizontal === 'left' ? { left: '16px' } : { right: '16px' }),
    },
  };
});

// 默认通知高度
const DEFAULT_NOTIFICATION_HEIGHT = 80;

// 单个通知项
const NotificationItemStyled = styled(Paper, {
  name: 'MuiNotificationItem',
})<{ ownerState: { isNew?: boolean; isExiting?: boolean; position: string } }>(({
  theme,
  ownerState,
}) => {
  const [vertical] = ownerState.position.split('-');
  const isTop = vertical === 'top';

  // 根据位置选择对应的动画
  const enterAnimation = isTop ? swipeInDown : swipeInUp;
  const exitAnimation = isTop ? swipeOutUp : swipeOutDown;

  return {
    width: '356px',
    boxShadow: theme.shadows[3],
    overflow: 'hidden',
    position: 'absolute', // 始终使用绝对定位
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: 400,
    }),
    cursor: 'pointer',
    '--swipe-amount-y': '0px', // 默认滑动起始位置

    // 新通知滑入动画
    ...(ownerState.isNew && {
      animation: `${enterAnimation} 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
    }),

    // 退出通知滑出动画
    ...(ownerState.isExiting && {
      animation: `${exitAnimation} 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
      pointerEvents: 'none', // 禁用鼠标事件
    }),

    '&:hover': {
      boxShadow: theme.shadows[6],
      transform: 'translateY(-2px)',
    },

    // 间隔伪元素
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      height: 'calc(var(--gap) + 1px)',
      bottom: '100%',
      width: '100%',
      pointerEvents: 'none', // 确保不会干扰鼠标事件
    },

    [theme.breakpoints.down('sm')]: {
      width: 'calc(100vw - 32px)',
    },
  };
});

// 不同类型通知的背景色
const getBackgroundColor = (type: NotificationType | undefined, theme: any) => {
  switch (type) {
    case 'success':
      return theme.palette.success.light;
    case 'error':
      return theme.palette.error.light;
    case 'info':
      return theme.palette.info.light;
    case 'warning':
      return theme.palette.warning.light;
    default:
      return theme.palette.background.paper;
  }
};

// 通知内容
const NotificationContent = styled(Box, {
  name: 'MuiNotificationContent',
})<{ ownerState: { type?: NotificationType } }>(({ theme, ownerState }) => ({
  padding: theme.spacing(2),
  backgroundColor: getBackgroundColor(ownerState.type, theme),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));

// 示例通知数组
const demoNotifications: NotificationItem[] = [
  { id: 1, message: '这是第一条通知', type: 'info' },
  { id: 2, message: '这是第二条通知', type: 'success' },
  { id: 3, message: '这是第三条通知', type: 'warning' },
  { id: 4, message: '这是第四条通知', type: 'error' },
];

// 通知类型映射
const notificationTypes: { [key: string]: NotificationType } = {
  success: 'success',
  error: 'error',
  info: 'info',
  warning: 'warning',
  default: 'default',
};

// 通知列表组件
const NotificationList: React.FC<NotificationListProps> = ({
  position = 'bottom-right',
  gap = 14,
  expand = true,
  expandByDefault = true,
  visibleNotifications = 3, // 默认可见3个通知
}) => {
  const theme = useTheme();
  const [notifications, setNotifications] = useState<NotificationItem[]>(demoNotifications);
  const [expanded, setExpanded] = useState(expandByDefault);
  const [nextId, setNextId] = useState(5); // 下一个通知的ID从5开始
  const [containerHeight, setContainerHeight] = useState(100); // 容器高度
  const notificationRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // 在展开状态下计算容器高度
  useEffect(() => {
    if (expanded && notifications.length > 0) {
      // 更新每个通知的高度
      const heightsWithGap = notifications.map((notification) => {
        const height =
          notificationRefs.current[notification.id]?.clientHeight || DEFAULT_NOTIFICATION_HEIGHT;
        return height + gap;
      });

      // 计算总高度
      const totalHeight = heightsWithGap.reduce((sum, height) => sum + height, 0);
      setContainerHeight(totalHeight);

      // 更新通知高度信息
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification, index) => {
          const element = notificationRefs.current[notification.id];
          return {
            ...notification,
            height: element?.clientHeight || DEFAULT_NOTIFICATION_HEIGHT,
          };
        }),
      );
    } else {
      setContainerHeight(100); // 折叠状态下固定高度
    }
  }, [expanded, notifications.length, gap]);

  // 移除通知（带有滑出动画）
  const removeNotification = (id: string | number) => {
    // 先标记为正在退出
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isExiting: true } : n)));

    // 动画结束后移除
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 300); // 匹配动画时长
  };

  // 添加新通知
  const addNotification = (type: NotificationType = 'default') => {
    const newNotification: NotificationItem = {
      id: nextId,
      message: `这是新添加的第${nextId}条通知`,
      description: `这是一条${type}类型的通知`,
      type,
      height: DEFAULT_NOTIFICATION_HEIGHT, // 初始高度
      isNew: true, // 标记为新通知
    };

    setNotifications((prev) => [...prev, newNotification]);
    setNextId((id) => id + 1);

    // 一段时间后移除"新通知"标记
    setTimeout(() => {
      setNotifications((prev) => prev.map((n) => (n.id === nextId ? { ...n, isNew: false } : n)));
    }, 300); // 与动画时长匹配
  };

  // 清空所有通知
  const clearAllNotifications = () => {
    // 先标记所有通知为退出状态
    setNotifications((prev) => prev.map((n) => ({ ...n, isExiting: true })));

    // 动画结束后清空
    setTimeout(() => {
      setNotifications([]);
    }, 300);
  };

  // 计算展开状态下每个通知的垂直位置
  const calculateExpandedPosition = (index: number, notifications: NotificationItem[]): number => {
    // 按照ID从大到小排序后的通知列表
    const sortedNotifications = [...notifications].sort((a, b) => Number(b.id) - Number(a.id));

    // 计算当前通知前面所有通知的高度总和
    let totalOffset = 0;
    for (let i = 0; i < index; i++) {
      const notification = sortedNotifications[i];
      totalOffset += (notification.height || DEFAULT_NOTIFICATION_HEIGHT) + gap;
    }

    return totalOffset;
  };

  // 获取通知样式（根据展开状态）
  const getNotificationStyle = (
    index: number,
    notification: NotificationItem,
  ): React.CSSProperties => {
    const isBottom = position.includes('bottom');
    // 使较大ID（较新）的通知获得较小的视觉索引，从而显示在上方
    const reverseIndex = notifications.length - 1 - index;

    // 使用ref保存DOM元素引用
    const setRef = (element: HTMLDivElement | null) => {
      notificationRefs.current[notification.id] = element;
    };

    // 根据位置计算滑动初始值（用于CSS变量）
    let swipeAmountY;
    if (expanded) {
      const yOffset = calculateExpandedPosition(index, notifications);
      swipeAmountY = `${isBottom ? '-' : ''}${yOffset}px`;
    } else {
      swipeAmountY = `${isBottom ? '-' : ''}${index * 30}%`;
    }

    // 展开状态下的样式 - 使用绝对定位
    if (expanded) {
      const yOffset = calculateExpandedPosition(index, notifications);

      return {
        '--gap': `${gap}px`, // 设置CSS变量用于伪元素
        '--swipe-amount-y': swipeAmountY, // 设置滑动变量
        zIndex: notifications.length - index,
        right: 0,
        left: 0,
        bottom: isBottom ? 0 : 'auto',
        top: !isBottom ? 0 : 'auto',
        opacity: index < visibleNotifications ? 1 : 0, // 超过可见数量的隐藏
        // 基于计算的垂直位置
        transform: `translateY(${isBottom ? '-' : ''}${yOffset}px)`,
        ref: setRef,
      } as any; // 使用any类型避免TypeScript对ref的警告
    }

    // 折叠状态下的样式
    return {
      '--gap': `${gap}px`, // 设置CSS变量用于伪元素
      '--swipe-amount-y': swipeAmountY, // 设置滑动变量
      // 修正z-index: 在折叠状态下，index值就是从0开始的，较新通知的index较小
      // 所以给index较小的通知更高的z-index，即可使最新通知显示在最前面
      zIndex: notifications.length - index, // 不使用reverseIndex，直接用index
      right: 0,
      left: 0,
      bottom: isBottom ? 0 : 'auto',
      top: !isBottom ? 0 : 'auto',
      // 同样修正transform: 使用index而非reverseIndex，这样最新通知(index=0)偏移量为0，显示在最前面
      transform: `translateY(${isBottom ? '-' : ''}${index * 30}%) scale(${1 - index * 0.05})`,
      opacity: index < visibleNotifications ? 1 : 0, // 超过可见数量的隐藏
      ref: setRef,
    } as any; // 使用any类型避免TypeScript对ref的警告
  };

  // 添加操作按钮组件
  const ActionButtons = () => (
    <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={() => addNotification('success')}
      >
        添加成功通知
      </Button>
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={() => addNotification('error')}
      >
        添加错误通知
      </Button>
      <Button variant="contained" color="info" size="small" onClick={() => addNotification('info')}>
        添加信息通知
      </Button>
      <Button
        variant="contained"
        color="warning"
        size="small"
        onClick={() => addNotification('warning')}
      >
        添加警告通知
      </Button>
      <Button variant="outlined" color="error" size="small" onClick={clearAllNotifications}>
        清空所有通知
      </Button>
    </Stack>
  );

  // 获取ref回调函数
  const getRefCallback = (id: string | number) => (element: HTMLDivElement | null) => {
    notificationRefs.current[id] = element;
  };

  return (
    <>
      {/* 操作按钮 */}
      <ActionButtons />

      {/* 通知容器 */}
      <NotificationContainer ownerState={{ position }}>
        {/* 展开/折叠按钮 */}
        {notifications.length > 1 && (
          <Button
            variant="contained"
            size="small"
            sx={{
              alignSelf: position.includes('right') ? 'flex-end' : 'flex-start',
              mb: position.includes('bottom') ? 1 : 0,
              mt: position.includes('top') ? 1 : 0,
            }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? '折叠' : '展开'} ({notifications.length})
          </Button>
        )}

        {/* 通知列表 */}
        <Box
          sx={{
            position: 'relative',
            width: '356px',
            height: expanded ? `${containerHeight}px` : '100px', // 使用计算的容器高度
            transition: 'height 0.3s ease',
            [theme.breakpoints.down('sm')]: {
              width: 'calc(100vw - 32px)',
            },
          }}
        >
          {/* 排序通知，使ID较大的显示在前面 */}
          {[...notifications]
            .sort((a, b) => Number(b.id) - Number(a.id))
            .map((notification, index) => (
              <NotificationItemStyled
                key={notification.id}
                ref={getRefCallback(notification.id)}
                ownerState={{
                  isNew: notification.isNew,
                  isExiting: notification.isExiting,
                  position: position,
                }}
                style={getNotificationStyle(index, notification)}
                onClick={() => removeNotification(notification.id)}
              >
                <NotificationContent ownerState={{ type: notification.type }}>
                  <Typography variant="body1" fontWeight="500">
                    {notification.message}
                  </Typography>
                  {notification.description && (
                    <Typography variant="body2" color="text.secondary">
                      {notification.description}
                    </Typography>
                  )}
                </NotificationContent>
              </NotificationItemStyled>
            ))}
        </Box>
      </NotificationContainer>
    </>
  );
};

export default NotificationList;
