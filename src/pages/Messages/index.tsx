import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';
import * as React from 'react';

import ChatBody from './components/ChatBody';
import ChatInput from './components/ChatInput';
import ChatSidebar from './components/ChatSidebar';
import { conversations, messages } from './components/mockData';
import type { Message } from './components/types';

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

function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = React.useState(1);
  const [messageList, setMessageList] = React.useState(messages);

  const handleSendMessage = (newMessage: string) => {
    if (newMessage.trim() !== '') {
      const newMessageObject: Message = {
        id: messageList.length + 1,
        sender: { id: 999, name: '我', avatar: '/avatars/me.jpg' },
        content: newMessage,
        time: '刚刚',
        status: 'sending',
        isCurrentUser: true,
      };

      setMessageList([...messageList, newMessageObject]);

      // 模拟消息发送状态更新
      setTimeout(() => {
        setMessageList((previous) =>
          previous.map((message) =>
            message.id === newMessageObject.id ? { ...message, status: 'sent' as const } : message,
          ),
        );
      }, 1000);
    }
  };

  return (
    <AppContainer>
      <MessageContainer>
        {/* 左侧消息列表 */}
        <ChatSidebar
          conversations={conversations}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
        />

        {/* 右侧聊天区域 */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
          <ChatBody
            selectedConversation={selectedConversation}
            conversations={conversations}
            messages={messageList}
          />
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </MessageContainer>
    </AppContainer>
  );
}

export const Component = MessagesPage;
