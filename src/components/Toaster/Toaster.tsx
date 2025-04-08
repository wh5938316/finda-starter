import { Portal } from '@mui/material';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import * as React from 'react';
import ReactDOM from 'react-dom';

import Toast from './Toast';
import { ToastData, ToastToDismiss, ToasterEvents } from './ToasterEvents';
import { swipeInDown, swipeInUp, swipeOutDown, swipeOutUp } from './toaster-animations';
import { getToasterUtilityClass } from './toasterClasses';

// 定义 Toaster 位置类型
export type ToasterPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

// 组件属性类型
export interface ToasterProps {
  /**
   * 自定义样式类名
   */
  className?: string;
  /**
   * Toaster 位置
   * @default 'bottom-right'
   */
  position?: ToasterPosition;
  /**
   * Toast 之间的间距
   * @default 16
   */
  gap?: number;
  /**
   * 是否展开 Toast 列表
   * @default true
   */
  expand?: boolean;
  /**
   * 可见 Toast 的最大数量
   * @default 3
   */
  maxVisible?: number;
  /**
   * Toast默认持续时间(毫秒)
   * @default 5000
   */
  duration?: number;
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

// Toaster组件slots
export interface ToasterSlots {
  /**
   * 根元素
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * 容器元素
   * @default 'div'
   */
  container?: React.ElementType;
  /**
   * Toast元素
   * @default Toast
   */
  toast?: React.ElementType;
}

// Toaster组件slot属性
export interface ToasterSlotProps {
  root?: Record<string, any>;
  container?: Record<string, any>;
  toast?: Record<string, any>;
}

// 所有组件Slots的类型
export interface ToasterOwnerState extends ToasterProps {
  position: ToasterPosition;
}

// 获取组件样式类
const useUtilityClasses = (ownerState: ToasterOwnerState) => {
  const { position, expand } = ownerState;
  const slots = {
    root: [
      'root',
      position && `position${position.charAt(0).toUpperCase() + position.slice(1)}`,
      expand && 'expanded',
    ],
    container: ['container'],
  };

  return composeClasses(slots, getToasterUtilityClass, {});
};

// 根容器样式
const ToasterRoot = styled('div', {
  name: 'MuiToaster',
  slot: 'Root',
})<{ ownerState: ToasterOwnerState }>(({ theme, ownerState }) => {
  const [vertical, horizontal] = ownerState.position.split('-');

  return {
    position: 'fixed',
    zIndex: theme.zIndex.snackbar,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'visible',

    ...(vertical === 'top' ? { top: 24 } : { bottom: 24 }),
    ...(horizontal === 'left' ? { left: 24 } : { right: 24 }),

    [theme.breakpoints.down('sm')]: {
      ...(vertical === 'top' ? { top: 16 } : { bottom: 16 }),
      ...(horizontal === 'left' ? { left: 16 } : { right: 16 }),
    },
  };
});

// 容器样式
const ToasterContainer = styled('div', {
  name: 'MuiToaster',
  slot: 'Container',
})<{ ownerState: ToasterOwnerState }>(({ theme, ownerState }) => ({
  position: 'relative',
  width: 360,
  transition: theme.transitions.create('height', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),

  [theme.breakpoints.down('sm')]: {
    width: 'calc(100vw - 32px)',
  },
}));

const Toaster = React.forwardRef<HTMLDivElement, ToasterProps>(function Toaster(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiToaster' });
  const {
    className,
    position = 'bottom-right',
    gap = 16,
    expand = true,
    maxVisible = 3,
    duration = 5000,
    children,
    ...other
  } = props;

  // 状态管理
  const [toasts, setToasts] = React.useState<ToastData[]>([]);
  const [isHovered, setIsHovered] = React.useState(false);
  const [containerHeight, setContainerHeight] = React.useState<number>(0);
  const isBottom = position.startsWith('bottom');
  const isTop = position.startsWith('top');

  // 计算当前展开状态（根据prop和鼠标状态）
  const isExpanded = expand || isHovered;

  const ownerState = {
    ...props,
    position,
    expand: isExpanded,
  };

  const classes = useUtilityClasses(ownerState);

  // 鼠标事件处理函数
  const handleMouseEnter = React.useCallback(() => {
    if (!expand) {
      setIsHovered(true);
    }
  }, [expand]);

  const handleMouseLeave = React.useCallback(() => {
    setIsHovered(false);
  }, []);

  // 订阅事件系统
  React.useEffect(() => {
    // 处理Toast事件
    const unsubscribe = ToasterEvents.subscribe((toast) => {
      if ('dismiss' in toast) {
        // 删除通知
        requestAnimationFrame(() => {
          setToasts((prevToasts) =>
            prevToasts.map((t) => (t.id === toast.id ? { ...t, delete: true } : t)),
          );
        });
        return;
      }

      // 添加或更新通知
      setTimeout(() => {
        ReactDOM.flushSync(() => {
          setToasts((prevToasts) => {
            const existingToastIndex = prevToasts.findIndex((t) => t.id === toast.id);

            // 更新现有通知
            if (existingToastIndex !== -1) {
              return [
                ...prevToasts.slice(0, existingToastIndex),
                { ...prevToasts[existingToastIndex], ...toast },
                ...prevToasts.slice(existingToastIndex + 1),
              ];
            }

            // 添加新通知
            return [toast, ...prevToasts];
          });
        });
      });
    });

    // 处理清除事件
    const clearUnsubscribe = ToasterEvents.onClear(() => {
      setToasts([]);
    });

    // 组件卸载时取消订阅
    return () => {
      unsubscribe();
      clearUnsubscribe();
    };
  }, []);

  // 处理通知自动关闭
  React.useEffect(() => {
    const timeouts: number[] = [];

    toasts.forEach((toast) => {
      if (!toast.delete && !isHovered) {
        const toastDuration = toast.duration || duration;
        const timeout = setTimeout(() => {
          ToasterEvents.dismiss(toast.id);
        }, toastDuration);

        timeouts.push(timeout);
      }
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [toasts, duration, isHovered]);

  // 更新Toast高度
  const updateToastHeight = React.useCallback((id: number, height: number) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) => (toast.id === id ? { ...toast, height } : toast)),
    );
  }, []);

  // 删除已标记为删除的通知
  const removeDeletedToasts = React.useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  // 计算容器高度
  React.useEffect(() => {
    if (toasts.length === 0) {
      setContainerHeight(0);
      return;
    }

    if (isExpanded) {
      // 只计算前 maxVisible 个toast的高度
      const visibleToasts = [...toasts]
        .sort((a, b) => {
          const posA = a.position || 0;
          const posB = b.position || 0;
          return posB - posA;
        })
        .slice(0, maxVisible);

      const totalHeight = visibleToasts.reduce((sum, toast) => {
        const height = toast.height || 0;
        return sum + height + gap;
      }, 0);

      setContainerHeight(Math.max(totalHeight - gap, 0));
    } else {
      // 折叠模式下，容器高度为最上面那个toast的高度
      const firstToast = [...toasts].sort((a, b) => {
        const posA = a.position || 0;
        const posB = b.position || 0;
        return posB - posA;
      })[0];
      setContainerHeight(firstToast?.height || 0);
    }
  }, [toasts, isExpanded, gap, maxVisible]);

  // 计算Toast位置
  const calculatePosition = React.useCallback(
    (index: number): number => {
      const sortedToasts = [...toasts].sort((a, b) => {
        const posA = a.position || 0;
        const posB = b.position || 0;
        return posB - posA;
      });

      let totalOffset = 0;
      for (let i = 0; i < index; i++) {
        const toast = sortedToasts[i];
        totalOffset += (toast.height || 0) + gap;
      }

      return totalOffset;
    },
    [toasts, gap],
  );

  // 获取Toast样式
  const getToastStyle = React.useCallback(
    (index: number, toast: ToastData): React.CSSProperties => {
      // 滑动动画的起始值
      let swipeAmountY;
      if (isExpanded) {
        const yOffset = calculatePosition(index);
        swipeAmountY = `${isBottom ? '-' : ''}${yOffset}px`;
      } else {
        swipeAmountY = `${isBottom ? '-' : ''}${index * 16}px`;
      }

      // 基础样式
      const baseStyle = {
        '--gap': `${gap}px`,
        '--swipe-amount-y': swipeAmountY,
        zIndex: toasts.length - index,
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: isBottom ? 0 : 'auto',
        top: !isBottom ? 0 : 'auto',
        opacity: index < maxVisible ? 1 : 0,
        transition: 'opacity 300ms, transform 300ms',
        pointerEvents: index < maxVisible ? 'auto' : 'none', // 超出可见数量的toast无法点击
      } as React.CSSProperties;

      // 根据展开状态设置不同的样式
      if (isExpanded) {
        const yOffset = calculatePosition(index);
        return {
          ...baseStyle,
          transform: `translateY(${isBottom ? '-' : ''}${yOffset}px)`,
          // 新元素添加初始样式
          ...(!toast.height && {
            opacity: 0,
            transform: isTop
              ? `translateY(calc(${isBottom ? '-' : ''}${yOffset}px - 100%))`
              : `translateY(calc(${isBottom ? '-' : ''}${yOffset}px + 100%))`,
          }),
          // 删除元素的样式
          ...(toast.delete && {
            animation: `${isTop ? swipeOutUp : swipeOutDown} 0.3s forwards`,
          }),
        };
      } else {
        return {
          ...baseStyle,
          transform: `translateY(${isBottom ? '-' : ''}${index * 16}px) scale(${1 - index * 0.05})`,
          // 新元素添加初始样式
          ...(!toast.height && {
            opacity: 0,
            transform: isTop
              ? `translateY(calc(${isBottom ? '-' : ''}${index * 16}px - 100%)) scale(${1 - index * 0.05})`
              : `translateY(calc(${isBottom ? '-' : ''}${index * 16}px + 100%)) scale(${1 - index * 0.05})`,
          }),
          // 删除元素的样式
          ...(toast.delete && {
            animation: `${isTop ? swipeOutUp : swipeOutDown} 0.3s forwards`,
          }),
        };
      }
    },
    [isExpanded, calculatePosition, isBottom, isTop, maxVisible, toasts.length, gap],
  );

  // 获取动画
  const getAnimation = React.useCallback(
    (toast: ToastData, index: number): string | undefined => {
      if (toast.delete) {
        return isTop ? swipeOutUp.toString() : swipeOutDown.toString();
      }

      if (!toast.height) {
        return isTop ? swipeInDown.toString() : swipeInUp.toString();
      }

      return undefined;
    },
    [isTop],
  );

  // 处理动画结束
  const handleAnimationEnd = React.useCallback(
    (toast: ToastData) => {
      console.log(toast);
      if (toast.delete) {
        removeDeletedToasts(toast.id);
      }
    },
    [removeDeletedToasts],
  );

  return (
    <Portal>
      <ToasterRoot
        ref={ref}
        className={`${classes.root} ${className || ''}`}
        ownerState={ownerState}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...other}
      >
        <ToasterContainer
          ownerState={ownerState}
          className={classes.container}
          style={{ height: `${containerHeight}px` }}
        >
          {toasts
            .sort((a, b) => {
              const posA = a.position || 0;
              const posB = b.position || 0;
              return posB - posA;
            })
            // 只渲染 maxVisible + 1 个toast，多一个用于显示消失动画
            .slice(0, maxVisible + 1)
            .map((toast, index) => (
              <Toast
                key={toast.id}
                style={getToastStyle(index, toast)}
                message={toast.message}
                description={toast.description}
                type={toast.type}
                onClose={() => {
                  toast.onClose?.();
                  ToasterEvents.dismiss(toast.id);
                }}
                animation={getAnimation(toast, index)}
                ownerState={{
                  id: toast.id,
                  position,
                  isNew: !toast.height,
                  isDeleting: toast.delete,
                  message: toast.message,
                  onHeightChange: updateToastHeight,
                }}
                onAnimationEnd={() => handleAnimationEnd(toast)}
              />
            ))}
        </ToasterContainer>
        {children}
      </ToasterRoot>
    </Portal>
  );
});

Toaster.displayName = 'Toaster';

export default Toaster;
