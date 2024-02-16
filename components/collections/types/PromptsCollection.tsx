"use client"

import { ChatbotUIContext } from "@/context/context"
import { useContext } from "react"
import { CollectionsWrapper } from "@/components/collections/CollectionsWrapper"

export default function PromptsCollection() {
  const { folders, prompts } = useContext(ChatbotUIContext)
  const promptFolders = folders.filter(folder => folder.type === "prompts")

  return (
    <CollectionsWrapper
      contentType="prompts"
      data={prompts}
      folders={promptFolders}
    />
  )
}
