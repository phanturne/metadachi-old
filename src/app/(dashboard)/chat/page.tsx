"use client";
import {
  ChatHistoryDropdown,
  ChatInput,
  ChatMessages,
  EmptyChatConfig,
} from "@/components/Chat";
import React from "react";
import { useChatStore } from "@/stores";
import Header from "@/components/Header";

export default function ChatPage() {
  const chatStore = useChatStore();
  const currentChat = chatStore.currentSession();

  const session = chatStore.currentSession();
  const messages = session.messages;

  return (
    <>
      <Header
        startContent={<ChatHistoryDropdown />}
        middleContent={currentChat.topic}
      />
      {messages.length === 0 && <EmptyChatConfig />}
      {messages.length > 0 && <ChatMessages messages={messages} />}
      <ChatInput />
    </>
  );
}
