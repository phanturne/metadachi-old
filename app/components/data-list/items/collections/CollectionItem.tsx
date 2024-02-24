import {
  COLLECTION_DESCRIPTION_MAX,
  COLLECTION_NAME_MAX
} from "@/app/lib/db/limits"
import { Tables } from "@/supabase/types"
import { CollectionFile } from "@/app/lib/types"
import { FC, useState } from "react"
import { CollectionFileSelect } from "./CollectionFileSelect"
import { DataListItem } from "@/app/components/data-list/shared/DataListItem"
import { LibraryBooksRounded } from "@mui/icons-material"
import { DATA_LIST_ITEM_ICON_STYLE } from "@/app/lib/constants"
import { FormControl, FormLabel, Input } from "@mui/joy"

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
            <FormControl>
              <FormLabel>Files</FormLabel>

              <CollectionFileSelect
                selectedCollectionFiles={
                  renderState.selectedCollectionFiles.length === 0
                    ? renderState.startingCollectionFiles
                    : [
                        ...renderState.startingCollectionFiles.filter(
                          startingFile =>
                            !renderState.selectedCollectionFiles.some(
                              selectedFile =>
                                selectedFile.id === startingFile.id
                            )
                        ),
                        ...renderState.selectedCollectionFiles.filter(
                          selectedFile =>
                            !renderState.startingCollectionFiles.some(
                              startingFile =>
                                startingFile.id === selectedFile.id
                            )
                        )
                      ]
                }
                setSelectedCollectionFiles={
                  renderState.setSelectedCollectionFiles
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Name</FormLabel>

              <Input
                placeholder="Collection name..."
                value={name}
                onChange={e => setName(e.target.value)}
                slotProps={{ input: { maxLength: COLLECTION_NAME_MAX } }}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>

              <Input
                placeholder="Collection description..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                slotProps={{ input: { maxLength: COLLECTION_DESCRIPTION_MAX } }}
              />
            </FormControl>
          </>
        )
      }}
    />
  )
}
