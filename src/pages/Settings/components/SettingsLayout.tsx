import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Outlet } from 'react-router';

import SettingsSideNav from './SettingsSideNav';

export default function SettingsLayout() {
  return (
    <Container maxWidth="xl" sx={{ pt: 2 }}>
      <Stack direction="row" spacing={3} sx={{ width: '100%' }}>
        {/* 侧边导航 */}
        <SettingsSideNav />

        {/* 内容区域 */}
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              py: 2,
            }}
          >
            <Outlet />
          </Container>
        </Box>
      </Stack>
    </Container>
  );
}
