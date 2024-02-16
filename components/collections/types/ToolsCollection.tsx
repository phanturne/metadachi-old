"use client"

import { ChatbotUIContext } from "@/context/context"
import { useContext } from "react"
import { CollectionsWrapper } from "@/components/collections/CollectionsWrapper"

export default function ToolsCollection() {
  const { folders, tools } = useContext(ChatbotUIContext)
  const toolFolders = folders.filter(folder => folder.type === "tools")

  return (
    <CollectionsWrapper
      contentType="tools"
      data={tools}
      folders={toolFolders}
    />
  )
}
