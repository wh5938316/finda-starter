import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';
import EventIcon from '@mui/icons-material/Event';
import FilterListIcon from '@mui/icons-material/FilterList';
import GroupIcon from '@mui/icons-material/Group';
import InfoIcon from '@mui/icons-material/Info';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import React, { MouseEvent, useState } from 'react';

// 类型定义
interface StyledListItemProps {
  isUnread?: boolean;
}

interface NotificationType {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'system' | 'task' | 'team' | 'comment' | 'calendar' | 'security';
  priority: 'normal' | 'high' | 'low';
}

// 样式组件
const AppContainer = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 64px)',
  width: '100%',
  display: 'flex',
  overflow: 'hidden',
}));

const NotificationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  height: '100%',
  overflow: 'hidden',
  // backgroundColor: alpha(theme.palette.background.paper, 0.8),
  borderRadius: 0,
  boxShadow: theme.shadows[1],
}));

const NotificationHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const SearchField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(2),
  backgroundColor: alpha(theme.palette.background.paper, 0.4),
  borderRadius: theme.shape.borderRadius * 5,
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius * 5,
  },
}));

const NotificationList = styled(List)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  overflow: 'auto',
  flex: 1,
}));

const NotificationItem = styled(ListItem)<StyledListItemProps>(({ theme, isUnread }) => ({
  padding: theme.spacing(2, 2, 2, isUnread ? 3.5 : 2),
  cursor: 'pointer',
  backgroundColor: isUnread ? alpha(theme.palette.primary.main, 0.05) : 'transparent',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
  },
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0.5, 0),
}));

const UnreadIndicator = styled(Box)(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  position: 'absolute',
  left: theme.spacing(1.25),
  top: '50%',
  transform: 'translateY(-50%)',
}));

const NotificationTypeIcon = ({ type }: { type: NotificationType['type'] }) => {
  switch (type) {
    case 'system':
      return <InfoIcon color="info" />;
    case 'task':
      return <TaskAltIcon color="success" />;
    case 'team':
      return <GroupIcon color="primary" />;
    case 'comment':
      return <CommentIcon color="secondary" />;
    case 'calendar':
      return <EventIcon color="warning" />;
    case 'security':
      return <ErrorIcon color="error" />;
    default:
      return <InfoIcon />;
  }
};

// 模拟数据
const notifications: NotificationType[] = [
  {
    id: 1,
    title: '系统更新',
    message: '系统将于今晚22:00进行维护更新，预计持续2小时',
    time: '10分钟前',
    read: false,
    type: 'system',
    priority: 'high',
  },
  {
    id: 2,
    title: '任务完成',
    message: '您的任务"设计产品原型"已被标记为完成',
    time: '30分钟前',
    read: false,
    type: 'task',
    priority: 'normal',
  },
  {
    id: 3,
    title: '团队邀请',
    message: '李四邀请您加入"产品开发"团队',
    time: '1小时前',
    read: true,
    type: 'team',
    priority: 'normal',
  },
  {
    id: 4,
    title: '新评论',
    message: '王五在您的文档"2024年产品规划"中添加了评论',
    time: '2小时前',
    read: true,
    type: 'comment',
    priority: 'normal',
  },
  {
    id: 5,
    title: '日程提醒',
    message: '您有一个会议将在明天上午10:00开始',
    time: '3小时前',
    read: false,
    type: 'calendar',
    priority: 'high',
  },
  {
    id: 6,
    title: '安全提醒',
    message: '您的账号在新设备上登录，请确认是否为您本人操作',
    time: '5小时前',
    read: true,
    type: 'security',
    priority: 'high',
  },
  {
    id: 7,
    title: '任务分配',
    message: '张三为您分配了新任务"更新用户文档"',
    time: '昨天',
    read: true,
    type: 'task',
    priority: 'normal',
  },
  {
    id: 8,
    title: '系统通知',
    message: '您的存储空间使用率已达到80%',
    time: '昨天',
    read: true,
    type: 'system',
    priority: 'low',
  },
  {
    id: 9,
    title: '团队更新',
    message: '项目团队添加了3个新成员',
    time: '2天前',
    read: true,
    type: 'team',
    priority: 'low',
  },
  {
    id: 10,
    title: '日程变更',
    message: '周五的产品评审会议改为线上进行',
    time: '3天前',
    read: true,
    type: 'calendar',
    priority: 'normal',
  },
];

