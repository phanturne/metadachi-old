"use client"

import { ChatbotUIContext } from "@/context/context"
import { useContext } from "react"
import { ChatTabContent } from "@/components/sidebar/chat-tab-content"

export default function AssistantsTabContent() {
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
