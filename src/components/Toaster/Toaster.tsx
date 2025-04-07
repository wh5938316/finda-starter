'use client';

import { Portal } from '@mui/material';
import { keyframes, styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import * as React from 'react';

import Toast from './Toast';
import ToasterContext from './ToasterContext';
import { getToasterUtilityClass } from './toasterClasses';

// 定义动画
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

// 定义 Toaster 位置类型
export type ToasterPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

// Toast 数据类型
export interface ToastData {
  id: number;
  message: React.ReactNode;
  description?: React.ReactNode;
  type?: 'info' | 'success' | 'warning' | 'error' | 'default';
  duration?: number;
  onClose?: () => void;
  delete?: boolean;
  height?: number;
}

// Toast 待删除类型
export type ToastToDismiss = { id: number; dismiss: boolean };

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
   * 自定义 Toast 组件
   */
  slotToast?: React.ElementType;
  /**
   * Toast 组件的属性
   */
  slotToastProps?: Record<string, any>;
  /**
   * 自定义容器组件
   */
  slotContainer?: React.ElementType;
  /**
   * 容器组件的属性
   */
  slotContainerProps?: Record<string, any>;
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
    slotToast: ToastComponent = Toast,
    slotToastProps = {},
    slotContainer: ContainerComponent = ToasterContainer,
    slotContainerProps = {},
    ...other
  } = props;

  // 获取上下文
  const context = React.useContext(ToasterContext);
  if (!context) {
    throw new Error('Toaster must be used within a ToasterProvider');
  }

  const { toasts, removeToast } = context;

  const [containerHeight, setContainerHeight] = React.useState<number>(0);
  const toastRefs = React.useRef<Record<number, HTMLDivElement | null>>({});
  const isBottom = position.startsWith('bottom');
  const isTop = position.startsWith('top');

  const ownerState = {
    ...props,
    position,
    expand,
  };

  const classes = useUtilityClasses(ownerState);

  // 计算容器高度
  React.useEffect(() => {
    if (toasts.length === 0) {
      setContainerHeight(0);
      return;
    }

    if (expand) {
      const totalHeight = toasts.reduce((sum, toast) => {
        const height = toast.height || 0;
        return sum + height + gap;
      }, 0);

      setContainerHeight(Math.max(totalHeight, 100));
    } else {
      // 折叠模式下，容器高度为最上面那个toast的高度
      const firstToast = toasts.sort((a, b) => b.id - a.id)[0];
      setContainerHeight(firstToast?.height || 100);
    }
  }, [toasts, expand, gap]);

  // 更新Toast高度
  const updateToastHeight = React.useCallback((id: number, height: number) => {
    // 我们不再直接修改toasts状态，而是在ToastProvider中处理
    // 这里只获取DOM元素的高度信息
  }, []);

  // 创建ref回调
  const getRefCallback = React.useCallback(
    (toast: ToastData) => (element: HTMLDivElement | null) => {
      if (element && !toast.height) {
        toastRefs.current[toast.id] = element;
        // 更新Toast高度
        toast.height = element.clientHeight;

        // 为新元素添加一个微小的延迟，确保初始样式能被应用
        if (!toast.delete) {
          // 强制重绘DOM以开始过渡动画
          setTimeout(() => {
            if (element) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
            }
          }, 50);
        }
      }
    },
    [],
  );

  // 计算Toast位置
  const calculatePosition = React.useCallback(
    (index: number): number => {
      const sortedToasts = [...toasts].sort((a, b) => b.id - a.id);

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
      if (expand) {
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
      } as React.CSSProperties;

      // 根据展开状态设置不同的样式
      if (expand) {
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
        };
      }
    },
    [expand, calculatePosition, isBottom, isTop, maxVisible, toasts.length, gap],
  );

  // 获取动画
  const getAnimation = React.useCallback((toast: ToastData, index: number): string | undefined => {
    // 我们将不使用keyframe动画，而是使用CSS transition
    return undefined;
  }, []);

  return (
    <Portal>
      <ToasterRoot
        ref={ref}
        className={`${classes.root} ${className || ''}`}
        ownerState={ownerState}
        {...other}
      >
        <ContainerComponent
          ownerState={ownerState}
          className={classes.container}
          style={{ height: `${containerHeight}px` }}
          {...slotContainerProps}
        >
          {toasts
            .sort((a, b) => b.id - a.id)
            .map((toast, index) => (
              <ToastComponent
                key={toast.id}
                ref={getRefCallback(toast)}
                style={getToastStyle(index, toast)}
                message={toast.message}
                description={toast.description}
                type={toast.type}
                onClose={() => {
                  toast.onClose?.();
                  removeToast(toast.id);
                }}
                animation={getAnimation(toast, index)}
                ownerState={{
                  ...toast,
                  position,
                  isNew: !toast.height,
                  isDeleting: toast.delete,
                }}
                {...slotToastProps}
              />
            ))}
        </ContainerComponent>
      </ToasterRoot>
    </Portal>
  );
});

Toaster.displayName = 'Toaster';

export default Toaster;
