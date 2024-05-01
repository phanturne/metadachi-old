import React, { useContext } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { getCollectionFilesByCollectionId } from "@/app/lib/db/collection-files"
import { AssistantRetrievalSelect } from "@/app/components/assistants/AssistantRetrievalSelect"
import { Tables } from "@/supabase/types"

export default function FileSelect({
  size,
  label,
  labelPlacement
}: {
  size?: "sm" | "md" | "lg"
  label?: string
  labelPlacement?: "outside" | "inside"
}) {
  const {
    files,
    collections,
    newMessageFiles,
    setNewMessageFiles,
    chatFiles,
    hashtagCommand
  } = useContext(MetadachiContext)

  // TODO: Add logic for collections
  const selectedCollectionIds: string[] = []
  const selectedFileIds = [...newMessageFiles, ...chatFiles].map(
    file => file.id
  )

  const selectedFiles = files.filter(
    file =>
      file.name.toLowerCase().includes(hashtagCommand.toLowerCase()) &&
      selectedFileIds.includes(file.id)
  )

  const selectedCollections = collections.filter(
    collection =>
      collection.name.toLowerCase().includes(hashtagCommand.toLowerCase()) &&
      selectedCollectionIds.includes(collection.id)
  )

  const selectedItems = [...selectedFiles, ...selectedCollections]

  // TODO: Refactor duplicate logic
  const handleFilesAndCollectionSelect = async (
    items: (Tables<"files"> | Tables<"collections">)[]
  ) => {
    let newFiles = []

    for (const item of items) {
      if ("type" in item) {
        const file = item as Tables<"files">
        newFiles.push({
          id: file.id,
          name: file.name,
          type: file.type,
          file: null
        })
      } else {
        const collection = item as Tables<"collections">
        const collectionFiles = await getCollectionFilesByCollectionId(
          collection.id
        )

        const collectionNewFiles = collectionFiles.files
          .filter(
            file =>
              !newMessageFiles.some(prevFile => prevFile.id === file.id) &&
              !chatFiles.some(chatFile => chatFile.id === file.id)
          )
          .map(file => ({
            id: file.id,
            name: file.name,
            type: file.type,
            file: null
          }))

        newFiles.push(...collectionNewFiles)
      }
    }

    setNewMessageFiles(newFiles)
  }

  return (
    <AssistantRetrievalSelect
      size={size}
      label={label}
      labelPlacement={labelPlacement}
      selectedAssistantRetrievalItems={selectedItems}
      setSelectedAssistantRetrievalItems={handleFilesAndCollectionSelect}
    />
  )
}
