import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Outlet } from 'react-router';

import SettingsSideNav from './SettingsSideNav';

export default function SettingsLayout() {
  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" spacing={3} sx={{ width: '100%' }}>
        {/* 侧边导航 */}
        <SettingsSideNav />

        {/* 内容区域 */}
        <Card
          sx={{
            flexGrow: 1,
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 3,
          }}
        >
          <Outlet />
        </Card>
      </Stack>
    </Box>
  );
}
