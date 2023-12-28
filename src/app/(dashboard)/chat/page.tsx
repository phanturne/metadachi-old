"use client";
import { ChatInput, ChatMessages, EmptyChatConfig } from "@/components/Chat";
import React from "react";
import { useChatStore } from "@/stores";

export default function ChatPage() {
  const chatStore = useChatStore();

  const session = chatStore.currentSession();
  const messages = session.messages;

  return (
    <>
      {messages.length === 0 && <EmptyChatConfig />}
      {messages.length > 0 && <ChatMessages messages={messages} />}
      <ChatInput />
    </>
  );
}
