"use client";
import React from "react";
import { ChatInput, EmptyChatConfig } from "@/components/Chat";

export default function HomePage() {
  return (
    <>
      {/*TODO: Replace with HomePageComponent*/}
      <EmptyChatConfig />

      <ChatInput needToCreateChat={true} />
    </>
  );
}
