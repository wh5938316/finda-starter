import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import type { ChangeEvent, KeyboardEvent } from 'react';
import type * as React from 'react';
import { useState } from 'react';

interface ChatInputProperties {
  onSendMessage: (message: string) => void;
}

const MessageInput = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
}));

const ChatInput: React.FC<ChatInputProperties> = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
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
            borderRadius: (theme) => theme.shape.borderRadius * 5,
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
  );
};

export default ChatInput;
