import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import React from 'react';

import MessageStatusIcon from './MessageStatusIcon';
import { Message, MessageGroupProps } from './types';

interface MessageBubbleProps {
  message: Message;
}

const StyledMessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isCurrentUser',
})<{
  isCurrentUser: boolean;
}>(({ theme, isCurrentUser }) => ({
  padding: theme.spacing(1.5, 2),
  borderRadius: isCurrentUser ? theme.spacing(2, 0, 2, 2) : theme.spacing(0, 2, 2, 2),
  backgroundColor: isCurrentUser
    ? alpha(theme.palette.primary.dark, 0.9)
    : alpha(theme.palette.background.paper, 0.9),
  color: isCurrentUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
  marginBottom: theme.spacing(1),
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

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
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
        <StyledMessageBubble isCurrentUser={message.isCurrentUser}>
          <Typography variant="body2">{message.content}</Typography>
        </StyledMessageBubble>
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
  );
};

export default MessageBubble;
