// Source: https://github.com/mckaywrigley/chatbot-ui/blob/main/components/chat/chat-hooks/use-prompt-and-command.tsx

import React, { useContext } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { Tables } from "@/supabase/types"
import { Icon } from "@iconify-icon/react"
import { Select, SelectItem } from "@nextui-org/react"
import { AssistantAvatar } from "@/app/components/ui/Avatars"
import { LLMID } from "@/app/lib/types"
import { getAssistantFilesByAssistantId } from "@/app/lib/db/assistant-files"
import { getAssistantCollectionsByAssistantId } from "@/app/lib/db/assistant-collections"
import { getCollectionFilesByCollectionId } from "@/app/lib/db/collection-files"
import { getAssistantToolsByAssistantId } from "@/app/lib/db/assistant-tools"

export default function AssistantSelect({
  isDisabled,
  size,
  label,
  labelPlacement
}: {
  isDisabled?: boolean
  size?: "sm" | "md" | "lg"
  label?: string
  labelPlacement?: "outside" | "inside"
}) {
  const {
    assistants,
    selectedAssistant,
    setSelectedAssistant,
    assistantImages,
    setChatSettings,
    setSelectedTools,
    setChatFiles
  } = useContext(MetadachiContext)

  // const selectedAssistants: Tables<"assistants">[] = selectedAssistant
  //   ? [selectedAssistant]
  //   : []

  const selctedAssistantIds = selectedAssistant ? [selectedAssistant.id] : []

  // TODO: Handle multiple assistant selection
  const handleAssistantSelect = async (items: Tables<"assistants">[]) => {
    if (items.length === 0) {
      return
    }

    const assistant = items[0]
    setSelectedAssistant(assistant)

    setChatSettings({
      model: assistant.model as LLMID,
      prompt: assistant.prompt,
      temperature: assistant.temperature,
      contextLength: assistant.context_length,
      includeProfileContext: assistant.include_profile_context,
      includeWorkspaceInstructions: assistant.include_workspace_instructions,
      embeddingsProvider: assistant.embeddings_provider as "openai" | "local"
    })

    let allFiles = []

    const assistantFiles = (await getAssistantFilesByAssistantId(assistant.id))
      .files
    allFiles = [...assistantFiles]
    const assistantCollections = (
      await getAssistantCollectionsByAssistantId(assistant.id)
    ).collections
    for (const collection of assistantCollections) {
      const collectionFiles = (
        await getCollectionFilesByCollectionId(collection.id)
      ).files
      allFiles = [...allFiles, ...collectionFiles]
    }
    const assistantTools = (await getAssistantToolsByAssistantId(assistant.id))
      .tools

    setSelectedTools(assistantTools)
    setChatFiles(
      allFiles.map(file => ({
        id: file.id,
        name: file.name,
        type: file.type,
        file: null
      }))
    )
  }

  return (
    <Select
      isDisabled={isDisabled}
      size={size}
      label={label ?? "Assistants"}
      labelPlacement={labelPlacement}
      placeholder={`Select assistants...`}
      selectedKeys={selctedAssistantIds}
      onSelectionChange={ids => {
        const selected = assistants.filter(item =>
          Array.from(ids).includes(item.id)
        )

        handleAssistantSelect(selected)
      }}
      startContent={
        selectedAssistant ? (
          <AssistantAvatar
            size="xs"
            selectedAssistantImage={
              assistantImages.find(
                image => image.path === selectedAssistant.image_path
              )?.url || ""
            }
            className="-ml-1"
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
              size="xs"
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
