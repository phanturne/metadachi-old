"use client"

import { ChatbotUIContext } from "@/context/context"
import { useContext } from "react"
import { ChatTabContent } from "@/components/chat-tab/ChatTabContent"

export default function ToolsTabContent() {
  const { folders, tools } = useContext(ChatbotUIContext)
  const toolFolders = folders.filter(folder => folder.type === "tools")

  return (
    <ChatTabContent contentType="tools" data={tools} folders={toolFolders} />
  )
}
