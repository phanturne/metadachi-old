"use client"

import { ChatbotUIContext } from "@/context/context"
import { useContext } from "react"
import { ChatTabContent } from "@/components/chat-tab/ChatTabContent"

export default function FilesTab() {
  const { folders, files } = useContext(ChatbotUIContext)
  const fileFolders = folders.filter(folder => folder.type === "files")

  return (
    <ChatTabContent contentType="files" data={files} folders={fileFolders} />
  )
}
