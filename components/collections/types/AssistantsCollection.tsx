"use client"

import { ChatbotUIContext } from "@/context/context"
import { useContext } from "react"
import { CollectionsWrapper } from "@/components/collections/CollectionsWrapper"

export default function AssistantsCollection() {
  const { folders, assistants } = useContext(ChatbotUIContext)
  const assistantFolders = folders.filter(
    folder => folder.type === "assistants"
  )

  return (
    <CollectionsWrapper
      contentType="assistants"
      data={assistants}
      folders={assistantFolders}
    />
  )
}
