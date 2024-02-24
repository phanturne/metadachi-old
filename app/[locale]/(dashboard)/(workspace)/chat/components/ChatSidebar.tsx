"use client"
import * as React from "react"
import { useContext } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { DataListWrapper } from "@/app/components/data-list/shared/DataListWrapper"
import { Typography } from "@mui/joy"
import Sheet from "@mui/joy/Sheet"

export default function ChatSidebar() {
  const { folders, chats } = useContext(MetadachiContext)
  const chatFolders = folders.filter(folder => folder.type === "chats")

  return (
    <Sheet
      sx={{
        height: "100%",
        p: 2,
        borderRight: "1px solid",
        borderColor: "divider"
      }}
    >
      <Typography level="h4">Chats</Typography>
      <DataListWrapper
        contentType="chats"
        data={chats}
        folders={chatFolders}
        variant="list"
      />
    </Sheet>
  )
}
