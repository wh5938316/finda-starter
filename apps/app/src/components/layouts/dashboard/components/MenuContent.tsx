import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import HomeIcon from '@mui/icons-material/Home';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { Link, useLocation } from 'react-router';

// 定义导航项接口
interface NavItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  tooltip?: string;
}

// 主要导航项
const mainNavItems: NavItem[] = [
  {
    text: '首页',
    icon: <HomeIcon />,
    path: '/',
    tooltip: '返回首页',
  },
  {
    text: '数据分析',
    icon: <AnalyticsRoundedIcon />,
    path: '/analytics',
    tooltip: '查看数据分析',
  },
  {
    text: '客户管理',
    icon: <PeopleRoundedIcon />,
    path: '/clients',
    tooltip: '管理客户信息',
  },
  {
    text: '任务列表',
    icon: <AssignmentRoundedIcon />,
    path: '/tasks',
    tooltip: '查看任务列表',
  },
];

// 次要导航项
const secondaryNavItems: NavItem[] = [
  {
    text: '设置',
    icon: <SettingsRoundedIcon />,
    path: '/settings',
    tooltip: '系统设置',
  },
  {
    text: '关于我们',
    icon: <InfoRoundedIcon />,
    path: '/about',
    tooltip: '关于我们',
  },
  {
    text: '反馈建议',
    icon: <HelpRoundedIcon />,
    path: '/feedback',
    tooltip: '提供反馈',
  },
];

export default function MenuContent() {
  const location = useLocation();

  // 判断当前导航项是否处于激活状态
  const isActive = (path: string) => {
    // 根路径特殊处理
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    // 其他路径前缀匹配
    return path !== '/' && location.pathname.startsWith(path);
  };

  // 渲染导航项
  const renderNavItem = (item: NavItem) => {
    const active = isActive(item.path);

    return (
      <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
        <Tooltip title={item.tooltip || item.text} placement="right" arrow>
          <ListItemButton
            component={Link}
            to={item.path}
            selected={active}
            sx={{
              '&.Mui-selected': {
                bgcolor: 'primary.light',
                '&:hover': {
                  bgcolor: 'primary.light',
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: active ? 'primary.main' : 'inherit',
                minWidth: 0,
                mr: 2,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: active ? 'medium' : 'regular',
              }}
            />
          </ListItemButton>
        </Tooltip>
      </ListItem>
    );
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>{mainNavItems.map(renderNavItem)}</List>
      <List dense>{secondaryNavItems.map(renderNavItem)}</List>
    </Stack>
  );
}
