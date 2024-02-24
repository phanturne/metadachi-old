import ImageInput from "@/app/components/input/ImageInput"
import { MetadachiContext } from "@/app/lib/context"
import {
  ASSISTANT_DESCRIPTION_MAX,
  ASSISTANT_NAME_MAX
} from "@/app/lib/db/limits"
import { Tables } from "@/supabase/types"
import Image from "next/image"
import { FC, useContext, useEffect, useState } from "react"
import profile from "react-syntax-highlighter/dist/esm/languages/hljs/profile"
import { DataListItem } from "@/app/components/data-list/shared/DataListItem"
import { AssistantRetrievalSelect } from "./AssistantRetrievalSelect"
import { AssistantToolSelect } from "./AssistantToolSelect"
import { ChatSettingsForm } from "@/app/components/forms/ChatSettingsForm"
import { AssistantRounded } from "@mui/icons-material"
import { FormControl, FormLabel, Input } from "@mui/joy"
import { DATA_LIST_ITEM_ICON_STYLE } from "@/app/lib/constants"

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

  if (!profile) return null
  if (!selectedWorkspace) return null

  return (
    <DataListItem
      item={assistant}
      contentType="assistants"
      isTyping={isTyping}
      icon={
        imageLink ? (
          <Image
            style={{ width: "30px", height: "30px" }}
            className="rounded"
            src={imageLink}
            alt={assistant.name}
            width={30}
            height={30}
          />
        ) : (
          <AssistantRounded style={DATA_LIST_ITEM_ICON_STYLE} />
          // <IconRobotFace
          //   className="bg-primary text-secondary border-primary rounded border-[1px] p-1"
          //   size={30}
          // />
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
          <FormControl>
            <FormLabel>Name</FormLabel>

            <Input
              placeholder="Assistant name..."
              value={name}
              onChange={e => setName(e.target.value)}
              slotProps={{ input: { maxLength: ASSISTANT_NAME_MAX } }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>

            <Input
              placeholder="Assistant description..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              slotProps={{ input: { maxLength: ASSISTANT_DESCRIPTION_MAX } }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Image</FormLabel>

            <ImageInput
              src={imageLink}
              image={selectedImage}
              onSrcChange={setImageLink}
              onImageChange={setSelectedImage}
              width={100}
              height={100}
            />
          </FormControl>

          <ChatSettingsForm
            chatSettings={assistantChatSettings as any}
            onChangeChatSettings={setAssistantChatSettings}
          />

          <FormControl>
            <FormLabel>Files & Collections</FormLabel>

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
          </FormControl>

          <FormControl>
            <FormLabel>Tools</FormLabel>

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
          </FormControl>
        </>
      )}
    />
  )
}
