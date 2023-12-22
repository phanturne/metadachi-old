'use client';
import React from 'react';
import { Send } from '@mui/icons-material';
import { ChatInput, EmptyChatConfig } from '@/components/Chat';
import IconButton from '@mui/joy/IconButton';

export default function HomePage() {
  return (
    <>
      {/*TODO: Replace with HomePageComponent*/}
      <EmptyChatConfig />

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
