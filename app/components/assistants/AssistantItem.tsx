// Source: https://github.com/mckaywrigley/chatbot-ui/blob/main/components/sidebar/items/assistants/assistant-item.tsx

import ImageInput from "@/app/components/input/ImageInput"
import { MetadachiContext } from "@/app/lib/context"
import {
  ASSISTANT_DESCRIPTION_MAX,
  ASSISTANT_NAME_MAX
} from "@/app/lib/db/limits"
import { Tables } from "@/supabase/types"
import Image from "next/image"
import React, { FC, useContext, useEffect, useState } from "react"
import { DataListItem } from "@/app/components/ui/data-list/DataListItem"
import { AssistantRetrievalSelect } from "./AssistantRetrievalSelect"
import { AssistantToolSelect } from "./AssistantToolSelect"
import { ChatSettingsFormWrapper } from "@/app/components/chat/ChatSettingsForm"
import { Icon } from "@iconify-icon/react"
import { Input, Textarea } from "@nextui-org/react"

interface AssistantItemProps {
  assistant: Tables<"assistants">
}

export const AssistantItem: FC<AssistantItemProps> = ({ assistant }) => {
  const { selectedWorkspace, assistantImages } = useContext(MetadachiContext)

  const [name, setName] = useState(assistant.name)
  const [isTyping, setIsTyping] = useState(false)
  const [description, setDescription] = useState(assistant.description)
  const [assistantChatSettings, setAssistantChatSettings] = useState({
    model: assistant.model,
    prompt: assistant.prompt,
    temperature: assistant.temperature,
    contextLength: assistant.context_length,
    includeProfileContext: assistant.include_profile_context,
    includeWorkspaceInstructions: assistant.include_workspace_instructions
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageLink, setImageLink] = useState("")

  useEffect(() => {
    const assistantImage =
      assistantImages.find(image => image.path === assistant.image_path)
        ?.base64 || ""
    setImageLink(assistantImage)
  }, [assistant, assistantImages])

  if (!selectedWorkspace) return null

  return (
    <DataListItem
      item={assistant}
      contentType="assistants"
      isTyping={isTyping}
      icon={
        imageLink ? (
          <Image
            className="size-7 rounded-full"
            src={imageLink}
            alt={assistant.name}
            width={30}
            height={30}
          />
        ) : (
          <Icon icon="ic:round-assistant" className="text-3xl" />
        )
      }
      updateState={{
        image: selectedImage,
        user_id: assistant.user_id,
        name,
        description,
        include_profile_context: assistantChatSettings.includeProfileContext,
        include_workspace_instructions:
          assistantChatSettings.includeWorkspaceInstructions,
        context_length: assistantChatSettings.contextLength,
        model: assistantChatSettings.model,
        image_path: assistant.image_path,
        prompt: assistantChatSettings.prompt,
        temperature: assistantChatSettings.temperature
      }}
      renderInputs={(renderState: {
        startingAssistantFiles: Tables<"files">[]
        setStartingAssistantFiles: React.Dispatch<
          React.SetStateAction<Tables<"files">[]>
        >
        selectedAssistantFiles: Tables<"files">[]
        setSelectedAssistantFiles: React.Dispatch<
          React.SetStateAction<Tables<"files">[]>
        >
        startingAssistantCollections: Tables<"collections">[]
        setStartingAssistantCollections: React.Dispatch<
          React.SetStateAction<Tables<"collections">[]>
        >
        selectedAssistantCollections: Tables<"collections">[]
        setSelectedAssistantCollections: React.Dispatch<
          React.SetStateAction<Tables<"collections">[]>
        >
        startingAssistantTools: Tables<"tools">[]
        setStartingAssistantTools: React.Dispatch<
          React.SetStateAction<Tables<"tools">[]>
        >
        selectedAssistantTools: Tables<"tools">[]
        setSelectedAssistantTools: React.Dispatch<
          React.SetStateAction<Tables<"tools">[]>
        >
      }) => (
        <>
          <Input
            isRequired
            label="Name"
            labelPlacement="outside"
            placeholder="Assistant name..."
            value={name}
            onValueChange={setName}
            maxLength={ASSISTANT_NAME_MAX}
            description={`${name.length}/${ASSISTANT_NAME_MAX}`}
          />

          <ImageInput
            src={imageLink}
            image={selectedImage}
            onSrcChange={setImageLink}
            onImageChange={setSelectedImage}
            width={100}
            height={100}
            label="Assistant Image"
          />

          <Textarea
            label="Assistant Description"
            labelPlacement="outside"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Assistant Description... (optional)"
            minRows={1}
            maxRows={3}
            maxLength={ASSISTANT_DESCRIPTION_MAX}
            description={`${description.length}/${ASSISTANT_DESCRIPTION_MAX}`}
          />

          <AssistantRetrievalSelect
            selectedAssistantRetrievalItems={
              [
                ...renderState.selectedAssistantFiles,
                ...renderState.selectedAssistantCollections
              ].length === 0
                ? [
                    ...renderState.startingAssistantFiles,
                    ...renderState.startingAssistantCollections
                  ]
                : [
                    ...renderState.startingAssistantFiles.filter(
                      startingFile =>
                        ![
                          ...renderState.selectedAssistantFiles,
                          ...renderState.selectedAssistantCollections
                        ].some(
                          selectedFile => selectedFile.id === startingFile.id
                        )
                    ),
                    ...renderState.selectedAssistantFiles.filter(
                      selectedFile =>
                        !renderState.startingAssistantFiles.some(
                          startingFile => startingFile.id === selectedFile.id
                        )
                    ),
                    ...renderState.startingAssistantCollections.filter(
                      startingCollection =>
                        ![
                          ...renderState.selectedAssistantFiles,
                          ...renderState.selectedAssistantCollections
                        ].some(
                          selectedCollection =>
                            selectedCollection.id === startingCollection.id
                        )
                    ),
                    ...renderState.selectedAssistantCollections.filter(
                      selectedCollection =>
                        !renderState.startingAssistantCollections.some(
                          startingCollection =>
                            startingCollection.id === selectedCollection.id
                        )
                    )
                  ]
            }
            setSelectedAssistantRetrievalItems={items => {
              const files = items.filter(
                item => "type" in item
              ) as Tables<"files">[]
              const collections = items.filter(
                item => !("type" in item)
              ) as Tables<"collections">[]
              renderState.setSelectedAssistantFiles(files)
              renderState.setSelectedAssistantCollections(collections)
            }}
          />

          <AssistantToolSelect
            selectedAssistantTools={
              renderState.selectedAssistantTools.length === 0
                ? renderState.startingAssistantTools
                : [
                    ...renderState.startingAssistantTools.filter(
                      startingTool =>
                        !renderState.selectedAssistantTools.some(
                          selectedTool => selectedTool.id === startingTool.id
                        )
                    ),
                    ...renderState.selectedAssistantTools.filter(
                      selectedTool =>
                        !renderState.startingAssistantTools.some(
                          startingTool => startingTool.id === selectedTool.id
                        )
                    )
                  ]
            }
            setSelectedAssistantTools={renderState.setSelectedAssistantTools}
          />

          <ChatSettingsFormWrapper
            chatSettings={assistantChatSettings as any}
            onChangeChatSettings={setAssistantChatSettings}
          />
        </>
      )}
    />
  )
}
