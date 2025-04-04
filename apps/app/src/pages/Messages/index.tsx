import AttachFileIcon from '@mui/icons-material/AttachFile';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FilterListIcon from '@mui/icons-material/FilterList';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MicIcon from '@mui/icons-material/Mic';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import {
  Avatar,
  Badge,
  Box,
  Chip,
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
import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';

// 类型定义
interface MessageBubbleProps {
  isCurrentUser: boolean;
}

interface MessageGroupProps {
  isCurrentUser: boolean;
}

interface MessageStatusIconProps {
  status: 'sending' | 'sent' | 'read' | string;
}

interface StyledListItemProps {
  isSelected?: boolean;
}

// 样式组件
const AppContainer = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 64px)',
  width: '100%',
  display: 'flex',
  overflow: 'hidden',
}));

const MessageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  height: '100%',
  overflow: 'hidden',
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  borderRadius: 0,
  boxShadow: theme.shadows[1],
}));

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 360,
  borderRight: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

const ChatContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

const MessageList = styled(List)(({ theme }) => ({
  padding: 0,
  overflow: 'auto',
  flex: 1,
  gap: 0,
}));

const MessageListItem = styled(ListItem)<StyledListItemProps>(({ theme, isSelected }) => ({
  padding: theme.spacing(2),
  cursor: 'pointer',
  backgroundColor: isSelected ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(2),
  backgroundColor: alpha(theme.palette.background.paper, 0.4),
  borderRadius: theme.shape.borderRadius * 5,
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius * 5,
  },
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ChatMessages = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  overflow: 'auto',
  backgroundColor: alpha(theme.palette.background.default, 0.5),
}));

const MessageInput = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
}));

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isCurrentUser',
})<MessageBubbleProps>(({ theme, isCurrentUser }) => ({
  padding: theme.spacing(1.5, 2),
  borderRadius: isCurrentUser ? theme.spacing(2, 0, 2, 2) : theme.spacing(0, 2, 2, 2),
  backgroundColor: isCurrentUser
    ? alpha(theme.palette.primary.main, 0.9)
    : alpha(theme.palette.background.paper, 0.9),
  color: isCurrentUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
  marginBottom: theme.spacing(1),
  // boxShadow: theme.shadows[1],
  border: '1px solid',
  borderColor: theme.palette.divider,
  position: 'relative',
}));

const MessageGroup = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isCurrentUser',
})<MessageGroupProps>(({ theme, isCurrentUser }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: isCurrentUser ? 'flex-end' : 'flex-start',
  marginBottom: theme.spacing(2),
}));

// 模拟数据
const conversations = [
  {
    id: 1,
    name: '张三',
    avatar: '/avatars/user1.jpg',
    lastMessage: '我已经完成了项目的初步设计，准备开始开发阶段',
    time: '刚刚',
    unread: 2,
    online: true,
    isGroup: false,
  },
  {
    id: 2,
    name: '产品开发组',
    avatar: '/avatars/group1.jpg',
    lastMessage: '李四: 大家可以查看一下新需求文档的更新',
    time: '10:30',
    unread: 0,
    online: false,
    isGroup: true,
  },
  {
    id: 3,
    name: '王五',
    avatar: '/avatars/user2.jpg',
    lastMessage: '谢谢，我会尽快处理这个问题',
    time: '昨天',
    unread: 0,
    online: true,
    isGroup: false,
  },
  {
    id: 4,
    name: '市场团队',
    avatar: '/avatars/group2.jpg',
    lastMessage: '赵六: 下周二我们有一个重要的客户会议',
    time: '昨天',
    unread: 5,
    online: false,
    isGroup: true,
  },
  {
    id: 5,
    name: '钱七',
    avatar: '/avatars/user3.jpg',
    lastMessage: '收到了，我明天会发送更新版本给你',
    time: '周五',
    unread: 0,
    online: false,
    isGroup: false,
  },
];

