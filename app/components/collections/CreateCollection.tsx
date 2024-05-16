// Source: https://github.com/mckaywrigley/chatbot-ui/blob/main/components/sidebar/items/collections/create-collection.tsx

import { CreateItemModal } from "@/app/components/ui/data-list/CreateItemModal"
import { MetadachiContext } from "@/app/lib/context"
import {
  COLLECTION_DESCRIPTION_MAX,
  COLLECTION_NAME_MAX
} from "@/app/lib/db/limits"
import { TablesInsert } from "@/supabase/types"
import { CollectionFile } from "@/app/lib/types"
import React, { FC, useContext, useState } from "react"
import { CollectionFileSelect } from "./CollectionFileSelect"
import { Input, Textarea } from "@nextui-org/react"

interface CreateCollectionProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const CreateCollection: FC<CreateCollectionProps> = ({
  isOpen,
  onOpenChange
}) => {
  const { profile, selectedWorkspace } = useContext(MetadachiContext)

  const [name, setName] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [description, setDescription] = useState("")
  const [selectedCollectionFiles, setSelectedCollectionFiles] = useState<
    CollectionFile[]
  >([])

  if (!profile) return null
  if (!selectedWorkspace) return null

  return (
    <CreateItemModal
      contentType="collections"
      createState={
        {
          collectionFiles: selectedCollectionFiles.map(file => ({
            user_id: profile.user_id,
            collection_id: "",
            file_id: file.id
          })),
          user_id: profile.user_id,
          name,
          description
        } as TablesInsert<"collections">
      }
      isOpen={isOpen}
      isTyping={isTyping}
      onOpenChange={onOpenChange}
      renderInputs={() => (
        <>
          <CollectionFileSelect
            selectedCollectionFiles={selectedCollectionFiles}
            setSelectedCollectionFiles={setSelectedCollectionFiles}
          />

          <Input
            isRequired
            label="Name"
            labelPlacement="outside"
            placeholder="Collection name..."
            value={name}
            onValueChange={setName}
            maxLength={COLLECTION_NAME_MAX}
            description={`${name.length}/${COLLECTION_NAME_MAX}`}
          />

          <Textarea
            label="Description"
            labelPlacement="outside"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Collection Description..."
            minRows={1}
            maxRows={3}
            maxLength={COLLECTION_DESCRIPTION_MAX}
            description={`${description.length}/${COLLECTION_DESCRIPTION_MAX}`}
          />
        </>
      )}
    />
  )
}
