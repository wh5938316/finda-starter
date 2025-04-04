// eslint-disable-next-line no-restricted-imports
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import DeviceUnknownIcon from '@mui/icons-material/DeviceUnknown';
import GroupIcon from '@mui/icons-material/Group';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import HomeIcon from '@mui/icons-material/Home';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PaymentIcon from '@mui/icons-material/Payment';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import { Navigate, Outlet, ScrollRestoration, createBrowserRouter } from 'react-router';

import AuthLayout from '@/components/layouts/auth';
import DashboardLayout from '@/components/layouts/dashboard';

export const router = createBrowserRouter([
  {
    path: 'auth',
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
    children: [
      {
        path: 'login',
        lazy: () => import('./Auth/Login'),
      },
      {
        path: 'register',
        lazy: () => import('./Auth/Register'),
      },
      {
        // 默认重定向到登录页
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },
    ],
  },
  {
    element: (
      <DashboardLayout>
        <ScrollRestoration />
        <Outlet />
      </DashboardLayout>
    ),
    children: [
      {
        path: '/',
        handle: {
          title: '首页',
          icon: <HomeIcon fontSize="small" />,
        },
        lazy: () => import('./Home'),
      },
      {
        path: 'analytics',
        handle: {
          title: '数据分析',
          icon: <AnalyticsRoundedIcon fontSize="small" />,
        },
        lazy: async () => {
          return {
            Component: () => <div>数据分析页面（待实现）</div>,
          };
        },
      },
      {
        path: 'notifications',
        handle: {
          title: '通知',
          icon: <NotificationsIcon fontSize="small" />,
        },
        lazy: () => import('./Notifications'),
      },
      {
        path: 'clients',
        handle: {
          title: '客户管理',
          icon: <PeopleRoundedIcon fontSize="small" />,
        },
        lazy: async () => {
          return {
            Component: () => <div>客户管理页面（待实现）</div>,
          };
        },
      },
      {
        path: 'messages',
        handle: {
          title: '消息',
          icon: <MessageIcon fontSize="small" />,
        },
        lazy: () => import('./Messages'),
      },
      {
        path: 'tasks',
        handle: {
          title: '任务列表',
          icon: <AssignmentRoundedIcon fontSize="small" />,
        },
        lazy: async () => {
          return {
            Component: () => <div>任务列表页面（待实现）</div>,
          };
        },
      },
      {
        path: 'settings',
        handle: {
          title: '设置',
          icon: <SettingsIcon fontSize="small" />,
        },
        lazy: async () => {
          const { default: Component } = await import('./Settings/components/SettingsLayout');
          return { Component };
        },
        children: [
          {
            path: 'profile',
            handle: {
              title: '个人资料',
              icon: <PersonIcon fontSize="small" />,
            },
            lazy: async () => {
              const { default: Component } = await import('./Settings/Profile');
              return {
                Component,
              };
            },
          },
          {
            path: 'security',
            handle: {
              title: '安全设置',
              icon: <SecurityIcon fontSize="small" />,
            },
            lazy: async () => {
              const { default: Component } = await import('./Settings/Security');
              return {
                Component,
              };
            },
          },
          {
            path: 'security/recent-devices',
            handle: {
              title: '设备管理',
              icon: <DeviceUnknownIcon fontSize="small" />,
            },
            lazy: () => import('./Settings/DeviceManagement'),
          },
          {
            path: 'notifications',
            handle: {
              title: '通知设置',
              icon: <NotificationsIcon fontSize="small" />,
            },
            lazy: () => import('./Settings/Notifications'),
          },
          {
            // 默认重定向到个人资料页
            index: true,
            lazy: async () => {
              return {
                Component: () => <Navigate to="/settings/profile" replace />,
              };
            },
          },
          {
            path: 'workspace/general',
            handle: {
              title: '工作区常规设置',
              icon: <DesktopMacIcon fontSize="small" />,
            },
            lazy: async () => {
              const { default: Component } = await import('./Settings/Workspace/General');
              return { Component };
            },
          },
          {
            path: 'workspace/billing',
            handle: {
              title: '账单与套餐',
              icon: <PaymentIcon fontSize="small" />,
            },
            lazy: () => import('./Settings/Workspace/Billing'),
          },
          {
            path: 'workspace/team',
            handle: {
              title: '团队成员',
              icon: <GroupIcon fontSize="small" />,
            },
            lazy: async () => {
              const { default: Component } = await import('./Settings/Workspace/Team');
              return { Component };
            },
          },
        ],
      },
      {
        path: 'about',
        handle: {
          title: '关于我们',
          icon: <InfoRoundedIcon fontSize="small" />,
        },
        lazy: async () => {
          return {
            Component: () => <div>关于我们页面（待实现）</div>,
          };
        },
      },
      {
        path: 'feedback',
        handle: {
          title: '反馈建议',
          icon: <HelpRoundedIcon fontSize="small" />,
        },
        lazy: async () => {
          return {
            Component: () => <div>反馈建议页面（待实现）</div>,
          };
        },
      },
    ],
  },
]);
