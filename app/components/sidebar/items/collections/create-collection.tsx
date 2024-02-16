import { CreateItemModal } from "@/app/components/sidebar/items/all/CreateItemModal"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { MetadachiContext } from "@/app/lib/context"
import { COLLECTION_NAME_MAX } from "@/app/lib/db/limits"
import { TablesInsert } from "@/supabase/types"
import { CollectionFile } from "@/app/lib/types"
import { FC, useContext, useState } from "react"
import { CollectionFileSelect } from "./collection-file-select"

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

  const handleFileSelect = (file: CollectionFile) => {
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
          <div className="space-y-1">
            <Label>Files</Label>

            <CollectionFileSelect
              selectedCollectionFiles={selectedCollectionFiles}
              onCollectionFileSelect={handleFileSelect}
            />
          </div>

          <div className="space-y-1">
            <Label>Name</Label>

            <Input
              placeholder="Collection name..."
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={COLLECTION_NAME_MAX}
            />
          </div>
        </>
      )}
    />
  )
}
