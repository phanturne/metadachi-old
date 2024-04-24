import { MetadachiContext } from "@/app/lib/context"
import { Tables } from "@/supabase/types"
import React, { FC, useContext } from "react"
import { Select, SelectItem } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

interface AssistantRetrievalSelectProps {
  selectedAssistantRetrievalItems: Tables<"files">[] | Tables<"collections">[]
  setSelectedAssistantRetrievalItems: (
    _: (Tables<"files"> | Tables<"collections">)[]
  ) => void
}

export const AssistantRetrievalSelect: FC<AssistantRetrievalSelectProps> = ({
  selectedAssistantRetrievalItems,
  setSelectedAssistantRetrievalItems
}) => {
  const { files, collections } = useContext(MetadachiContext)

  const allItems = [...files, ...collections]

  const selectedItemIds = (
    allItems.filter(item =>
      selectedAssistantRetrievalItems.map(i => i.id).includes(item.id)
    ) as (Tables<"files"> | Tables<"collections">)[]
  ).map(item => item.id)

  return (
    <Select
      selectionMode="multiple"
      label="Files & Collections"
      labelPlacement="outside"
      placeholder={`Search collections/files...`}
      selectedKeys={selectedItemIds}
      onSelectionChange={ids => {
        const selected = allItems.filter(item =>
          Array.from(ids).includes(item.id)
        )

        setSelectedAssistantRetrievalItems(selected)
      }}
      startContent={
        <Icon
          icon="solar:folder-with-files-bold-duotone"
          className="text-2xl"
        />
      }
    >
      {allItems.map(item => (
        <SelectItem key={item.id} value={item.name} textValue={item.name}>
          <div className="flex items-center gap-2">
            {"type" in item ? (
              <Icon icon="solar:file-text-bold-duotone" className="text-2xl" />
            ) : (
              <Icon
                icon="solar:folder-with-files-bold-duotone"
                className="text-2xl"
              />
            )}
            {item.name}
          </div>
        </SelectItem>
      ))}
    </Select>
  )
}
