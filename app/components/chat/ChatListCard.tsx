"use client"
import * as React from "react"
import { useContext } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { DataListWrapper } from "@/app/components/data-list/shared/DataListWrapper"
import { Typography } from "@mui/joy"
import Sheet from "@mui/joy/Sheet"
import { DataList } from "@/app/components/data-list/DataList"
import { Card, CardHeader } from "@nextui-org/react"

export default function ChatListCard() {
  const { folders, chats } = useContext(MetadachiContext)
  const chatFolders = folders.filter(folder => folder.type === "chats")

  return (
    <Card>
      <CardHeader>
        <h4 className="text-small font-semibold leading-none text-default-600">
          Chats
        </h4>
      </CardHeader>
      <DataList
        contentType="chats"
        data={chats}
        folders={chatFolders}
        variant="list"
      />
    </Card>
  )
}
