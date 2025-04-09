import { Button, Stack, ThemeProvider, Typography, createTheme } from '@mui/material';
import { green } from '@mui/material/colors';
import type { Components, Theme } from '@mui/material/styles';
import * as React from 'react';

import Toast from '../components/Toaster/Toast';
import Toaster from '../components/Toaster/Toaster';
import toaster from '../components/Toaster/ToasterEvents';

// 在文件中声明并扩展MUI主题类型
declare module '@mui/material/styles' {
  interface ComponentNameToClassKey {
    MuiToast: any;
  }
  interface ComponentsPropsList {
    MuiToast: any;
  }
}

// 创建自定义主题示例，自定义Toast样式
const customTheme = createTheme({
  components: {
    // 自定义Toast样式
    MuiToast: {
      styleOverrides: {
        // 所有类型Toast的基础样式
        root: {
          maxWidth: '350px',
        },
        // 成功类型Toast的样式
        typeSuccess: {
          backgroundColor: '#f0fff0', // 自定义浅绿色背景
          borderLeft: `4px solid ${green[600]}`, // 左侧绿色边框
          borderRadius: '8px', // 圆角更大
        },
        // 内容区域样式
        content: {
          padding: '16px', // 增加内边距
        },
        // 消息文本样式
        message: {
          fontWeight: 700, // 加粗字体
        },
        // 描述文本样式
        description: {
          fontSize: '0.85rem', // 字体大小稍小
          opacity: 0.8, // 透明度
        },
      },
    } as Components<Theme>['MuiToast'],
  },
});

// Toast主题示例组件
export default function ToastThemeExample() {
  // 显示成功通知
  const showSuccessToast = () => {
    toaster.success('操作成功', {
      description: '您的操作已完成，数据已成功保存',
    });
  };

  // 显示信息通知
  const showInfoToast = () => {
    toaster.info('系统通知', {
      description: '这是一条系统信息，请注意查看',
    });
  };

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h5" gutterBottom>
        自定义主题Toast示例
      </Typography>

      <Typography paragraph>这个示例展示了如何使用MUI的主题系统来自定义Toast样式。</Typography>

      {/* 默认主题下的Toast */}
      <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
        <Button variant="contained" color="success" onClick={showSuccessToast}>
          默认主题 - 成功通知
        </Button>
        <Button variant="contained" color="info" onClick={showInfoToast}>
          默认主题 - 信息通知
        </Button>
      </Stack>

      {/* 自定义主题下的Toast */}
      <ThemeProvider theme={customTheme}>
        <Typography variant="h6" gutterBottom>
          自定义主题
        </Typography>
        <Stack spacing={2} direction="row">
          <Button variant="contained" color="success" onClick={showSuccessToast}>
            自定义主题 - 成功通知
          </Button>
          <Button variant="contained" color="info" onClick={showInfoToast}>
            自定义主题 - 信息通知
          </Button>
        </Stack>

        {/* 这里放置一个Toaster实例，使用自定义主题 */}
        <Toaster position="top-right" />
      </ThemeProvider>

      {/* 默认主题的Toaster */}
      <Toaster position="bottom-right" />
    </div>
  );
}
