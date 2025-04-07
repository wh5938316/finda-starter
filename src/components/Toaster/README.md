# MUI Toaster 组件

基于 Material-UI 的自定义 Toast 通知系统，支持堆叠式通知和丰富的自定义选项。

## 特性

- 支持多种通知类型：success, error, warning, info, default
- 可展开/折叠的通知列表
- 支持自定义位置（目前实现了 bottom-right）
- 平滑的动画过渡效果
- 自动测量和调整通知高度
- 完全兼容 MUI 主题系统
- 类似官方 MUI 组件的 API 设计，包括 slots 和 slotProps

## 安装

确保已安装以下依赖：

```bash
npm install @mui/material @mui/icons-material @mui/utils
```

## 使用方法

### 基本使用

1. 在应用的布局组件中添加 Toaster：

```tsx
import { Toaster } from '../components/Toaster';

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Toaster position="bottom-right" />
    </>
  );
}
```

2. 在组件中使用 useToast hook：

```tsx
import { useToast } from '../components/Toaster';

export default function MyComponent() {
  const toast = useToast();

  const handleClick = () => {
    toast.success('操作成功', {
      description: '您的数据已保存',
      duration: 3000,
    });
  };

  return <Button onClick={handleClick}>保存</Button>;
}
```

### 使用 ToastButton 快速创建触发通知的按钮

```tsx
import { ToastButton } from '../components/Toaster';

export default function MyComponent() {
  return (
    <ToastButton
      variant="contained"
      color="success"
      toastType="success"
      message="保存成功"
      description="您的数据已成功保存"
    >
      保存
    </ToastButton>
  );
}
```

## API

### Toaster

| 属性               | 类型                                                         | 默认值           | 描述                     |
| ------------------ | ------------------------------------------------------------ | ---------------- | ------------------------ |
| position           | 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' | 'bottom-right'   | 通知显示位置             |
| expand             | boolean                                                      | true             | 是否展开显示所有通知     |
| gap                | number                                                       | 16               | 通知之间的间隔（像素）   |
| maxVisible         | number                                                       | 3                | 最大可见通知数量         |
| defaultDuration    | number                                                       | 4000             | 通知默认显示时间（毫秒） |
| slotToast          | React.ElementType                                            | Toast            | 自定义 Toast 组件        |
| slotToastProps     | object                                                       | {}               | 传递给 Toast 组件的属性  |
| slotContainer      | React.ElementType                                            | ToasterContainer | 自定义容器组件           |
| slotContainerProps | object                                                       | {}               | 传递给容器组件的属性     |

### useToast Hook

| 方法    | 参数               | 返回值 | 描述               |
| ------- | ------------------ | ------ | ------------------ |
| toast   | (message, options) | number | 显示默认类型的通知 |
| success | (message, options) | number | 显示成功类型的通知 |
| error   | (message, options) | number | 显示错误类型的通知 |
| warning | (message, options) | number | 显示警告类型的通知 |
| info    | (message, options) | number | 显示信息类型的通知 |
| remove  | (id)               | void   | 移除指定 ID 的通知 |

其中 options 包含：

- description: 通知的详细描述
- duration: 通知持续时间（毫秒），不设置则使用 defaultDuration
- onClose: 通知关闭时的回调函数

### ToastButton

| 属性        | 类型                                                     | 默认值    | 描述                 |
| ----------- | -------------------------------------------------------- | --------- | -------------------- |
| message     | React.ReactNode                                          | -         | 通知内容             |
| description | React.ReactNode                                          | -         | 通知描述             |
| toastType   | 'info' \| 'success' \| 'warning' \| 'error' \| 'default' | 'default' | 通知类型             |
| duration    | number                                                   | 4000      | 通知持续时间（毫秒） |

此外，组件接受所有 MUI Button 组件的属性。

## 主题定制

Toaster 组件完全支持 MUI 的主题定制，可以通过以下方式进行样式覆盖：

```tsx
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiToaster: {
      defaultProps: {
        position: 'bottom-right',
        expand: true,
      },
      styleOverrides: {
        root: {
          // 自定义样式
        },
      },
    },
    MuiToast: {
      styleOverrides: {
        root: {
          // 自定义样式
        },
        content: {
          // 自定义样式
        },
      },
    },
  },
});
```
