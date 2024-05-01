"use client"

import { MetadachiContext } from "@/app/lib/context"
import { useContext } from "react"
import { DataListWrapper } from "@/app/components/ui/data-list/DataListWrapper"

export default function ToolsList() {
  const { folders, tools } = useContext(MetadachiContext)
  const toolFolders = folders.filter(folder => folder.type === "tools")

  return (
    <DataListWrapper contentType="tools" data={tools} folders={toolFolders} />
  )
}
