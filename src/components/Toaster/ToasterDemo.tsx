import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import Toaster, { ToasterPosition, toaster } from './index';

export default function ToasterDemo() {
  const [position, setPosition] = React.useState<ToasterPosition>('bottom-right');
  const [expand, setExpand] = React.useState<boolean>(true);

  // 显示一条通知
  const showToast = (type?: 'info' | 'success' | 'warning' | 'error' | 'default') => {
    const message = `这是一条${getTypeText(type)}通知`;
    const description = '这是通知的描述文本，可以包含更多详细信息。';

    if (type && type !== 'default') {
      toaster[type](message, { description });
    } else {
      toaster.toast({ message, description, type });
    }
  };

  // 获取类型文本
  const getTypeText = (type?: string) => {
    switch (type) {
      case 'info':
        return '信息';
      case 'success':
        return '成功';
      case 'warning':
        return '警告';
      case 'error':
        return '错误';
      default:
        return '默认';
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Toaster position={position} expand={expand} />
      <Typography variant="h4" gutterBottom>
        Toaster 组件演示
      </Typography>

      <Typography variant="h6" gutterBottom>
        显示不同类型的通知
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <Button variant="contained" onClick={() => showToast('default')}>
          默认通知
        </Button>
        <Button variant="contained" color="info" onClick={() => showToast('info')}>
          信息通知
        </Button>
        <Button variant="contained" color="success" onClick={() => showToast('success')}>
          成功通知
        </Button>
        <Button variant="contained" color="warning" onClick={() => showToast('warning')}>
          警告通知
        </Button>
        <Button variant="contained" color="error" onClick={() => showToast('error')}>
          错误通知
        </Button>
      </Stack>

      <Typography variant="h6" gutterBottom>
        通知位置
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <Button
          variant={position === 'top-left' ? 'contained' : 'outlined'}
          onClick={() => setPosition('top-left')}
        >
          左上角
        </Button>
        <Button
          variant={position === 'top-right' ? 'contained' : 'outlined'}
          onClick={() => setPosition('top-right')}
        >
          右上角
        </Button>
        <Button
          variant={position === 'bottom-left' ? 'contained' : 'outlined'}
          onClick={() => setPosition('bottom-left')}
        >
          左下角
        </Button>
        <Button
          variant={position === 'bottom-right' ? 'contained' : 'outlined'}
          onClick={() => setPosition('bottom-right')}
        >
          右下角
        </Button>
      </Stack>

      <Typography variant="h6" gutterBottom>
        显示模式
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <Button variant={expand ? 'contained' : 'outlined'} onClick={() => setExpand(true)}>
          展开模式
        </Button>
        <Button variant={!expand ? 'contained' : 'outlined'} onClick={() => setExpand(false)}>
          堆叠模式
        </Button>
      </Stack>

      <Typography variant="h6" gutterBottom>
        其他操作
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <Button variant="outlined" onClick={() => toaster.clear()}>
          清除所有通知
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            const id = toaster.toast({
              message: '这条通知将持续10秒',
              description: '除非你手动关闭它',
              duration: 10000,
            });
            console.log('通知ID:', id);
          }}
        >
          长时间通知
        </Button>
      </Stack>
    </div>
  );
}
