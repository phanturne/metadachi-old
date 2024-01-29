"use client"

import { ChatbotUIContext } from "@/context/context"
import { useContext } from "react"
import { ChatTabContent } from "@/components/sidebar/chat-tab-content"

export default function ToolsTabContent() {
  const { folders, tools } = useContext(ChatbotUIContext)
  const toolFolders = folders.filter(folder => folder.type === "tools")

  return (
    <ChatTabContent contentType="tools" data={tools} folders={toolFolders} />
  )
}
