"use client"
import * as React from "react"
import { useContext } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { DataList } from "@/app/components/data-list/DataList"
import { Card, CardBody, CardHeader } from "@nextui-org/react"

export default function ChatListCard() {
  const { folders, chats } = useContext(MetadachiContext)
  const chatFolders = folders.filter(folder => folder.type === "chats")

  return (
    <Card className="grow">
      <CardHeader>
        <h4 className="text-small font-semibold leading-none text-default-600">
          Chats
        </h4>
      </CardHeader>
      <CardBody className="pt-1">
        <DataList
          contentType="chats"
          data={chats}
          folders={chatFolders}
          variant="list"
        />
      </CardBody>
    </Card>
  )
}
