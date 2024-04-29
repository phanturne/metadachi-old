import { MetadachiContext } from "@/app/lib/context"
import { CollectionFile } from "@/app/lib/types"
import React, { FC, useContext } from "react"
import { FileIcons } from "@/app/components/files/FileIcons"
import { Select, SelectItem } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"
import { Tables } from "@/supabase/types"

interface CollectionFileSelectProps {
  selectedCollectionFiles: CollectionFile[]
  setSelectedCollectionFiles: (files: CollectionFile[]) => void
}

export const CollectionFileSelect: FC<CollectionFileSelectProps> = ({
  selectedCollectionFiles,
  setSelectedCollectionFiles
}) => {
  const { files } = useContext(MetadachiContext)

  const selectedFileIds = (
    files.filter(item =>
      selectedCollectionFiles.map(i => i.id).includes(item.id)
    ) as (Tables<"files"> | Tables<"collections">)[]
  ).map(item => item.id)

  return (
    <Select
      selectionMode="multiple"
      label="Files"
      labelPlacement="outside"
      placeholder={`Search files...`}
      selectedKeys={selectedFileIds}
      onSelectionChange={ids => {
        const selected = files.filter(item => Array.from(ids).includes(item.id))

        setSelectedCollectionFiles(selected)
      }}
      startContent={
        <Icon
          icon="solar:folder-with-files-bold-duotone"
          className="text-2xl"
        />
      }
    >
      {files.map(item => (
        <SelectItem key={item.id} value={item.name} textValue={item.name}>
          <div className="flex items-center gap-2">
            <FileIcons type={item.type} className="text-2xl" />
            {item.name}
          </div>
        </SelectItem>
      ))}
    </Select>
  )
}
