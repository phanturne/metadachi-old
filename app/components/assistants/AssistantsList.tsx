"use client"

import { MetadachiContext } from "@/app/lib/context"
import { useContext } from "react"
import { DataListWrapper } from "@/app/components/ui/data-list/DataListWrapper"

export default function AssistantsList() {
  const { folders, assistants } = useContext(MetadachiContext)
  const assistantFolders = folders.filter(
    folder => folder.type === "assistants"
  )

  return (
    <DataListWrapper
      contentType="assistants"
      data={assistants}
      folders={assistantFolders}
    />
  )
}
