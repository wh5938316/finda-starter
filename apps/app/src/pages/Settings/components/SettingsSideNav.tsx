import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link, useLocation } from 'react-router';

interface SettingsNavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const settingsNavItems: SettingsNavItem[] = [
  {
    title: '个人资料',
    path: '/settings/profile',
    icon: <PersonIcon />,
  },
  {
    title: '安全设置',
    path: '/settings/security',
    icon: <SecurityIcon />,
  },
  {
    title: '通知设置',
    path: '/settings/notifications',
    icon: <NotificationsIcon />,
  },
  {
    title: '语言设置',
    path: '/settings/language',
    icon: <LanguageIcon />,
  },
];

export default function SettingsSideNav() {
  const location = useLocation();

  return (
    <Box
      sx={{
        width: 280,
        flexShrink: 0,
        overflow: 'hidden',
        bgcolor: 'background.body',
      }}
    >
      <List>
        <ListSubheader
          sx={{
            // letterSpacing: 0,
            fontWeight: 600,
            '--ListItem-minHeight': '1.2rem',
          }}
        >
          Account
        </ListSubheader>
        {settingsNavItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={isActive}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? 'primary.main' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  slotProps={{
                    primary: {
                      fontWeight: isActive ? 'bold' : 'regular',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
