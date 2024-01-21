"use client"

import { ChatbotUIContext } from "@/context/context"
import { useContext } from "react"
import { SidebarContent } from "@/components/sidebar/sidebar-content"
import { ChatTabsStandalone } from "@/components/ChatTabs"

export default function ChatPage() {
  const { folders, prompts } = useContext(ChatbotUIContext)
  const promptFolders = folders.filter(folder => folder.type === "prompts")

  return (
    <>
      <SidebarContent
        contentType="prompts"
        data={prompts}
        folders={promptFolders}
      />
      <ChatTabsStandalone tab="prompts" />
    </>
  )
}
