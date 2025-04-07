'use client';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Box, Button, IconButton } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import Toast from './Toast';
import { Toast as ToastInterface, useToast } from './ToasterContext';

// Toaster 属性
export interface ToasterProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  gap?: number;
  expand?: boolean;
  expandByDefault?: boolean;
  visibleToasts?: number; // 可见 toast 数量
  expandOnHover?: boolean; // 鼠标悬停时是否自动展开
}

// 新增：Toast高度接口
interface ToastHeight {
  id: string | number;
  height: number;
}

// 固定的 toasts 列表容器 - 更新为浅色样式
const ToasterContainer = styled(Box, {
  name: 'MuiToaster',
  slot: 'root',
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

// 展开按钮 - 添加浅色样式
const ExpandButton = styled(Button, {
  name: 'MuiToaster',
  slot: 'expandButton',
})(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[1],
  '&:hover': {
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[2],
  },
}));

// 通知图标按钮 - 浅色样式
const NotificationIconButton = styled(IconButton, {
  name: 'MuiToaster',
  slot: 'notificationIcon',
})(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  boxShadow: theme.shadows[1],
  '&:hover': {
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[2],
  },
}));

// 默认 toast 高度
const DEFAULT_TOAST_HEIGHT = 80;

// 主 Toaster 组件
const Toaster: React.FC<ToasterProps> = ({
  position = 'bottom-right',
  gap = 14,
  expand = true,
  expandByDefault = true,
  visibleToasts = 3, // 默认可见3个 toast
  expandOnHover = true, // 默认启用鼠标悬停时自动展开
}) => {
  const theme = useTheme();
  const { toasts, dismissToast } = useToast();
  const [expanded, setExpanded] = useState(expandByDefault);
  // 移除toastRefs
  // const toastRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [isHovering, setIsHovering] = useState(false); // 是否正在悬停

  // 新增：用于管理toast高度的状态
  const [toastHeights, setToastHeights] = useState<ToastHeight[]>([]);

  // 处理toast高度变化
  const handleToastHeightChange = React.useCallback((id: string | number, height: number) => {
    setToastHeights((prevHeights) => {
      const existingIndex = prevHeights.findIndex((item) => item.id === id);
      if (existingIndex >= 0) {
        // 更新现有高度
        const newHeights = [...prevHeights];
        newHeights[existingIndex] = { id, height };
        return newHeights;
      } else {
        // 添加新高度
        return [...prevHeights, { id, height }];
      }
    });
  }, []);

  // 获取toast高度 - 修改为使用状态中存储的高度
  const getToastHeight = (id: string) => {
    const heightObj = toastHeights.find((item) => item.id === id);
    return heightObj?.height || DEFAULT_TOAST_HEIGHT;
  };

  // 处理鼠标悬停事件
  const handleMouseEnter = () => {
    setIsHovering(true);
    if (expandOnHover && !expanded) {
      setExpanded(true);
    }
  };

  // 处理鼠标离开事件
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (expandOnHover && expanded && !expandByDefault) {
      setExpanded(false);
    }
  };

  // 处理展开/折叠按钮点击
  const handleExpandToggle = () => {
    const newExpandedState = !expanded;
    setExpanded(newExpandedState);

    // 如果手动折叠，我们需要记住这个状态，即使鼠标再次悬停
    if (!newExpandedState) {
      // 用户手动折叠了，暂时禁用悬停自动展开，直到鼠标再次离开
      setIsHovering(false);
    }
  };

  // 对toasts按创建时间从新到旧排序
  const sortedToasts = useMemo(() => {
    return toasts.sort((a, b) => b.createdAt - a.createdAt).slice(0, visibleToasts + 1);
  }, [toasts, visibleToasts]);

  // 添加：获取前一个toast的id的函数
  const getFirstToastId = React.useCallback((): string => {
    return sortedToasts[0].id;
  }, [sortedToasts]);

  // 计算容器高度
  const containerHeight = useMemo(() => {
    if (!sortedToasts.length) return 0;

    if (expanded) {
      const totalHeight = sortedToasts.reduce((sum, toast, index) => {
        const height = getToastHeight(toast.id) || DEFAULT_TOAST_HEIGHT;
        // 最后一个toast不添加gap
        return sum + height + (index < sortedToasts.length - 1 ? gap : 0);
      }, 0);
      return totalHeight;
    }

    const totalHeight = (sortedToasts[0].height ?? 0) + 16 * (visibleToasts - 1);

    return totalHeight;
  }, [expanded, sortedToasts, gap, toastHeights]); // 添加toastHeights依赖

  // 从toastHeights中清理已不存在的toast高度
  useEffect(() => {
    if (toastHeights.length > 0) {
      const currentToastIds = toasts.map((toast) => toast.id);
      setToastHeights((prevHeights) =>
        prevHeights.filter((item) => currentToastIds.includes(item.id.toString())),
      );
    }
  }, [toasts]);

  return (
    <>
      {/* Toast 容器 */}
      <ToasterContainer
        ownerState={{ position }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* 展开/折叠按钮 */}
        {toasts.length > 1 && expand && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: position.includes('right') ? 'flex-end' : 'flex-start',
              mb: 1,
            }}
          >
            {expanded ? (
              <ExpandButton
                variant="text"
                size="small"
                startIcon={<ExpandLessIcon />}
                onClick={handleExpandToggle}
              >
                折叠 ({toasts.length})
              </ExpandButton>
            ) : (
              <Badge badgeContent={toasts.length} color="primary">
                <NotificationIconButton
                  size="small"
                  onClick={handleExpandToggle}
                  aria-label="展开通知"
                >
                  <NotificationsIcon />
                </NotificationIconButton>
              </Badge>
            )}
          </Box>
        )}

        {/* Toast 列表 */}
        <Box
          sx={{
            position: 'relative',
            width: '356px',
            height: `${containerHeight}px`, // 使用计算的容器高度
            transition: 'height 0.3s ease',
            [theme.breakpoints.down('sm')]: {
              width: 'calc(100vw - 32px)',
            },
          }}
        >
          {/* 渲染排序后的toasts */}
          {sortedToasts.map((toast, index) => (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              description={toast.description}
              type={toast.type}
              isNew={toast.isNew}
              isExiting={toast.isExiting}
              position={position}
              component={toast.component}
              onDismiss={() => dismissToast(toast.id)}
              actions={toast.actions} // 传递操作按钮
              // 添加高度变化回调
              onHeightChange={handleToastHeightChange}
              // 传递必要信息让Toast自己计算位置
              index={index}
              totalToasts={sortedToasts.length}
              expanded={expanded}
              gap={gap}
              visibleToasts={visibleToasts}
              getToastHeight={getToastHeight}
              toasts={sortedToasts}
              // 添加获取前一个toast的函数
              getFirstToastId={getFirstToastId}
            />
          ))}
        </Box>
      </ToasterContainer>
    </>
  );
};

export default Toaster;
