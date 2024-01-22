"use client"

import { ChatbotUIContext } from "@/context/context"
import { useContext } from "react"
import { ChatTabContent } from "@/components/sidebar/chat-tab-content"
import { ChatTabsStandalone } from "@/components/ChatTabs"

export default function ChatPage() {
  const { folders, tools } = useContext(ChatbotUIContext)
  const toolFolders = folders.filter(folder => folder.type === "tools")

  return (
    <>
      <ChatTabContent contentType="tools" data={tools} folders={toolFolders} />
      <ChatTabsStandalone tab="tools" />
    </>
  )
}
