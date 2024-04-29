import React, { useContext } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { Tables } from "@/supabase/types"
import { Icon } from "@iconify-icon/react"
import { Select, SelectItem } from "@nextui-org/react"
import { AssistantAvatar } from "@/app/components/ui/Avatars"

export default function AssistantSelect({
  size,
  label,
  labelPlacement
}: {
  size?: "sm" | "md" | "lg"
  label?: string
  labelPlacement?: "outside" | "inside"
}) {
  const { assistants, setSelectedAssistant, assistantImages } =
    useContext(MetadachiContext)

  const selectedAssistants: Tables<"assistants">[] = []
  const selectedAssistantIds: string[] = []

  // TODO: Refactor duplicate logic
  const handleAssistantSelect = async (items: Tables<"assistants">[]) => {
    console.log(items)
    // let newFiles = []
    //
    // for (const item of items) {
    //   if ("type" in item) {
    //     const file = item as Tables<"files">
    //     newFiles.push({
    //       id: file.id,
    //       name: file.name,
    //       type: file.type,
    //       file: null
    //     })
    //   } else {
    //     const collection = item as Tables<"collections">
    //     const collectionFiles = await getCollectionFilesByCollectionId(
    //       collection.id
    //     )
    //
    //     const collectionNewFiles = collectionFiles.files
    //       .filter(
    //         file =>
    //           !newMessageFiles.some(prevFile => prevFile.id === file.id) &&
    //           !chatFiles.some(chatFile => chatFile.id === file.id)
    //       )
    //       .map(file => ({
    //         id: file.id,
    //         name: file.name,
    //         type: file.type,
    //         file: null
    //       }))
    //
    //     newFiles.push(...collectionNewFiles)
    //   }
    // }
    //
    // setNewMessageFiles(newFiles)
  }

  return (
    <Select
      size={size}
      label={label ?? "Assistants"}
      labelPlacement={labelPlacement}
      placeholder={`Search assistants...`}
      selectedKeys={selectedAssistantIds}
      onSelectionChange={ids => {
        const selected = assistants.filter(item =>
          Array.from(ids).includes(item.id)
        )

        console.log(ids, selected)
        // setSelectedAssistant(selected)
      }}
      startContent={
        selectedAssistants.length > 0 ? (
          <AssistantAvatar
            size="md"
            selectedAssistantImage={
              assistantImages.find(
                image => image.path === selectedAssistants[0].image_path
              )?.url || ""
            }
          />
        ) : (
          <Icon icon="solar:stars-bold-duotone" className="text-2xl" />
        )
      }
    >
      {assistants.map(item => (
        <SelectItem key={item.id} value={item.name} textValue={item.name}>
          <div className="flex items-center gap-2">
            <AssistantAvatar
              size="sm"
              selectedAssistantImage={
                assistantImages.find(image => image.path === item.image_path)
                  ?.url || ""
              }
            />
            {item.name}
          </div>
        </SelectItem>
      ))}
    </Select>
  )
}
