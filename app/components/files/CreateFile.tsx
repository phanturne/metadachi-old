import { ACCEPTED_FILE_TYPES } from "@/app/lib/hooks/use-select-file-handler"
import { CreateItemModal } from "@/app/components/ui/data-list/CreateItemModal"
import { MetadachiContext } from "@/app/lib/context"
import {
  ASSISTANT_DESCRIPTION_MAX,
  ASSISTANT_NAME_MAX,
  FILE_DESCRIPTION_MAX,
  FILE_NAME_MAX
} from "@/app/lib/db/limits"
import { TablesInsert } from "@/supabase/types"
import React, { FC, useContext, useState } from "react"
import FileInput from "@/app/components/input/FileInput"
import { Input, Textarea } from "@nextui-org/react"

interface CreateFileProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const CreateFile: FC<CreateFileProps> = ({ isOpen, onOpenChange }) => {
  const { profile, selectedWorkspace } = useContext(MetadachiContext)

  const [name, setName] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [description, setDescription] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleSelectedFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const file = e.target.files[0]

    if (!file) return

    setSelectedFile(file)
    const fileNameWithoutExtension = file.name.split(".").slice(0, -1).join(".")
    setName(fileNameWithoutExtension)
  }

  if (!profile) return null
  if (!selectedWorkspace) return null

  return (
    <CreateItemModal
      contentType="files"
      createState={
        {
          file: selectedFile,
          user_id: profile.user_id,
          name,
          description,
          file_path: "",
          size: selectedFile?.size || 0,
          tokens: 0,
          type: selectedFile?.type || 0
        } as TablesInsert<"files">
      }
      isOpen={isOpen}
      isTyping={isTyping}
      onOpenChange={onOpenChange}
      renderInputs={() => (
        <>
          <FileInput
            handleSelectedFile={handleSelectedFile}
            required={true}
            accept={ACCEPTED_FILE_TYPES}
          />

          <Input
            isRequired
            label="Name"
            labelPlacement="outside"
            placeholder="File name..."
            value={name}
            onValueChange={setName}
            maxLength={FILE_NAME_MAX}
            description={`${name.length}/${FILE_NAME_MAX}`}
          />

          <Textarea
            label="Description"
            labelPlacement="outside"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="File Description..."
            minRows={1}
            maxRows={3}
            maxLength={FILE_DESCRIPTION_MAX}
            description={`${description.length}/${FILE_DESCRIPTION_MAX}`}
          />
        </>
      )}
    />
  )
}