const NotificationsListPage = () => {
  const theme = useTheme();
  const [selectedNotification, setSelectedNotification] = useState<number | null>(null);
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [actionAnchorEl, setActionAnchorEl] = useState<null | HTMLElement>(null);
  const [currentNotificationId, setCurrentNotificationId] = useState<number | null>(null);

  const handleFilterOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleActionOpen = (event: MouseEvent<HTMLButtonElement>, notificationId: number) => {
    event.stopPropagation();
    setActionAnchorEl(event.currentTarget);
    setCurrentNotificationId(notificationId);
  };

  const handleActionClose = () => {
    setActionAnchorEl(null);
    setCurrentNotificationId(null);
  };

  const handleMarkAsRead = (notificationId: number, event?: MouseEvent) => {
    if (event) event.stopPropagation();
    setNotificationsList((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification,
      ),
    );
    handleActionClose();
  };

  const handleMarkAsUnread = (notificationId: number, event?: MouseEvent) => {
    if (event) event.stopPropagation();
    setNotificationsList((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, read: false } : notification,
      ),
    );
    handleActionClose();
  };

  const handleDelete = (notificationId: number, event?: MouseEvent) => {
    if (event) event.stopPropagation();
    setNotificationsList((prev) =>
      prev.filter((notification) => notification.id !== notificationId),
    );
    handleActionClose();
  };

  const handleNotificationClick = (notificationId: number) => {
    setSelectedNotification(notificationId);
    handleMarkAsRead(notificationId);
  };

  const handleMarkAllAsRead = () => {
    setNotificationsList((prev) => prev.map((notification) => ({ ...notification, read: true })));
  };

  return (
    <AppContainer maxWidth="xl">
      <NotificationContainer>
        {/* 通知页头部 */}
        <NotificationHeader>
          <Typography variant="h6" fontWeight="medium">
            通知列表
          </Typography>
          <Box>
            <Stack direction="row" spacing={1}>
              <Tooltip title="全部标为已读">
                <IconButton size="small" onClick={handleMarkAllAsRead}>
                  <CheckIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="筛选通知">
                <IconButton size="small" onClick={handleFilterOpen}>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            </Stack>
            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={handleFilterClose}
            >
              <MenuItem>所有通知</MenuItem>
              <MenuItem>未读通知</MenuItem>
              <MenuItem>系统通知</MenuItem>
              <MenuItem>任务通知</MenuItem>
              <MenuItem>团队通知</MenuItem>
              <MenuItem>评论通知</MenuItem>
              <MenuItem>日程通知</MenuItem>
              <MenuItem>安全通知</MenuItem>
              <Divider />
              <MenuItem>高优先级</MenuItem>
              <MenuItem>普通优先级</MenuItem>
              <MenuItem>低优先级</MenuItem>
            </Menu>
          </Box>
        </NotificationHeader>

        {/* 搜索框 */}
        <SearchField
          placeholder="搜索通知..."
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* 通知列表容器 */}
        <Box sx={{ flex: 1, overflow: 'hidden', px: 1 }}>
          {/* 通知列表 */}
          <NotificationList>
            {notificationsList.length === 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  padding: 4,
                }}
              >
                <NotificationsOffIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  没有通知
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  所有新通知将显示在这里
                </Typography>
              </Box>
            ) : (
              notificationsList.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  isUnread={!notification.read}
                  onClick={() => handleNotificationClick(notification.id)}
                  divider={false}
                >
                  {!notification.read && <UnreadIndicator />}
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor:
                          notification.priority === 'high'
                            ? alpha(theme.palette.error.main, 0.1)
                            : notification.priority === 'low'
                              ? alpha(theme.palette.success.main, 0.1)
                              : alpha(theme.palette.primary.main, 0.1),
                        color:
                          notification.priority === 'high'
                            ? theme.palette.error.main
                            : notification.priority === 'low'
                              ? theme.palette.success.main
                              : theme.palette.primary.main,
                      }}
                    >
                      <NotificationTypeIcon type={notification.type} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          fontWeight={notification.read ? 'regular' : 'medium'}
                        >
                          {notification.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {notification.time}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color={notification.read ? 'text.secondary' : 'text.primary'}
                        sx={{
                          mt: 0.5,
                          fontWeight: notification.read ? 'regular' : 'medium',
                        }}
                      >
                        {notification.message}
                      </Typography>
                    }
                  />
                  <IconButton
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={(e) => handleActionOpen(e, notification.id)}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </NotificationItem>
              ))
            )}
          </NotificationList>
        </Box>

        {/* 通知操作菜单 */}
        <Menu anchorEl={actionAnchorEl} open={Boolean(actionAnchorEl)} onClose={handleActionClose}>
          {currentNotificationId &&
          notificationsList.find((n) => n.id === currentNotificationId)?.read ? (
            <MenuItem
              onClick={(e) => handleMarkAsUnread(currentNotificationId, e as unknown as MouseEvent)}
            >
              <ListItemAvatar sx={{ minWidth: 36 }}>
                <MarkAsUnreadIcon fontSize="small" />
              </ListItemAvatar>
              标为未读
            </MenuItem>
          ) : (
            <MenuItem
              onClick={(e) => handleMarkAsRead(currentNotificationId!, e as unknown as MouseEvent)}
            >
              <ListItemAvatar sx={{ minWidth: 36 }}>
                <CheckCircleIcon fontSize="small" />
              </ListItemAvatar>
              标为已读
            </MenuItem>
          )}
          <MenuItem
            onClick={(e) => handleDelete(currentNotificationId!, e as unknown as MouseEvent)}
          >
            <ListItemAvatar sx={{ minWidth: 36 }}>
              <DeleteIcon fontSize="small" />
            </ListItemAvatar>
            删除此通知
          </MenuItem>
          <MenuItem onClick={handleActionClose}>
            <ListItemAvatar sx={{ minWidth: 36 }}>
              <SettingsIcon fontSize="small" />
            </ListItemAvatar>
            通知设置
          </MenuItem>
        </Menu>
      </NotificationContainer>
    </AppContainer>
  );
};

export const Component = NotificationsListPage;