const messages = [
  {
    id: 1,
    sender: { id: 1, name: '张三', avatar: '/avatars/user1.jpg' },
    content: '你好，项目进展如何了？',
    time: '10:15',
    status: 'read',
    isCurrentUser: false,
  },
  {
    id: 2,
    sender: { id: 999, name: '我', avatar: '/avatars/me.jpg' },
    content: '进展顺利，我已经完成了需求分析阶段。',
    time: '10:17',
    status: 'read',
    isCurrentUser: true,
  },
  {
    id: 3,
    sender: { id: 1, name: '张三', avatar: '/avatars/user1.jpg' },
    content: '太好了！你预计什么时候可以完成初稿？',
    time: '10:20',
    status: 'read',
    isCurrentUser: false,
  },
  {
    id: 4,
    sender: { id: 999, name: '我', avatar: '/avatars/me.jpg' },
    content: '我计划在周五前完成初步设计稿，然后我们可以一起讨论下一步的开发计划。',
    time: '10:22',
    status: 'read',
    isCurrentUser: true,
  },
  {
    id: 5,
    sender: { id: 1, name: '张三', avatar: '/avatars/user1.jpg' },
    content: '听起来不错。记得把设计文档也一并准备好，我们周五开会时会需要它。',
    time: '10:25',
    status: 'read',
    isCurrentUser: false,
  },
  {
    id: 6,
    sender: { id: 999, name: '我', avatar: '/avatars/me.jpg' },
    content:
      '没问题，我会准备好所有文档。另外，你看到最新的市场调研报告了吗？我觉得里面有些数据对我们很有参考价值。',
    time: '10:30',
    status: 'sent',
    isCurrentUser: true,
  },
  {
    id: 7,
    sender: { id: 1, name: '张三', avatar: '/avatars/user1.jpg' },
    content: '是的，我已经看过了。那个报告确实很有洞察力，尤其是关于用户行为分析的部分。',
    time: '10:32',
    status: 'read',
    isCurrentUser: false,
  },
  {
    id: 8,
    sender: { id: 999, name: '我', avatar: '/avatars/me.jpg' },
    content: '我已经完成了项目的初步设计，准备开始开发阶段。有什么需要特别注意的地方吗？',
    time: '刚刚',
    status: 'sending',
    isCurrentUser: true,
  },
];

const MessageStatusIcon: React.FC<MessageStatusIconProps> = ({ status }) => {
  switch (status) {
    case 'sending':
      return <ScheduleIcon fontSize="small" sx={{ opacity: 0.7 }} />;
    case 'sent':
      return <CheckIcon fontSize="small" sx={{ opacity: 0.7 }} />;
    case 'read':
      return <DoneAllIcon fontSize="small" color="primary" sx={{ opacity: 0.9 }} />;
    default:
      return null;
  }
};

