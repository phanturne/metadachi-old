"use client"
import React, { useContext, useEffect, useState } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { toast } from "sonner"
import { LLMID } from "@/app/lib/types"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuthModal } from "@/app/lib/providers/AuthContextProvider"
import { WORKSPACE_INSTRUCTIONS_MAX } from "@/app/lib/db/limits"
import {
  getWorkspaceImageFromStorage,
  uploadWorkspaceImage
} from "@/app/lib/db/storage/workspace-images"
import { updateWorkspace } from "@/app/lib/db/workspaces"
import { convertBlobToBase64 } from "@/app/lib/utils/blob-to-b64"
import { AvatarImageInput } from "@/app/components/input/ImageInput"
import { ChatSettingsForm } from "@/app/components/forms/ChatSettingsForm"
import { DeleteWorkspace } from "@/app/components/workspace/DeleteWorkspace"
import { Icon } from "@iconify-icon/react"
import {
  Button,
  Card,
  CardBody,
  Input,
  Tab,
  Tabs,
  Textarea
} from "@nextui-org/react"

export default function WorkspaceSettingsPage() {
  const searchParams = useSearchParams()
  const [tab, setTab] = useState(searchParams.get("tab") ?? "main")

  const { openAuthModal } = useAuthModal()
  const router = useRouter()

  const {
    profile,
    selectedWorkspace,
    setSelectedWorkspace,
    setWorkspaces,
    setChatSettings,
    workspaceImages,
    setWorkspaceImages
  } = useContext(MetadachiContext)

  const [name, setName] = useState(selectedWorkspace?.name || "")
  const [imageLink, setImageLink] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [description, setDescription] = useState(
    selectedWorkspace?.description || ""
  )
  const [instructions, setInstructions] = useState(
    selectedWorkspace?.instructions || ""
  )

  const [defaultChatSettings, setDefaultChatSettings] = useState({
    model: selectedWorkspace?.default_model,
    prompt: selectedWorkspace?.default_prompt,
    temperature: selectedWorkspace?.default_temperature,
    contextLength: selectedWorkspace?.default_context_length,
    includeProfileContext: selectedWorkspace?.include_profile_context,
    includeWorkspaceInstructions:
      selectedWorkspace?.include_workspace_instructions,
    embeddingsProvider: selectedWorkspace?.embeddings_provider
  })

  useEffect(() => {
    const workspaceImage =
      workspaceImages.find(
        image => image.path === selectedWorkspace?.image_path
      )?.base64 || ""

    setImageLink(workspaceImage)
  }, [workspaceImages])

  const handleSave = async () => {
    if (!profile) {
      openAuthModal()
      return toast.error("You must be logged in to save workspace settings.")
    }

    if (!selectedWorkspace) {
      return toast.error("No workspace selected.")
    }

    let imagePath = ""

    if (selectedImage) {
      imagePath = await uploadWorkspaceImage(selectedWorkspace, selectedImage)

      const url = (await getWorkspaceImageFromStorage(imagePath)) || ""

      if (url) {
        const response = await fetch(url)
        const blob = await response.blob()
        const base64 = await convertBlobToBase64(blob)

        setWorkspaceImages(prev => [
          ...prev,
          {
            workspaceId: selectedWorkspace.id,
            path: imagePath,
            base64,
            url
          }
        ])
      }
    }

    const updatedWorkspace = await updateWorkspace(selectedWorkspace.id, {
      ...selectedWorkspace,
      name,
      description,
      image_path: imagePath,
      instructions,
      default_model: defaultChatSettings.model,
      default_prompt: defaultChatSettings.prompt,
      default_temperature: defaultChatSettings.temperature,
      default_context_length: defaultChatSettings.contextLength,
      embeddings_provider: defaultChatSettings.embeddingsProvider,
      include_profile_context: defaultChatSettings.includeProfileContext,
      include_workspace_instructions:
        defaultChatSettings.includeWorkspaceInstructions
    })

    if (
      defaultChatSettings.model &&
      defaultChatSettings.prompt &&
      defaultChatSettings.temperature &&
      defaultChatSettings.contextLength &&
      defaultChatSettings.includeProfileContext &&
      defaultChatSettings.includeWorkspaceInstructions &&
      defaultChatSettings.embeddingsProvider
    ) {
      setChatSettings({
        model: defaultChatSettings.model as LLMID,
        prompt: defaultChatSettings.prompt,
        temperature: defaultChatSettings.temperature,
        contextLength: defaultChatSettings.contextLength,
        includeProfileContext: defaultChatSettings.includeProfileContext,
        includeWorkspaceInstructions:
          defaultChatSettings.includeWorkspaceInstructions,
        embeddingsProvider: defaultChatSettings.embeddingsProvider as
          | "openai"
          | "local"
      })
    }

    setSelectedWorkspace(updatedWorkspace)
    setWorkspaces(workspaces => {
      return workspaces.map(workspace => {
        if (workspace.id === selectedWorkspace.id) {
          return updatedWorkspace
        }

        return workspace
      })
    })

    toast.success("Workspace updated!")
  }

  const handleReset = () => {
    setName(selectedWorkspace?.name || "")
    setDescription(selectedWorkspace?.description || "")
    setInstructions(selectedWorkspace?.instructions || "")
    setImageLink("")
    setSelectedImage(null)
    setDefaultChatSettings({
      model: selectedWorkspace?.default_model,
      prompt: selectedWorkspace?.default_prompt,
      temperature: selectedWorkspace?.default_temperature,
      contextLength: selectedWorkspace?.default_context_length,
      includeProfileContext: selectedWorkspace?.include_profile_context,
      includeWorkspaceInstructions:
        selectedWorkspace?.include_workspace_instructions,
      embeddingsProvider: selectedWorkspace?.embeddings_provider
    })
  }

  // if (!selectedWorkspace || !profile) return null

  return (
    <div className="flex w-full flex-col items-center overflow-auto p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold leading-9 text-default-foreground">
          Workspace Settings
        </h1>
        <h2 className="mt-2 text-small text-default-500">
          Customize workspace settings and chat defaults.
        </h2>
        <Tabs
          fullWidth
          classNames={{
            base: "mt-6",
            cursor: "bg-content1 dark:bg-content1",
            panel: "w-full p-0 pt-4"
          }}
          selectedKey={tab}
          onSelectionChange={newTab => {
            router.push(`/workspace-settings?tab=${newTab}`)
            setTab(newTab as string)
          }}
        >
          <Tab
            key="main"
            title={
              <div className="flex items-center space-x-2">
                <Icon icon="ic:round-workspaces" className="text-base" />
                <span>Main</span>
              </div>
            }
          >
            <div className="flex flex-col gap-4">
              <Card className="my-4 bg-default-100" shadow="none">
                <CardBody>
                  <div className="flex items-center gap-4">
                    <AvatarImageInput
                      src={imageLink}
                      name={name}
                      onSrcChange={setImageLink}
                      onImageChange={setSelectedImage}
                    />

                    <p className="text-sm font-medium text-default-600">
                      {name}
                    </p>
                  </div>
                </CardBody>
              </Card>

              <Input
                isRequired
                label="Workspace Name"
                labelPlacement="outside"
                placeholder="Workspace Name..."
                value={name}
                onValueChange={setName}
              />

              <Textarea
                label="Workspace Description"
                labelPlacement="outside"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Workspace Description... (optional)"
                minRows={4}
                maxRows={10}
              />

              <Textarea
                label=" How would you like the AI to respond in this workspace?"
                labelPlacement="outside"
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                placeholder="Instructions... (optional)"
                minRows={4}
                maxRows={10}
                maxLength={WORKSPACE_INSTRUCTIONS_MAX}
                description={`${instructions.length}/${WORKSPACE_INSTRUCTIONS_MAX}`}
              />
            </div>
          </Tab>
          <Tab
            key="chat-defaults"
            title={
              <div className="flex items-center space-x-2">
                <Icon
                  icon="solar:chat-round-line-linear"
                  className="text-base"
                />
                <span>Chat Defaults</span>
              </div>
            }
          >
            <div className="flex flex-col gap-4">
              {/*<h2 className="mb-4 text-small text-default-500">*/}
              {/*  Note: Adding an API Key will override its corresponding system*/}
              {/*  API key (if it exists).*/}
              {/*</h2>*/}
              <ChatSettingsForm
                chatSettings={defaultChatSettings as any}
                onChangeChatSettings={setDefaultChatSettings}
              />
            </div>
          </Tab>
        </Tabs>

        <div className="flex justify-between gap-2 py-8">
          <div>
            {selectedWorkspace && !selectedWorkspace.is_home && (
              <DeleteWorkspace workspace={selectedWorkspace} />
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="light" onClick={handleReset}>
              Reset
            </Button>
            <Button color="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
