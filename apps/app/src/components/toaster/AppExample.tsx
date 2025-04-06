'use client';

import {
  Box,
  CssBaseline,
  FormControlLabel,
  FormGroup,
  Switch,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import React, { useState } from 'react';

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

  // Toaster 配置选项
  const [expandOnHover, setExpandOnHover] = useState(true);
  const [expandByDefault, setExpandByDefault] = useState(false);
  const [position, setPosition] = useState<
    'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  >('bottom-right');

  // 切换位置
  const togglePosition = () => {
    const positions: Array<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'> = [
      'bottom-right',
      'bottom-left',
      'top-right',
      'top-left',
    ];
    const currentIndex = positions.indexOf(position);
    const nextIndex = (currentIndex + 1) % positions.length;
    setPosition(positions[nextIndex]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* ToasterProvider 应该包裹整个应用程序 */}
      <ToasterProvider>
        {/* Toaster 配置选项 */}
        <Box p={2} mb={4} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom>
            Toaster 配置
          </Typography>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={expandOnHover}
                  onChange={(e) => setExpandOnHover(e.target.checked)}
                />
              }
              label="鼠标悬停时展开"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={expandByDefault}
                  onChange={(e) => setExpandByDefault(e.target.checked)}
                />
              }
              label="默认展开"
            />
            <FormControlLabel
              control={<Switch onChange={togglePosition} />}
              label={`位置: ${position}`}
            />
          </FormGroup>
        </Box>

        {/* 展示页面 */}
        <ToasterDemo />

        {/* Toaster 组件负责实际渲染通知，应该放在布局的顶层 */}
        <Toaster
          position={position}
          gap={12}
          expand={true}
          expandByDefault={expandByDefault}
          expandOnHover={expandOnHover}
          visibleToasts={5}
        />
      </ToasterProvider>
    </ThemeProvider>
  );
};

export default AppExample;
