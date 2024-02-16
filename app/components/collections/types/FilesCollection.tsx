"use client"

import { MetadachiContext } from "@/app/lib/context"
import { useContext } from "react"
import { CollectionsWrapper } from "@/app/components/collections/CollectionsWrapper"

export default function FilesCollection() {
  const { folders, files } = useContext(MetadachiContext)
  const fileFolders = folders.filter(folder => folder.type === "files")

  return (
    <CollectionsWrapper
      contentType="files"
      data={files}
      folders={fileFolders}
    />
  )
}
