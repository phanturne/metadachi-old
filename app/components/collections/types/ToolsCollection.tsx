"use client"

import { MetadachiContext } from "@/app/lib/context"
import { useContext } from "react"
import { CollectionsWrapper } from "@/app/components/collections/CollectionsWrapper"

export default function ToolsCollection() {
  const { folders, tools } = useContext(MetadachiContext)
  const toolFolders = folders.filter(folder => folder.type === "tools")

  return (
    <CollectionsWrapper
      contentType="tools"
      data={tools}
      folders={toolFolders}
    />
  )
}
