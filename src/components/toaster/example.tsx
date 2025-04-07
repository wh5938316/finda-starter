'use client';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';

import ToasterDemo from './ToasterDemo';
import { Toaster, ToasterProvider } from './index';

/**
 * 这个示例展示如何在应用程序中集成 Toaster 组件
 *
 * 使用步骤：
 * 1. 在应用程序的根组件中包装 ToasterProvider
 * 2. 在应用程序的 UI 中添加 Toaster 组件（通常放在最外层）
 * 3. 使用 useToast hook 在任何组件中显示通知
 */
const AppExample: React.FC = () => {
  // 创建 MUI 主题
  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* ToasterProvider 应该包裹整个应用程序 */}
      <ToasterProvider>
        {/* 展示页面 */}
        <ToasterDemo />

        {/* Toaster 组件负责实际渲染通知，应该放在布局的顶层 */}
        <Toaster
          position="bottom-right"
          gap={12}
          expand={true}
          expandByDefault={false}
          visibleToasts={3}
        />
      </ToasterProvider>
    </ThemeProvider>
  );
};

export default AppExample;
