"use client";
import { ChatInput, ChatMessages, EmptyChatConfig } from "@/components/Chat";
import React from "react";
import { useChatStore } from "@/stores";
import Header from "@/components/Header";
import { ChatListDropdown } from "@/components/ChatList";

export default function ChatPage() {
  const chatStore = useChatStore();
  const currentChat = chatStore.currentSession();

  const session = chatStore.currentSession();
  const messages = session.messages;

  return (
    <>
      <Header
        startContent={<ChatListDropdown />}
        middleContent={currentChat.topic}
      />
      {messages.length === 0 && <EmptyChatConfig />}
      {messages.length > 0 && <ChatMessages messages={messages} />}
      <ChatInput />
    </>
  );
}
