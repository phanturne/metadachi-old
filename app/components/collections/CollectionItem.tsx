import {
  COLLECTION_DESCRIPTION_MAX,
  COLLECTION_NAME_MAX
} from "@/app/lib/db/limits"
import { Tables } from "@/supabase/types"
import { CollectionFile } from "@/app/lib/types"
import React, { FC, useState } from "react"
import { CollectionFileSelect } from "./CollectionFileSelect"
import { DataListItem } from "@/app/components/ui/data-list/DataListItem"
import { LibraryBooksRounded } from "@mui/icons-material"
import { DATA_LIST_ITEM_ICON_STYLE } from "@/app/lib/constants"
import { Input, Textarea } from "@nextui-org/react"

interface CollectionItemProps {
  collection: Tables<"collections">
}

export const CollectionItem: FC<CollectionItemProps> = ({ collection }) => {
  const [name, setName] = useState(collection.name)
  const [isTyping, setIsTyping] = useState(false)
  const [description, setDescription] = useState(collection.description)

  const handleFileSelect = (
    file: CollectionFile,
    setSelectedCollectionFiles: React.Dispatch<
      React.SetStateAction<CollectionFile[]>
    >
  ) => {
    setSelectedCollectionFiles(prevState => {
      const isFileAlreadySelected = prevState.find(
        selectedFile => selectedFile.id === file.id
      )

      if (isFileAlreadySelected) {
        return prevState.filter(selectedFile => selectedFile.id !== file.id)
      } else {
        return [...prevState, file]
      }
    })
  }

  return (
    <DataListItem
      item={collection}
      isTyping={isTyping}
      contentType="collections"
      icon={<LibraryBooksRounded style={DATA_LIST_ITEM_ICON_STYLE} />}
      updateState={{
        name,
        description
      }}
      renderInputs={(renderState: {
        startingCollectionFiles: CollectionFile[]
        setStartingCollectionFiles: React.Dispatch<
          React.SetStateAction<CollectionFile[]>
        >
        selectedCollectionFiles: CollectionFile[]
        setSelectedCollectionFiles: React.Dispatch<
          React.SetStateAction<CollectionFile[]>
        >
      }) => {
        return (
          <>
            <CollectionFileSelect
              selectedCollectionFiles={
                renderState.selectedCollectionFiles.length === 0
                  ? renderState.startingCollectionFiles
                  : [
                      ...renderState.startingCollectionFiles.filter(
                        startingFile =>
                          !renderState.selectedCollectionFiles.some(
                            selectedFile => selectedFile.id === startingFile.id
                          )
                      ),
                      ...renderState.selectedCollectionFiles.filter(
                        selectedFile =>
                          !renderState.startingCollectionFiles.some(
                            startingFile => startingFile.id === selectedFile.id
                          )
                      )
                    ]
              }
              setSelectedCollectionFiles={
                renderState.setSelectedCollectionFiles
              }
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
        )
      }}
    />
  )
}
