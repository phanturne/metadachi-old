"use client"

import { MetadachiContext } from "@/app/lib/context"
import { useContext } from "react"
import { DataListWrapper } from "@/app/components/ui/data-list/DataListWrapper"

export default function FilesList() {
  const { folders, files } = useContext(MetadachiContext)
  const fileFolders = folders.filter(folder => folder.type === "files")

  return (
    <DataListWrapper contentType="files" data={files} folders={fileFolders} />
  )
}
