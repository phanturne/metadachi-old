import { FileIcons } from "@/app/components/icons/FileIcons"
import { FILE_DESCRIPTION_MAX, FILE_NAME_MAX } from "@/app/lib/db/limits"
import { getFileFromStorage } from "@/app/lib/db/storage/files"
import { Tables } from "@/supabase/types"
import { FC, useState } from "react"
import { DataListItem } from "@/app/components/data-list/shared/DataListItem"
import { Box, FormControl, FormLabel, Input, Typography } from "@mui/joy"
import Button from "@mui/joy/Button"
import { formatFileSize } from "@/app/lib/utils/file-utils"

interface FileItemProps {
  file: Tables<"files">
}

export const FileItem: FC<FileItemProps> = ({ file }) => {
  const [name, setName] = useState(file.name)
  const [isTyping, setIsTyping] = useState(false)
  const [description, setDescription] = useState(file.description)

  const getLinkAndView = async () => {
    const link = await getFileFromStorage(file.file_path)
    window.open(link, "_blank")
  }

  return (
    <DataListItem
      item={file}
      isTyping={isTyping}
      contentType="files"
      icon={<FileIcons type={file.type} className="text-4xl" />}
      updateState={{ name, description }}
      renderInputs={() => (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1
            }}
          >
            <Button variant="outlined" color="neutral" onClick={getLinkAndView}>
              View {file.name}
            </Button>

            <Typography level="body-sm">{`Type: ${file.type.toUpperCase()} | Size: ${formatFileSize(
              file.size
            )} | ${file.tokens.toLocaleString()} tokens`}</Typography>
          </Box>

          <FormControl>
            <FormLabel>Name</FormLabel>

            <Input
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
