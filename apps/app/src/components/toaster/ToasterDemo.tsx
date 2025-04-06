'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';

import { useToast } from './ToasterContext';

const ToasterDemo: React.FC = () => {
  const toast = useToast();

  // 基础通知
  const showMessage = () => {
    toast.message('这是一条普通消息');
  };

  // 成功通知
  const showSuccess = () => {
    toast.success('操作成功完成！', {
      description: '您的操作已成功处理',
      duration: 300000,
    });
  };

  // 错误通知
  const showError = () => {
    toast.error('出现了一个错误', {
      description: '请稍后再试或联系支持团队',
    });
  };

  // 行动通知
  const showAction = () => {
    toast.action('操作已执行', {
      description: '点击此通知查看详情',
    });
  };

  // 取消通知
  const showCancel = () => {
    toast.cancel('操作已取消', {
      description: '您可以稍后重试',
    });
  };

  // 加载通知
  const showLoading = () => {
    const id = toast.loading('正在处理您的请求...', {
      description: '这可能需要一点时间',
    });

    // 3秒后自动更新为成功
    setTimeout(() => {
      toast.updateToast(id, {
        type: 'success',
        message: '处理完成！',
        description: '您的请求已成功处理',
      });
    }, 3000);
  };

  // Promise 通知
  const showPromise = () => {
    const promise = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve('成功数据') : reject(new Error('发生错误'));
      }, 3000);
    });

    toast.promise(promise, {
      loading: '正在处理您的请求...',
      success: (data) => `操作成功: ${data}`,
      error: (err: Error) => `操作失败: ${err.message}`,
    });
  };

  // 自定义内容通知
  const showCustom = () => {
    toast.custom(
      <Box p={2} display="flex" flexDirection="column" gap={1}>
        <Typography variant="h6">自定义通知</Typography>
        <Typography variant="body2">这是一个完全自定义的通知内容</Typography>
        <Button variant="contained" size="small" color="primary">
          确认
        </Button>
      </Box>,
    );
  };

  // 无样式通知
  const showHeadless = () => {
    toast.headless({
      message: (
        <Box
          sx={{
            bgcolor: 'background.paper',
            p: 2,
            borderRadius: 1,
            boxShadow: 3,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="body1">这是无样式通知</Typography>
          <Typography variant="body2" color="text.secondary">
            您可以完全控制样式
          </Typography>
        </Box>
      ),
    });
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Toaster 演示
      </Typography>
      <Typography variant="body1" paragraph>
        点击下面的按钮展示不同类型的通知
      </Typography>

      <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ gap: 2 }}>
        <Button variant="contained" onClick={showMessage} color="primary">
          消息通知
        </Button>
        <Button variant="contained" onClick={showSuccess} color="success">
          成功通知
        </Button>
        <Button variant="contained" onClick={showError} color="error">
          错误通知
        </Button>
        <Button variant="contained" onClick={showAction} color="info">
          行动通知
        </Button>
        <Button variant="contained" onClick={showCancel} color="warning">
          取消通知
        </Button>
        <Button variant="contained" onClick={showLoading} color="secondary">
          加载通知
        </Button>
        <Button variant="contained" onClick={showPromise} color="info">
          Promise通知
        </Button>
        <Button variant="contained" onClick={showCustom}>
          自定义通知
        </Button>
        <Button variant="outlined" onClick={showHeadless}>
          无样式通知
        </Button>
      </Stack>
    </Box>
  );
};

export default ToasterDemo;
