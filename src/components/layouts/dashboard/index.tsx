import Box from '@mui/material/Box';
import type * as React from 'react';

import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import SideMenu from './components/SideMenu';

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu />
      <AppNavbar />
      {/* Main content */}
      <Box
        component="main"
        sx={{
          position: 'relative',
          flexGrow: 1,
          // backgroundColor: theme.vars
          //   ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
          //   : alpha(theme.palette.background.default, 1),
          overflow: 'auto',
          paddingTop: '64px',
        }}
      >
        <Header />
        {children}
      </Box>
    </Box>
  );
}
