"use client"
import * as React from "react"
import { useContext } from "react"
import { ChatbotUIContext } from "@/context/context"
import { ChatTabContent } from "@/components/chat-tab/ChatTabContent"
import { Typography } from "@mui/joy"
import Sheet from "@mui/joy/Sheet"

export default function ChatSidebar() {
  const { folders, chats } = useContext(ChatbotUIContext)
  const chatFolders = folders.filter(folder => folder.type === "chats")

  return (
    <Sheet sx={{ p: 2, pt: 1.5 }}>
      <Typography level="h4">Chats</Typography>
      <ChatTabContent
        contentType="chats"
        data={chats}
        folders={chatFolders}
        variant="list"
      />
    </Sheet>
  )
}
