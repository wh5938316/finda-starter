'use client';

import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

import NotificationList from './NotificationList';

// 示例组件
const NotificationExample = () => {
  const [expand, setExpand] = useState(true);

  // 切换展开/折叠状态
  const toggleExpand = () => {
    setExpand(!expand);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        通知组件示例
      </Typography>

      <Paper elevation={0} variant="outlined" sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          组件说明
        </Typography>

        <Typography variant="body1" paragraph>
          这个示例展示了MUI风格的通知组件，固定在右下角。新通知会在顶部显示，通知可以展开或折叠显示。
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          通知顺序
        </Typography>

        <Typography variant="body2" paragraph>
          • 展开状态：最新的通知（ID较大）显示在顶部，旧通知显示在底部，顺序是4-3-2-1
        </Typography>

        <Typography variant="body2" paragraph>
          • 折叠状态：最新的通知叠放在外层，可以看到新通知覆盖旧通知
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
          使用下方的按钮添加新通知，然后观察它们的排列顺序。点击通知可以将其关闭。
        </Typography>

        <Button variant="outlined" onClick={toggleExpand} sx={{ mt: 2 }}>
          {expand ? '强制折叠通知' : '强制展开通知'}
        </Button>
      </Paper>

      {/* 通知组件 */}
      <NotificationList position="bottom-right" expand={expand} expandByDefault={true} />
    </Box>
  );
};

export default NotificationExample;
