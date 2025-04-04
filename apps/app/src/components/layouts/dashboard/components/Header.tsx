import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import * as React from 'react';

import CustomDatePicker from './CustomDatePicker';
import MenuButton from './MenuButton';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
// import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';

import Search from './Search';

export default function Header() {
  return (
    <Box
      sx={(theme) => ({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        paddingLeft: '240px',
        zIndex: 'appBar',
        height: 64,
        pointerEvents: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          bgcolor: 'common.white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'auto',
        }}
      >
        <Stack
          direction="row"
          sx={{
            px: 2,
            // bgcolor: 'background.paper',
            display: { xs: 'none', md: 'flex' },
            width: '100%',
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            maxWidth: { sm: '100%', md: '1700px' },
          }}
          spacing={2}
        >
          <NavbarBreadcrumbs />
          <Stack direction="row" sx={{ gap: 1 }}>
            <Search />
            <CustomDatePicker />
            <MenuButton showBadge aria-label="Open notifications">
              <NotificationsRoundedIcon />
            </MenuButton>
            {/* <ColorModeIconDropdown /> */}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
