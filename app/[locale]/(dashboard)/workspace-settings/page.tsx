"use client"
import Header from "@/app/components/ui/Header"
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Typography
} from "@mui/joy"
import React, { useContext, useEffect, useState } from "react"
import Tabs from "@mui/joy/Tabs"
import TabList from "@mui/joy/TabList"
import Tab, { tabClasses } from "@mui/joy/Tab"
import { MetadachiContext } from "@/app/lib/context"
import { toast } from "sonner"
import { LLMID } from "@/app/lib/types"
import { useSearchParams } from "next/navigation"
import { FULL_WIDTH_PADDING_X } from "@/app/lib/constants"
import { useAuthModal } from "@/app/lib/providers/AuthContextProvider"
import { WORKSPACE_INSTRUCTIONS_MAX } from "@/app/lib/db/limits"
import {
  getWorkspaceImageFromStorage,
  uploadWorkspaceImage
} from "@/app/lib/db/storage/workspace-images"
import { updateWorkspace } from "@/app/lib/db/workspaces"
import { convertBlobToBase64 } from "@/app/lib/utils/blob-to-b64"
import ImageInput from "@/app/components/input/ImageInput"
import { ChatSettingsForm } from "@/app/components/forms/ChatSettingsForm"
import { DeleteWorkspace } from "@/app/components/workspace/DeleteWorkspace"

export default function WorkspaceSettingsPage() {
  const searchParams = useSearchParams()
  const [tab, setTab] = useState(searchParams.get("tab") ?? "main")

  const { openAuthModal } = useAuthModal()

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
    return
  }

  // if (!selectedWorkspace || !profile) return null

  return (
    <>
      <Header
        startContent={
          <Typography level="title-lg">Workspace Settings</Typography>
        }
        middleContent={
          <Tabs
            value={tab}
            onChange={(event, value) => {
              setTab((value as string) ?? "main")
            }}
            size="sm"
            aria-label="tabs"
            defaultValue={0}
            sx={{
              bgcolor: "transparent",
              alignItems: "center",
              display: "flex",
              width: "100%",
              height: "100%",
              overflow: "scroll",
              mt: 1
            }}
          >
            <TabList
              disableUnderline
              sx={{
                p: 0.5,
                gap: 0.5,
                borderRadius: "xl",
                bgcolor: "background.level1",
                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                  boxShadow: "sm",
                  bgcolor: "background.surface"
                }
              }}
            >
              <Tab disableIndicator value="main">
                Main
              </Tab>
              <Tab disableIndicator value="default">
                Default
              </Tab>
            </TabList>
          </Tabs>
        }
      />

      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "scroll",
          mt: 2,
          px: FULL_WIDTH_PADDING_X
        }}
      >
        {tab === "main" && (
          <Stack spacing={2}>
            <ImageInput
              src={imageLink}
              image={selectedImage}
              onSrcChange={setImageLink}
              onImageChange={setSelectedImage}
              width={50}
              height={50}
            />

            <FormControl>
              <FormLabel>Workspace Name</FormLabel>
              <Input
                placeholder="Name..."
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormControl>

            {/* <div className="space-y-1">
              <Label>Description</Label>

              <Input
                placeholder="Description... (optional)"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div> */}

            <FormControl>
              <FormLabel>
                How would you like the AI to respond in this workspace?
              </FormLabel>

              <Textarea
                placeholder="Instructions... (optional)"
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                minRows={5}
                maxRows={10}
              />

              <FormHelperText
                sx={{ fontStyle: "italic" }}
              >{`${instructions.length}/${WORKSPACE_INSTRUCTIONS_MAX}`}</FormHelperText>
            </FormControl>
          </Stack>
        )}

        {tab === "default" && (
          <FormControl>
            <FormLabel>
              These are the settings your workspace begins with when selected.
            </FormLabel>

            <ChatSettingsForm
              chatSettings={defaultChatSettings as any}
              onChangeChatSettings={setDefaultChatSettings}
            />
          </FormControl>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          py: 2,
          px: FULL_WIDTH_PADDING_X
        }}
      >
        {selectedWorkspace && !selectedWorkspace.is_home && (
          <DeleteWorkspace workspace={selectedWorkspace} />
        )}

        <Box
          sx={{
            display: "flex",
            gap: 2
          }}
        >
          <Button variant="outlined" color="neutral" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </Box>
      </Box>
    </>
  )
}
