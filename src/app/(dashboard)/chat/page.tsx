'use client';
import { ChatInput, ChatMessages, EmptyChatConfig } from '@/components/Chat';
import IconButton from '@mui/joy/IconButton';
import { Send } from '@mui/icons-material';
import React from 'react';
import { useChatStore } from '@/stores';

export default function ChatPage() {
  const chatStore = useChatStore();

  const session = chatStore.currentSession();
  const messages = session.messages;

  return (
    <>
      {messages.length === 0 && <EmptyChatConfig />}
      {messages.length > 0 && <ChatMessages messages={messages} />}
      <ChatInput
        end={
          <IconButton sx={{ mt: -1 }}>
            <Send />
          </IconButton>
        }
      />
    </>
  );
}
