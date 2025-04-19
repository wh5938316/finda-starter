import Box from '@mui/material/Box';
import * as React from 'react';
import { memo } from 'react';

import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import SideMenu from './components/SideMenu';

function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu />
      <AppNavbar />
      {/* Main content */}
      <Box
        component="main"
        sx={(theme) => ({
          position: 'relative',
          flexGrow: 1,
          // backgroundColor: theme.vars
          //   ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
          //   : alpha(theme.palette.background.default, 1),
          overflow: 'auto',
          paddingTop: '64px',
          backgroundColor: theme.vars.palette.background.surface,
        })}
      >
        <Header />
        {children}
      </Box>
    </Box>
  );
}

export default memo(Dashboard);
