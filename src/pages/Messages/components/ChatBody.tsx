import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import * as React from 'react';

import MessageBubble from './MessageBubble';
import type { Conversation, Message } from './types';

interface ChatBodyProps {
  selectedConversation: number;
  conversations: Conversation[];
  messages: Message[];
}

const ChatContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
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

const ChatBody = ({ selectedConversation, conversations, messages }: ChatBodyProps) => {
  const menuPopupState = usePopupState({ variant: 'popover', popupId: 'chat-menu-popup' });
  const selectedConversationData = conversations.find((c) => c.id === selectedConversation);

  return (
    <ChatContainer>
      {/* 聊天头部 */}
      <ChatHeader>
        <Avatar src={selectedConversationData?.avatar} sx={{ width: 40, height: 40, mr: 2 }}>
          {selectedConversationData?.name.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight="medium">
            {selectedConversationData?.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {selectedConversationData?.online ? '在线' : '离线'}
          </Typography>
        </Box>
        <IconButton size="small" {...bindTrigger(menuPopupState)}>
          <MoreVertIcon />
        </IconButton>
        <Menu {...bindMenu(menuPopupState)}>
          <MenuItem onClick={menuPopupState.close}>查看个人资料</MenuItem>
          <MenuItem onClick={menuPopupState.close}>查看共享文件</MenuItem>
          <MenuItem onClick={menuPopupState.close}>搜索聊天记录</MenuItem>
          <MenuItem onClick={menuPopupState.close}>标记为已读</MenuItem>
          <MenuItem onClick={menuPopupState.close}>举报或屏蔽</MenuItem>
        </Menu>
      </ChatHeader>

      {/* 聊天消息 */}
      <ChatMessages>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </ChatMessages>
    </ChatContainer>
  );
};

export default ChatBody;
