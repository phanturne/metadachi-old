"use client"

import { MetadachiContext } from "@/app/lib/context"
import { useContext } from "react"
import { CollectionsWrapper } from "@/app/components/collections/CollectionsWrapper"

export default function PromptsCollection() {
  const { folders, prompts } = useContext(MetadachiContext)
  const promptFolders = folders.filter(folder => folder.type === "prompts")

  return (
    <CollectionsWrapper
      contentType="prompts"
      data={prompts}
      folders={promptFolders}
    />
  )
}
