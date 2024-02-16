"use client"

import { ChatbotUIContext } from "@/context/context"
import { useContext } from "react"
import { CollectionsWrapper } from "@/components/collections/CollectionsWrapper"

export default function FilesCollection() {
  const { folders, files } = useContext(ChatbotUIContext)
  const fileFolders = folders.filter(folder => folder.type === "files")

  return (
    <CollectionsWrapper
      contentType="files"
      data={files}
      folders={fileFolders}
    />
  )
}
