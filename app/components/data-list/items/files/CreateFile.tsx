import { ACCEPTED_FILE_TYPES } from "@/app/lib/hooks/use-select-file-handler"
import { CreateItemModal } from "@/app/components/data-list/shared/CreateItemModal"
import { MetadachiContext } from "@/app/lib/context"
import { FILE_DESCRIPTION_MAX, FILE_NAME_MAX } from "@/app/lib/db/limits"
import { TablesInsert } from "@/supabase/types"
import { FC, useContext, useState } from "react"
import { FormControl, FormLabel, Input } from "@mui/joy"
import FileInput from "@/app/components/input/FileInput"

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
          <FormControl>
            <FormLabel>File</FormLabel>
            <FileInput
              handleSelectedFile={handleSelectedFile}
              required={true}
              accept={ACCEPTED_FILE_TYPES}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Name</FormLabel>

            <Input
              required
              placeholder="File name..."
              value={name}
              onChange={e => setName(e.target.value)}
              slotProps={{ input: { maxLength: FILE_NAME_MAX } }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>

            <Input
              placeholder="File description..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              slotProps={{ input: { maxLength: FILE_DESCRIPTION_MAX } }}
            />
          </FormControl>
        </>
      )}
    />
  )
}
