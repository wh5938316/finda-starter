import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DevicesIcon from '@mui/icons-material/Devices';
import HistoryIcon from '@mui/icons-material/History';
import LaptopIcon from '@mui/icons-material/Laptop';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import TabletIcon from '@mui/icons-material/Tablet';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import * as React from 'react';
import { Link } from 'react-router';

// 样式组件
const SettingsIcon = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  padding: theme.spacing(1),
  marginRight: theme.spacing(2),
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
}));

interface DeviceCardProps {
  current?: boolean;
}

const DeviceCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'current',
})<DeviceCardProps>(({ theme, current }) => ({
  padding: theme.spacing(2.5),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  borderLeft: current ? `4px solid ${theme.palette.primary.main}` : 'none',
  backgroundColor: alpha(theme.palette.background.paper, 0.6),
  '&:hover': {
    boxShadow: theme.shadows[2],
  },
}));

// 模拟设备数据
const devices = [
  {
    id: 1,
    name: 'Windows 10',
    browser: 'Chrome',
    icon: <LaptopIcon />,
    location: '北京, 中国',
    ip: '114.88.XX.XX',
    lastActive: '刚刚',
    current: true,
  },
  {
    id: 2,
    name: 'iPhone 12',
    browser: 'Safari',
    icon: <PhoneIphoneIcon />,
    location: '北京, 中国',
    ip: '114.88.XX.XX',
    lastActive: '昨天 15:30',
    current: false,
  },
  {
    id: 3,
    name: 'MacBook Pro',
    browser: 'Firefox',
    icon: <LaptopIcon />,
    location: '上海, 中国',
    ip: '202.96.XX.XX',
    lastActive: '3天前',
    current: false,
  },
  {
    id: 4,
    name: 'iPad Air',
    browser: 'Safari',
    icon: <TabletIcon />,
    location: '广州, 中国',
    ip: '59.41.XX.XX',
    lastActive: '1周前',
    current: false,
  },
];

const DeviceManagement = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Link to="/settings/security">
          <IconButton sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
        </Link>
        <Typography variant="h4" fontWeight="bold">
          设备管理
        </Typography>
      </Box>
      <Typography color="text.secondary" variant="body1" sx={{ mt: 1, mb: 4 }}>
        查看和管理当前已登录到您账户的所有设备
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <SettingsIcon>
            <DevicesIcon />
          </SettingsIcon>
          <Typography variant="h6" fontWeight="medium">
            当前登录设备
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          以下是目前已登录到您账户的所有设备。您可以随时注销不需要的设备，提高账户安全性。如果发现不是您本人的登录活动，请立即修改密码并联系客服。
        </Typography>

        {devices.map((device) => (
          <DeviceCard key={device.id} current={device.current} variant="outlined" sx={{ mb: 2 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
            >
              <Box sx={{ display: 'flex' }}>
                <SettingsIcon sx={{ mt: 0.5 }}>{device.icon}</SettingsIcon>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ mr: 1 }}>
                      {device.current ? '当前设备 • ' : ''}
                      {device.name}
                    </Typography>
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.3,
                        bgcolor: alpha('#000', 0.05),
                        borderRadius: 1,
                        fontSize: '0.75rem',
                      }}
                    >
                      {device.browser}
                    </Box>
                    {device.current && <Chip label="活跃中" color="success" />}
                  </Box>
                  <Typography variant="body2">
                    {device.location} • IP: {device.ip}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <HistoryIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="caption" color="text.secondary">
                      最后活动: {device.lastActive}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              {!device.current && (
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  sx={{
                    height: 36,
                    minWidth: 90,
                  }}
                >
                  注销设备
                </Button>
              )}
            </Box>
          </DeviceCard>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="medium">
            登录历史记录
          </Typography>

          <Button variant="contained" color="error">
            注销所有其他设备
          </Button>
        </Stack>

        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>设备</TableCell>
                <TableCell>IP地址</TableCell>
                <TableCell>地点</TableCell>
                <TableCell>时间</TableCell>
                <TableCell>状态</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Windows 10 • Chrome</TableCell>
                <TableCell>114.88.XX.XX</TableCell>
                <TableCell>北京, 中国</TableCell>
                <TableCell>2023-04-04 14:32</TableCell>
                <TableCell sx={{ color: 'success.main' }}>成功</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>iPhone 12 • Safari</TableCell>
                <TableCell>114.88.XX.XX</TableCell>
                <TableCell>北京, 中国</TableCell>
                <TableCell>2023-04-03 15:30</TableCell>
                <TableCell sx={{ color: 'success.main' }}>成功</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>MacBook Pro • Firefox</TableCell>
                <TableCell>202.96.XX.XX</TableCell>
                <TableCell>上海, 中国</TableCell>
                <TableCell>2023-04-01 09:15</TableCell>
                <TableCell sx={{ color: 'success.main' }}>成功</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>未知设备 • Chrome</TableCell>
                <TableCell>98.114.XX.XX</TableCell>
                <TableCell>纽约, 美国</TableCell>
                <TableCell>2023-03-30 02:45</TableCell>
                <TableCell sx={{ color: 'error.main' }}>失败</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>iPad Air • Safari</TableCell>
                <TableCell>59.41.XX.XX</TableCell>
                <TableCell>广州, 中国</TableCell>
                <TableCell>2023-03-28 18:22</TableCell>
                <TableCell sx={{ color: 'success.main' }}>成功</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export const Component = DeviceManagement;
