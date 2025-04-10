import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import GroupIcon from '@mui/icons-material/Group';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import type * as React from 'react';
import { Link, useLocation } from 'react-router';

interface SettingsNavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

interface SettingsNavGroup {
  title: string;
  items: SettingsNavItem[];
}

const settingsNavGroups: SettingsNavGroup[] = [
  {
    title: '账户',
    items: [
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
        title: '拖拽排序演示',
        path: '/settings/drag-and-drop',
        icon: <DragIndicatorIcon />,
      },
    ],
  },
  {
    title: '工作区',
    items: [
      {
        title: '常规设置',
        path: '/settings/workspace/general',
        icon: <SettingsIcon />,
      },
      {
        title: '账单与套餐',
        path: '/settings/workspace/billing',
        icon: <PaymentIcon />,
      },
      {
        title: '团队成员',
        path: '/settings/workspace/team',
        icon: <GroupIcon />,
      },
    ],
  },
];

export default function SettingsSideNav() {
  const location = useLocation();

  return (
    <Box
      sx={{
        pt: 2,
        width: 280,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        overflow: 'hidden',
        bgcolor: 'background.body',
      }}
    >
      {settingsNavGroups.map((group) => (
        <List key={group.title}>
          <ListSubheader
            sx={{
              // letterSpacing: 0,
              fontWeight: 600,
              '--ListItem-minHeight': '1.2rem',
            }}
          >
            {group.title}
          </ListSubheader>
          {group.items.map((item) => {
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
      ))}
    </Box>
  );
}
