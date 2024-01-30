"use client"

import { ChatbotUIContext } from "@/context/context"
import { useContext } from "react"
import { ChatTabContent } from "@/components/chat-tab/ChatTabContent"

export default function PromptsTabContent() {
  const { folders, prompts } = useContext(ChatbotUIContext)
  const promptFolders = folders.filter(folder => folder.type === "prompts")

  return (
    <ChatTabContent
      contentType="prompts"
      data={prompts}
      folders={promptFolders}
    />
  )
}
