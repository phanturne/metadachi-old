"use client"

import { ChatbotUIContext } from "@/context/context"
import { useContext } from "react"
import { ChatTabContent } from "@/components/chat-tab/ChatTabContent"

export default function AssistantsTab() {
  const { folders, assistants } = useContext(ChatbotUIContext)
  const assistantFolders = folders.filter(
    folder => folder.type === "assistants"
  )

  return (
    <ChatTabContent
      contentType="assistants"
      data={assistants}
      folders={assistantFolders}
    />
  )
}
