'use client';

import { Box, Button, Divider, FormControlLabel, Stack, Switch, Typography } from '@mui/material';
import * as React from 'react';

import ToastButton from './ToastButton';
import Toaster from './Toaster';
import { useToast } from './useToast';

export default function ToasterDemo() {
  const [expand, setExpand] = React.useState(true);
  const toast = useToast();

  // 显示不同类型的通知
  const showToasts = () => {
    toast.success('操作成功完成', {
      description: '您的请求已成功处理',
      duration: 3000,
    });

    setTimeout(() => {
      toast.error('发生错误', {
        description: '处理请求时出现问题',
        duration: 3000,
      });
    }, 1000);

    setTimeout(() => {
      toast.warning('请注意', {
        description: '这个操作可能有风险',
        duration: 3000,
      });
    }, 2000);

    setTimeout(() => {
      toast.info('新消息通知', {
        description: '您有新的消息待查看',
        duration: 3000,
      });
    }, 3000);
  };

  // 显示长时间通知
  const showPersistentToast = () => {
    const id = toast.info('这是一个持久通知', {
      description: '这个通知不会自动消失，需要手动关闭',
    });

    // 10秒后自动关闭
    setTimeout(() => {
      toast.remove(id);
    }, 10000);
  };

  // 显示大量通知
  const showMultipleToasts = () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        toast.info(`通知 ${i + 1}`, {
          description: `这是第 ${i + 1} 个通知`,
          duration: 3000,
        });
      }, i * 500);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Toaster 组件示例
      </Typography>

      <FormControlLabel
        control={<Switch checked={expand} onChange={(e) => setExpand(e.target.checked)} />}
        label="展开通知"
      />

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button variant="contained" onClick={showToasts}>
          显示不同类型通知
        </Button>

        <Button variant="outlined" onClick={showPersistentToast}>
          显示持久通知
        </Button>

        <Button variant="outlined" color="secondary" onClick={showMultipleToasts}>
          显示多个通知
        </Button>
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        ToastButton 组件示例
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <ToastButton
          variant="contained"
          color="success"
          toastType="success"
          message="保存成功"
          duration={4000000}
          description="您的数据已成功保存"
        >
          成功通知按钮
        </ToastButton>

        <ToastButton
          variant="contained"
          color="error"
          toastType="error"
          message="操作失败"
          description="处理您的请求时发生错误"
        >
          错误通知按钮
        </ToastButton>

        <ToastButton
          variant="contained"
          color="warning"
          toastType="warning"
          message="注意"
          description="此操作可能会有风险"
        >
          警告通知按钮
        </ToastButton>

        <ToastButton
          variant="contained"
          color="info"
          toastType="info"
          message="提示信息"
          description="有新的功能可用"
        >
          信息通知按钮
        </ToastButton>
      </Stack>

      {/* Toaster组件 */}
      <Toaster position="bottom-right" expand={expand} gap={16} maxVisible={3} />
    </Box>
  );
}