const MessagesPage: React.FC = () => {
  const theme = useTheme();
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleFilterOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      console.log('发送消息:', newMessage);
      setNewMessage('');
    }
  };

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <AppContainer>
      <MessageContainer>
        {/* 左侧消息列表 */}
        <SidebarContainer>
          {/* 搜索和操作栏 */}
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h6" fontWeight="medium">
              对话
            </Typography>
            <Box>
              <Tooltip title="筛选消息">
                <IconButton size="small" onClick={handleFilterOpen}>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={handleFilterClose}
              >
                <MenuItem>所有消息</MenuItem>
                <MenuItem>未读消息</MenuItem>
                <MenuItem>已读消息</MenuItem>
                <MenuItem>群组消息</MenuItem>
                <MenuItem>个人消息</MenuItem>
              </Menu>
              <Tooltip title="新建群组">
                <IconButton size="small" sx={{ ml: 1 }}>
                  <GroupAddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="新建对话">
                <IconButton size="small" sx={{ ml: 1 }}>
                  <PersonAddIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* 搜索框 */}
          <SearchField
            placeholder="搜索消息或联系人"
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

          {/* 会话列表 */}
          <MessageList>
            {conversations.map((conversation) => (
              <MessageListItem
                key={conversation.id}
                isSelected={selectedConversation === conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                divider
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    color="success"
                    variant="dot"
                    invisible={!conversation.online}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                  >
                    <Avatar
                      src={conversation.avatar}
                      alt={conversation.name}
                      sx={{ bgcolor: conversation.isGroup ? 'secondary.main' : 'primary.main' }}
                    >
                      {conversation.name.charAt(0)}
                    </Avatar>
                  </Badge>
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
                      <Typography variant="subtitle2" fontWeight="medium">
                        {conversation.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {conversation.time}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 0.5,
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          maxWidth: '200px',
                        }}
                      >
                        {conversation.lastMessage}
                      </Typography>
                      {conversation.unread > 0 && (
                        <Chip
                          label={conversation.unread}
                          color="primary"
                          size="small"
                          sx={{
                            height: 22,
                            minWidth: 22,
                            fontSize: '0.75rem',
                          }}
                        />
                      )}
                    </Box>
                  }
                />
              </MessageListItem>
            ))}
          </MessageList>
        </SidebarContainer>

        {/* 右侧聊天窗口 */}
        <ChatContainer>
          {/* 聊天头部 */}
          <ChatHeader>
            <Avatar
              src={conversations.find((c) => c.id === selectedConversation)?.avatar}
              sx={{ width: 40, height: 40, mr: 2 }}
            >
              {conversations.find((c) => c.id === selectedConversation)?.name.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="medium">
                {conversations.find((c) => c.id === selectedConversation)?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {conversations.find((c) => c.id === selectedConversation)?.online ? '在线' : '离线'}
              </Typography>
            </Box>
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
              <MenuItem>查看个人资料</MenuItem>
              <MenuItem>查看共享文件</MenuItem>
              <MenuItem>搜索聊天记录</MenuItem>
              <MenuItem>标记为已读</MenuItem>
              <MenuItem>举报或屏蔽</MenuItem>
            </Menu>
          </ChatHeader>

          {/* 聊天消息 */}
          <ChatMessages>
            {messages.map((message) => (
              <MessageGroup key={message.id} isCurrentUser={message.isCurrentUser}>
                {!message.isCurrentUser && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Avatar
                      src={message.sender.avatar}
                      alt={message.sender.name}
                      sx={{ width: 36, height: 36, fontSize: '1rem', mr: 1 }}
                    >
                      {message.sender.name.charAt(0)}
                    </Avatar>
                    <Typography variant="caption" color="text.secondary">
                      {message.sender.name}
                    </Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', alignItems: 'flex-end', maxWidth: '60%' }}>
                  <MessageBubble isCurrentUser={message.isCurrentUser}>
                    <Typography variant="body2">{message.content}</Typography>
                  </MessageBubble>
                  {message.isCurrentUser && (
                    <Box sx={{ ml: 0.5 }}>
                      <MessageStatusIcon status={message.status} />
                    </Box>
                  )}
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                  {message.time}
                </Typography>
              </MessageGroup>
            ))}
          </ChatMessages>

          {/* 消息输入框 */}
          <MessageInput>
            <Stack direction="row" spacing={1}>
              <IconButton size="small">
                <AttachFileIcon />
              </IconButton>
              <IconButton size="small">
                <EmojiEmotionsIcon />
              </IconButton>
            </Stack>
            <TextField
              variant="outlined"
              placeholder="输入消息..."
              fullWidth
              size="small"
              value={newMessage}
              onChange={handleMessageChange}
              onKeyPress={handleKeyPress}
              sx={{
                mx: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: theme.shape.borderRadius * 5,
                },
              }}
            />
            <Stack direction="row" spacing={1}>
              <IconButton size="small">
                <MicIcon />
              </IconButton>
              <IconButton
                size="small"
                color="primary"
                onClick={handleSendMessage}
                disabled={newMessage.trim() === ''}
              >
                <SendIcon />
              </IconButton>
            </Stack>
          </MessageInput>
        </ChatContainer>
      </MessageContainer>
    </AppContainer>
  );
};

export const Component = MessagesPage;
