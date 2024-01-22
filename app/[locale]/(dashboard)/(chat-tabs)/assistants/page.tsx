"use client"

import { ChatbotUIContext } from "@/context/context"
import { useContext } from "react"
import { ChatTabContent } from "@/components/sidebar/chat-tab-content"
import { ChatTabsStandalone } from "@/components/ChatTabs"

export default function ChatPage() {
  const { folders, assistants } = useContext(ChatbotUIContext)
  const assistantFolders = folders.filter(
    folder => folder.type === "assistants"
  )

  return (
    <>
      <ChatTabContent
        contentType="assistants"
        data={assistants}
        folders={assistantFolders}
      />
      <ChatTabsStandalone tab="assistants" />
    </>
  )
}
