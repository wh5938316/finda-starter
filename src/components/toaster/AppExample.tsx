'use client';

import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import Toaster from './Toaster';
import { ToasterProvider, useToast } from './ToasterContext';

/**
 * 这个示例展示如何在应用程序中集成 Toaster 组件
 *
 * 使用步骤：
 * 1. 在应用程序的根组件中包装 ToasterProvider
 * 2. 在应用程序的 UI 中添加 Toaster 组件（通常放在最外层）
 * 3. 使用 useToast hook 在任何组件中显示通知
 */

// 示例组件
const ToasterDemo = () => {
  const toast = useToast();

  const showSuccessToast = () => {
    toast.success('操作成功!', {
      description: '您的更改已保存。',
    });
  };

  const showErrorToast = () => {
    toast.error('操作失败', {
      description: '保存更改时发生错误，请稍后重试。',
    });
  };

  const showInfoToast = () => {
    toast.message('提示信息', {
      description: '您有5条未读消息。',
    });
  };

  const showWarningToast = () => {
    toast.loading('正在加载中...', {
      description: '请稍候，这可能需要一些时间。',
    });
  };

  const showPromiseToast = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve('成功数据') : reject(new Error('操作失败'));
      }, 2000);
    });

    toast.promise(promise, {
      loading: '正在处理请求...',
      success: (data) => `请求成功: ${data}`,
      error: (err) => `请求失败: ${err.message}`,
    });
  };

  const showUpdateToast = () => {
    toast.update('软件更新可用', {
      description: '新版本已准备好安装。',
      actions: [
        {
          label: '立即安装',
          onClick: () => toast.success('开始安装更新！'),
          variant: 'contained',
          color: 'primary',
        },
        {
          label: '稍后提醒',
          onClick: () => toast.dismissToast(toast.update('软件更新可用')),
          variant: 'outlined',
          color: 'inherit',
        },
      ],
    });
  };

  const showDeleteToast = () => {
    toast.deleteToast('用户已删除', {
      description: '用户 张三 已被成功删除。',
      actions: [
        {
          label: '恢复',
          onClick: () => toast.success('用户已恢复！'),
          variant: 'contained',
          color: 'warning',
        },
      ],
    });
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', my: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          通知演示
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Stack spacing={2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button fullWidth variant="contained" color="success" onClick={showSuccessToast}>
              成功通知
            </Button>
            <Button fullWidth variant="contained" color="error" onClick={showErrorToast}>
              错误通知
            </Button>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button fullWidth variant="contained" color="info" onClick={showInfoToast}>
              信息通知
            </Button>
            <Button fullWidth variant="contained" color="warning" onClick={showWarningToast}>
              加载通知
            </Button>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button fullWidth variant="contained" color="primary" onClick={showPromiseToast}>
              异步通知
            </Button>
            <Button fullWidth variant="contained" color="primary" onClick={showUpdateToast}>
              更新通知（带按钮）
            </Button>
          </Stack>
          <Button fullWidth variant="contained" color="warning" onClick={showDeleteToast}>
            删除通知（带恢复按钮）
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

// 配置面板接口
interface ConfigPanelProps {
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  expandOnHover: boolean;
  onExpandOnHoverChange: (expandOnHover: boolean) => void;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  onPositionChange: (position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left') => void;
}

// 配置面板
const ConfigPanel: React.FC<ConfigPanelProps> = ({
  expanded,
  onExpandedChange,
  expandOnHover,
  onExpandOnHoverChange,
  position,
  onPositionChange,
}) => {
  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4, mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          通知设置
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={1}>
          <FormControlLabel
            control={
              <Switch checked={expanded} onChange={(e) => onExpandedChange(e.target.checked)} />
            }
            label="默认展开"
          />
          <FormControlLabel
            control={
              <Switch
                checked={expandOnHover}
                onChange={(e) => onExpandOnHoverChange(e.target.checked)}
              />
            }
            label="悬停展开"
          />
          <Typography variant="subtitle2" sx={{ mt: 1 }}>
            位置:
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant={position === 'bottom-right' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => onPositionChange('bottom-right')}
            >
              右下
            </Button>
            <Button
              variant={position === 'bottom-left' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => onPositionChange('bottom-left')}
            >
              左下
            </Button>
            <Button
              variant={position === 'top-right' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => onPositionChange('top-right')}
            >
              右上
            </Button>
            <Button
              variant={position === 'top-left' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => onPositionChange('top-left')}
            >
              左上
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

// 主应用示例
const AppExample = () => {
  const [expandByDefault, setExpandByDefault] = useState(false);
  const [expandOnHover, setExpandOnHover] = useState(true);
  const [position, setPosition] = useState<
    'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  >('bottom-right');

  return (
    <ToasterProvider>
      <ConfigPanel
        expanded={expandByDefault}
        onExpandedChange={setExpandByDefault}
        expandOnHover={expandOnHover}
        onExpandOnHoverChange={setExpandOnHover}
        position={position}
        onPositionChange={setPosition}
      />
      <ToasterDemo />
      <Toaster
        expandByDefault={expandByDefault}
        expandOnHover={expandOnHover}
        position={position}
      />
    </ToasterProvider>
  );
};

export default AppExample;
