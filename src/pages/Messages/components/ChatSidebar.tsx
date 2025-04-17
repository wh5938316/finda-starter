import FilterListIcon from '@mui/icons-material/FilterList';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import * as React from 'react';

import type { Conversation, StyledListItemProps } from './types';

interface ChatSidebarProps {
  conversations: Conversation[];
  selectedConversation: number;
  setSelectedConversation: (id: number) => void;
}

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 360,
  borderRight: `1px solid ${theme.palette.divider}`,
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

const ChatSidebar = ({
  conversations,
  selectedConversation,
  setSelectedConversation,
}: ChatSidebarProps) => {
  const filterPopupState = usePopupState({ variant: 'popover', popupId: 'filter-popup' });

  return (
    <SidebarContainer>
      {/* 搜索和操作栏 */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h6" fontWeight="medium">
          对话
        </Typography>
        <Box>
          <Tooltip title="筛选消息">
            <IconButton size="small" {...bindTrigger(filterPopupState)}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Menu {...bindMenu(filterPopupState)}>
            <MenuItem onClick={filterPopupState.close}>所有消息</MenuItem>
            <MenuItem onClick={filterPopupState.close}>未读消息</MenuItem>
            <MenuItem onClick={filterPopupState.close}>已读消息</MenuItem>
            <MenuItem onClick={filterPopupState.close}>群组消息</MenuItem>
            <MenuItem onClick={filterPopupState.close}>个人消息</MenuItem>
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
  );
};

export default ChatSidebar;
