"use client"

import { MetadachiContext } from "@/app/lib/context"
import { useContext } from "react"
import { CollectionsWrapper } from "@/app/components/collections/CollectionsWrapper"

export default function AssistantsCollection() {
  const { folders, assistants } = useContext(MetadachiContext)
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
