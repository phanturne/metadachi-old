"use client"

import { MetadachiContext } from "@/app/lib/context"
import { useContext } from "react"
import { DataListWrapper } from "@/app/components/data-list/shared/DataListWrapper"

export default function PromptsList() {
  const { folders, prompts } = useContext(MetadachiContext)
  const promptFolders = folders.filter(folder => folder.type === "prompts")

  return (
    <DataListWrapper
      contentType="prompts"
      data={prompts}
      folders={promptFolders}
    />
  )
}
