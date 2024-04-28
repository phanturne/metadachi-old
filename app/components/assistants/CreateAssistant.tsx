import { CreateItemModal } from "@/app/components/ui/data-list/CreateItemModal"
import { MetadachiContext } from "@/app/lib/context"
import {
  ASSISTANT_DESCRIPTION_MAX,
  ASSISTANT_NAME_MAX
} from "@/app/lib/db/limits"
import { Tables, TablesInsert } from "@/supabase/types"
import React, { FC, useContext, useEffect, useState } from "react"
import { AssistantRetrievalSelect } from "./AssistantRetrievalSelect"
import { AssistantToolSelect } from "./AssistantToolSelect"
import { ChatSettingsFormWrapper } from "@/app/components/chat/ChatSettingsForm"
import ImageInput from "@/app/components/input/ImageInput"
import { Input, Textarea } from "@nextui-org/react"

interface CreateAssistantProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const CreateAssistant: FC<CreateAssistantProps> = ({
  isOpen,
  onOpenChange
}) => {
  const { profile, selectedWorkspace } = useContext(MetadachiContext)

  const [name, setName] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [description, setDescription] = useState("")
  const [assistantChatSettings, setAssistantChatSettings] = useState({
    model: selectedWorkspace?.default_model,
    prompt: selectedWorkspace?.default_prompt,
    temperature: selectedWorkspace?.default_temperature,
    contextLength: selectedWorkspace?.default_context_length,
    includeProfileContext: false,
    includeWorkspaceInstructions: false,
    embeddingsProvider: selectedWorkspace?.embeddings_provider
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageLink, setImageLink] = useState("")
  const [selectedAssistantRetrievalItems, setSelectedAssistantRetrievalItems] =
    useState<Tables<"files">[] | Tables<"collections">[]>([])
  const [selectedAssistantToolItems, setSelectedAssistantToolItems] = useState<
    Tables<"tools">[]
  >([])
  const [isModelToolCompatible, setIsModelToolCompatible] = useState(false)

  useEffect(() => {
    setAssistantChatSettings(prevSettings => {
      const previousPrompt = prevSettings.prompt || ""
      const previousPromptParts = previousPrompt.split(". ")

      previousPromptParts[0] = name ? `You are ${name}` : ""

      return {
        ...prevSettings,
        prompt: previousPromptParts.join(". ")
      }
    })
  }, [name])

  useEffect(() => {
    setIsModelToolCompatible(checkIfModelIsToolCompatible())
  }, [])

  const checkIfModelIsToolCompatible = () => {
    if (!assistantChatSettings.model) return false

    const compatibleModels = [
      "gpt-4-turbo-preview",
      "gpt-4-vision-preview",
      "gpt-3.5-turbo-1106",
      "gpt-4"
    ]
    const isModelCompatible = compatibleModels.includes(
      assistantChatSettings.model
    )

    return isModelCompatible
  }

  if (!profile) return null
  if (!selectedWorkspace) return null

  return (
    <CreateItemModal
      contentType="assistants"
      createState={
        {
          image: selectedImage,
          user_id: profile.user_id,
          name,
          description,
          include_profile_context: assistantChatSettings.includeProfileContext,
          include_workspace_instructions:
            assistantChatSettings.includeWorkspaceInstructions,
          context_length: assistantChatSettings.contextLength,
          model: assistantChatSettings.model,
          image_path: "",
          prompt: assistantChatSettings.prompt,
          temperature: assistantChatSettings.temperature,
          embeddings_provider: assistantChatSettings.embeddingsProvider,
          files: selectedAssistantRetrievalItems.filter(item =>
            item.hasOwnProperty("type")
          ) as Tables<"files">[],
          collections: selectedAssistantRetrievalItems.filter(
            item => !item.hasOwnProperty("type")
          ) as Tables<"collections">[],
          tools: selectedAssistantToolItems
        } as TablesInsert<"assistants">
      }
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isTyping={isTyping}
      renderInputs={() => (
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
            placeholder="Assistant Description..."
            minRows={1}
            maxRows={3}
            maxLength={ASSISTANT_DESCRIPTION_MAX}
            description={`${description.length}/${ASSISTANT_DESCRIPTION_MAX}`}
          />

          <AssistantRetrievalSelect
            selectedAssistantRetrievalItems={selectedAssistantRetrievalItems}
            setSelectedAssistantRetrievalItems={
              setSelectedAssistantRetrievalItems
            }
          />

          <AssistantToolSelect
            isDisabled={!checkIfModelIsToolCompatible()}
            selectedAssistantTools={selectedAssistantToolItems}
            setSelectedAssistantTools={setSelectedAssistantToolItems}
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
