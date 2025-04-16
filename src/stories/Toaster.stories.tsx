import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Meta } from '@storybook/react';
import type { ToasterPosition } from 'material-ui-toaster';
import { Toaster, toaster } from 'material-ui-toaster';
import * as React from 'react';

const meta = {
  title: 'MUI/Toaster',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

// 基础通知
export const BasicToasts = () => {
  const showSuccessToast = () => {
    toaster.success('操作成功完成', { description: '您的操作已成功完成。' });
  };

  const showErrorToast = () => {
    toaster.error('操作失败', { description: '处理您的请求时出现错误。' });
  };

  const showWarningToast = () => {
    toaster.warning('请注意', { description: '此操作可能会导致数据丢失。' });
  };

  const showInfoToast = () => {
    toaster.info('这是一条信息', { description: '系统将在30分钟后进行维护。' });
  };

  const showDefaultToast = () => {
    toaster.toast({
      message: '这是一条默认通知',
      description: '不指定类型的通知将使用默认样式。',
    });
  };

  return (
    <Card sx={{ width: '100%', maxWidth: 500 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          基础通知
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          material-ui-toaster 提供了几种预设的通知类型，每种都有不同的颜色和图标。
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
          <Button variant="contained" color="success" onClick={showSuccessToast}>
            成功
          </Button>
          <Button variant="contained" color="error" onClick={showErrorToast}>
            错误
          </Button>
          <Button variant="contained" color="warning" onClick={showWarningToast}>
            警告
          </Button>
          <Button variant="contained" color="info" onClick={showInfoToast}>
            信息
          </Button>
          <Button variant="contained" onClick={showDefaultToast}>
            默认
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

// 自定义通知
export const CustomToasts = () => {
  const showCustomToast = () => {
    toaster.info('自定义通知内容', {
      description: '这个通知使用了自定义的持续时间和位置。',
      duration: 5000,
      position: 'bottom-right',
    });
  };

  const showCustomContentToast = () => {
    const CustomContent = (
      <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
        <Typography variant="subtitle2">自定义通知</Typography>
        <Typography variant="body2">
          这是一个带有自定义内容的通知，可以包含更复杂的布局。
        </Typography>
      </Alert>
    );

    toaster.custom(CustomContent, { duration: 5000 });
  };

  const showActionToast = () => {
    toaster.action(
      '您要删除此文件吗？',
      '删除',
      () => {
        // 模拟删除操作
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 1000);
        });
      },
      {
        type: 'warning',
        description: '此操作不可撤销',
        success: '文件已成功删除',
        error: '删除操作失败',
      },
    );
  };

  return (
    <Card sx={{ width: '100%', maxWidth: 500 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          自定义通知
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          通知可以根据需求自定义，包括持续时间、位置、内容和操作按钮等。
        </Typography>

        <Stack spacing={2}>
          <Button variant="outlined" onClick={showCustomToast}>
            自定义持续时间和位置
          </Button>
          <Button variant="outlined" onClick={showCustomContentToast}>
            自定义内容
          </Button>
          <Button variant="outlined" onClick={showActionToast}>
            带操作按钮
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

// 通知配置器
export const ToastConfigurator = () => {
  const [message, setMessage] = React.useState('这是一条可配置的通知');
  const [description, setDescription] = React.useState('这是通知的描述文本');
  const [type, setType] = React.useState('info');
  const [duration, setDuration] = React.useState(3000);
  const [position, setPosition] = React.useState<ToasterPosition>('top-right');
  const [expand, setExpand] = React.useState(false);

  const showConfiguredToast = () => {
    if (type === 'default') {
      toaster.toast({
        message,
        description,
        duration,
        position,
        expand,
      });
    } else {
      toaster[type as 'success' | 'error' | 'warning' | 'info'](message, {
        description,
        duration,
        position,
        expand,
      });
    }
  };

  return (
    <Card sx={{ width: '100%', maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          通知配置器
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          使用下面的控件定制通知的外观和行为，然后点击"显示通知"按钮查看效果。
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="通知内容"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="通知描述"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={2}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>通知类型</InputLabel>
              <Select value={type} onChange={(e) => setType(e.target.value)} label="通知类型">
                <MenuItem value="default">默认</MenuItem>
                <MenuItem value="success">成功</MenuItem>
                <MenuItem value="error">错误</MenuItem>
                <MenuItem value="warning">警告</MenuItem>
                <MenuItem value="info">信息</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Typography id="duration-slider" gutterBottom>
                持续时间: {duration}ms
              </Typography>
              <Slider
                value={duration}
                onChange={(_, value) => setDuration(value as number)}
                min={1000}
                max={10000}
                step={500}
                valueLabelDisplay="auto"
                aria-labelledby="duration-slider"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>位置</InputLabel>
              <Select
                value={position}
                onChange={(e) => setPosition(e.target.value as ToasterPosition)}
                label="位置"
              >
                <MenuItem value="top-left">左上角</MenuItem>
                <MenuItem value="top-center">顶部居中</MenuItem>
                <MenuItem value="top-right">右上角</MenuItem>
                <MenuItem value="bottom-left">左下角</MenuItem>
                <MenuItem value="bottom-center">底部居中</MenuItem>
                <MenuItem value="bottom-right">右下角</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  variant={expand ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => setExpand(!expand)}
                  sx={{ mr: 1 }}
                >
                  展开显示
                </Button>
                <Typography variant="body2" color="text.secondary">
                  {expand ? '已启用' : '已禁用'}
                </Typography>
              </Box>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={showConfiguredToast}>
              显示通知
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// 顺序通知示例
export const SequentialToasts = () => {
  const showSequentialToasts = () => {
    toaster.info('第一条通知', { description: '这是第一条顺序通知' });

    setTimeout(() => {
      toaster.success('第二条通知', { description: '这是第二条顺序通知' });
    }, 1000);

    setTimeout(() => {
      toaster.warning('第三条通知', { description: '这是第三条顺序通知' });
    }, 2000);

    setTimeout(() => {
      toaster.error('第四条通知', { description: '这是第四条顺序通知' });
    }, 3000);
  };

  const showMultipleToasts = () => {
    for (let i = 1; i <= 5; i++) {
      toaster[i % 2 === 0 ? 'info' : 'success'](`这是第 ${i} 条通知`, {
        description: `这是第 ${i} 条通知的描述文本`,
      });
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <Card sx={{ width: '100%', maxWidth: 500 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            顺序通知
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            多条通知会自动排队显示，您可以控制显示的时机和方式。
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={showSequentialToasts}>
              顺序显示通知
            </Button>
            <Button variant="contained" onClick={showMultipleToasts}>
              同时显示多条
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
