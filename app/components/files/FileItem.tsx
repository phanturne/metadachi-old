import { FileIcons } from "./FileIcons"
import { FILE_DESCRIPTION_MAX, FILE_NAME_MAX } from "@/app/lib/db/limits"
import { getFileFromStorage } from "@/app/lib/db/storage/files"
import { Tables } from "@/supabase/types"
import React, { FC, useState } from "react"
import { DataListItem } from "@/app/components/ui/data-list/DataListItem"
import { formatFileSize } from "@/app/lib/utils/file-utils"
import { Button, Input, Textarea } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

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
      icon={<FileIcons type={file.type} className="text-3xl" />}
      updateState={{ name, description }}
      renderInputs={() => (
        <>
          <div className="flex flex-col gap-1 py-2">
            <Button
              variant="bordered"
              onClick={getLinkAndView}
              startContent={
                <Icon
                  icon="solar:link-minimalistic-2-linear"
                  className="text-xl"
                />
              }
            >
              View {file.name}
            </Button>

            <p className="text-sm text-neutral-500">{`Type: ${file.type.toUpperCase()} | Size: ${formatFileSize(
              file.size
            )} | ${file.tokens.toLocaleString()} tokens`}</p>
          </div>

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
