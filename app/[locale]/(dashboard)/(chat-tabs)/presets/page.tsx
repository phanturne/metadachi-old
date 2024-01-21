"use client"

import { ChatbotUIContext } from "@/context/context"
import { useContext } from "react"
import { SidebarContent } from "@/components/sidebar/sidebar-content"
import { ChatTabsStandalone } from "@/components/ChatTabs"

export default function ChatPage() {
  const { folders, presets } = useContext(ChatbotUIContext)
  const presetFolders = folders.filter(folder => folder.type === "presets")

  return (
    <>
      <SidebarContent
        contentType="presets"
        data={presets}
        folders={presetFolders}
      />
      <ChatTabsStandalone tab="presets" />
    </>
  )
}
