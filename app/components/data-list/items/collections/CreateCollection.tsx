import { CreateItemModal } from "@/app/components/data-list/shared/CreateItemModal"
import { MetadachiContext } from "@/app/lib/context"
import { COLLECTION_NAME_MAX } from "@/app/lib/db/limits"
import { TablesInsert } from "@/supabase/types"
import { CollectionFile } from "@/app/lib/types"
import { FC, useContext, useState } from "react"
import { CollectionFileSelect } from "./CollectionFileSelect"
import { FormControl, FormLabel, Input } from "@mui/joy"

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
          <FormControl>
            <FormLabel>Files</FormLabel>

            <CollectionFileSelect
              selectedCollectionFiles={selectedCollectionFiles}
              setSelectedCollectionFiles={setSelectedCollectionFiles}
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
        </>
      )}
    />
  )
}
