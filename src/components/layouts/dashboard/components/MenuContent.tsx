import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import FlagIcon from '@mui/icons-material/Flag';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import HomeIcon from '@mui/icons-material/Home';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import WorkIcon from '@mui/icons-material/Work';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { memo, useMemo } from 'react';
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
    text: '消息',
    icon: <MessageIcon />,
    path: '/messages',
    tooltip: '查看消息',
  },
  {
    text: '通知',
    icon: <NotificationsIcon />,
    path: '/notifications',
    tooltip: '查看通知',
  },
  {
    text: '引导演示',
    icon: <FlagIcon />,
    path: '/guide',
    tooltip: '查看引导演示',
  },
  {
    text: '项目创建',
    icon: <WorkIcon />,
    path: '/project-creation',
    tooltip: '创建项目',
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

const NavItem = memo(({ item, isActive }: { item: NavItem; isActive: boolean }) => {
  return (
    <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
      <Tooltip title={item.tooltip || item.text} placement="right" arrow>
        <ListItemButton
          component={Link}
          to={item.path}
          selected={isActive}
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
              color: isActive ? 'primary.main' : 'inherit',
              minWidth: 0,
              mr: 2,
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.text}
            primaryTypographyProps={{
              fontWeight: isActive ? 'medium' : 'regular',
            }}
          />
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
});

NavItem.displayName = 'NavItem';

function MenuContent() {
  const location = useLocation();

  // 使用 useMemo 优化 isActive 函数，当 location.pathname 变化时才重新计算
  const isActive = useMemo(() => {
    return (path: string) => {
      // 根路径特殊处理
      if (path === '/' && location.pathname === '/') {
        return true;
      }
      // 其他路径前缀匹配
      return path !== '/' && location.pathname.startsWith(path);
    };
  }, [location.pathname]);

  // 使用 useMemo 记忆主导航列表
  const mainNavComponents = useMemo(() => {
    return mainNavItems.map((item) => (
      <NavItem key={item.path} item={item} isActive={isActive(item.path)} />
    ));
  }, [isActive]);

  // 使用 useMemo 记忆次要导航列表
  const secondaryNavComponents = useMemo(() => {
    return secondaryNavItems.map((item) => (
      <NavItem key={item.path} item={item} isActive={isActive(item.path)} />
    ));
  }, [isActive]);

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>{mainNavComponents}</List>
      <List dense>{secondaryNavComponents}</List>
    </Stack>
  );
}

export default memo(MenuContent);
