"use client"

import { ChatbotUIContext } from "@/context/context"
import { useContext } from "react"
import { ChatTabContent } from "@/components/sidebar/chat-tab-content"
import { ChatTabsStandalone } from "@/components/ChatTabs"
import Header from "@/components/Header"

export default function ChatPage() {
  const { folders, prompts } = useContext(ChatbotUIContext)
  const promptFolders = folders.filter(folder => folder.type === "prompts")

  return (
    <>
      <Header />
      <ChatTabContent
        contentType="prompts"
        data={prompts}
        folders={promptFolders}
      />
      <ChatTabsStandalone tab="prompts" />
    </>
  )
}
