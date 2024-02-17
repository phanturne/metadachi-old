import { AssignWorkspaces } from "@/app/components/workspace/assign-workspaces"
import { MetadachiContext } from "@/app/lib/context"
import {
  createAssistantCollection,
  deleteAssistantCollection,
  getAssistantCollectionsByAssistantId
} from "@/app/lib/db/assistant-collections"
import {
  createAssistantFile,
  deleteAssistantFile,
  getAssistantFilesByAssistantId
} from "@/app/lib/db/assistant-files"
import {
  createAssistantTool,
  deleteAssistantTool,
  getAssistantToolsByAssistantId
} from "@/app/lib/db/assistant-tools"
import {
  createAssistantWorkspaces,
  deleteAssistantWorkspace,
  getAssistantWorkspacesByAssistantId,
  updateAssistant
} from "@/app/lib/db/assistants"
import { updateChat } from "@/app/lib/db/chats"
import {
  createCollectionFile,
  deleteCollectionFile,
  getCollectionFilesByCollectionId
} from "@/app/lib/db/collection-files"
import {
  createCollectionWorkspaces,
  deleteCollectionWorkspace,
  getCollectionWorkspacesByCollectionId,
  updateCollection
} from "@/app/lib/db/collections"
import {
  createFileWorkspaces,
  deleteFileWorkspace,
  getFileWorkspacesByFileId,
  updateFile
} from "@/app/lib/db/files"
import {
  createModelWorkspaces,
  deleteModelWorkspace,
  getModelWorkspacesByModelId,
  updateModel
} from "@/app/lib/db/models"
import {
  createPresetWorkspaces,
  deletePresetWorkspace,
  getPresetWorkspacesByPresetId,
  updatePreset
} from "@/app/lib/db/presets"
import {
  createPromptWorkspaces,
  deletePromptWorkspace,
  getPromptWorkspacesByPromptId,
  updatePrompt
} from "@/app/lib/db/prompts"
import {
  getAssistantImageFromStorage,
  uploadAssistantImage
} from "@/app/lib/db/storage/assistant-images"
import {
  createToolWorkspaces,
  deleteToolWorkspace,
  getToolWorkspacesByToolId,
  updateTool
} from "@/app/lib/db/tools"
import { convertBlobToBase64 } from "@/app/lib/utils/blob-to-b64"
import { Tables, TablesUpdate } from "@/supabase/types"
import { CollectionFile, ContentType, DataItemType } from "../../../lib/types"
import { FC, useContext, useEffect, useRef, useState } from "react"
import profile from "react-syntax-highlighter/dist/esm/languages/hljs/profile"
import { toast } from "sonner"
import { DeleteItemButton } from "./DeleteItemButton"
import {
  Box,
  Button,
  DialogTitle,
  Modal,
  ModalDialog,
  Stack,
  Typography
} from "@mui/joy"

interface SidebarUpdateItemProps {
  open: boolean
  setOpen: (open: boolean) => void
  isTyping: boolean
  item: DataItemType
  contentType: ContentType
  renderInputs: (renderState: any) => JSX.Element
  updateState: any
}

export const UpdateItemModal: FC<SidebarUpdateItemProps> = ({
  open,
  setOpen,
  item,
  contentType,
  renderInputs,
  updateState,
  isTyping
}) => {
  const {
    workspaces,
    selectedWorkspace,
    setChats,
    setPresets,
    setPrompts,
    setFiles,
    setCollections,
    setAssistants,
    setTools,
    setModels,
    setAssistantImages
  } = useContext(MetadachiContext)

  const buttonRef = useRef<HTMLButtonElement>(null)

  const [startingWorkspaces, setStartingWorkspaces] = useState<
    Tables<"workspaces">[]
  >([])
  const [selectedWorkspaces, setSelectedWorkspaces] = useState<
    Tables<"workspaces">[]
  >([])

  // Collections Render State
  const [startingCollectionFiles, setStartingCollectionFiles] = useState<
    CollectionFile[]
  >([])
  const [selectedCollectionFiles, setSelectedCollectionFiles] = useState<
    CollectionFile[]
  >([])

  // Assistants Render State
  const [startingAssistantFiles, setStartingAssistantFiles] = useState<
    Tables<"files">[]
  >([])
  const [startingAssistantCollections, setStartingAssistantCollections] =
    useState<Tables<"collections">[]>([])
  const [startingAssistantTools, setStartingAssistantTools] = useState<
    Tables<"tools">[]
  >([])
  const [selectedAssistantFiles, setSelectedAssistantFiles] = useState<
    Tables<"files">[]
  >([])
  const [selectedAssistantCollections, setSelectedAssistantCollections] =
    useState<Tables<"collections">[]>([])
  const [selectedAssistantTools, setSelectedAssistantTools] = useState<
    Tables<"tools">[]
  >([])

  useEffect(() => {
    if (open) {
      const fetchData = async () => {
        if (workspaces.length > 1) {
          const workspaces = await fetchSelectedWorkspaces()
          setStartingWorkspaces(workspaces)
          setSelectedWorkspaces(workspaces)
        }

        const fetchDataFunction = fetchDataFunctions[contentType]
        if (!fetchDataFunction) return
        await fetchDataFunction(item.id)
      }

      fetchData()
    }
  }, [open])

  const renderState = {
    chats: null,
    presets: null,
    prompts: null,
    files: null,
    collections: {
      startingCollectionFiles,
      setStartingCollectionFiles,
      selectedCollectionFiles,
      setSelectedCollectionFiles
    },
    assistants: {
      startingAssistantFiles,
      setStartingAssistantFiles,
      startingAssistantCollections,
      setStartingAssistantCollections,
      startingAssistantTools,
      setStartingAssistantTools,
      selectedAssistantFiles,
      setSelectedAssistantFiles,
      selectedAssistantCollections,
      setSelectedAssistantCollections,
      selectedAssistantTools,
      setSelectedAssistantTools
    },
    tools: null,
    models: null
  }

  const fetchDataFunctions = {
    chats: null,
    presets: null,
    prompts: null,
    files: null,
    collections: async (collectionId: string) => {
      const collectionFiles =
        await getCollectionFilesByCollectionId(collectionId)
      setStartingCollectionFiles(collectionFiles.files)
      setSelectedCollectionFiles([])
    },
    assistants: async (assistantId: string) => {
      const assistantFiles = await getAssistantFilesByAssistantId(assistantId)
      setStartingAssistantFiles(assistantFiles.files)

      const assistantCollections =
        await getAssistantCollectionsByAssistantId(assistantId)
      setStartingAssistantCollections(assistantCollections.collections)

      const assistantTools = await getAssistantToolsByAssistantId(assistantId)
      setStartingAssistantTools(assistantTools.tools)

      setSelectedAssistantFiles([])
      setSelectedAssistantCollections([])
      setSelectedAssistantTools([])
    },
    tools: null,
    models: null
  }

  const fetchWorkpaceFunctions = {
    chats: null,
    presets: async (presetId: string) => {
      const item = await getPresetWorkspacesByPresetId(presetId)
      return item.workspaces
    },
    prompts: async (promptId: string) => {
      const item = await getPromptWorkspacesByPromptId(promptId)
      return item.workspaces
    },
    files: async (fileId: string) => {
      const item = await getFileWorkspacesByFileId(fileId)
      return item.workspaces
    },
    collections: async (collectionId: string) => {
      const item = await getCollectionWorkspacesByCollectionId(collectionId)
      return item.workspaces
    },
    assistants: async (assistantId: string) => {
      const item = await getAssistantWorkspacesByAssistantId(assistantId)
      return item.workspaces
    },
    tools: async (toolId: string) => {
      const item = await getToolWorkspacesByToolId(toolId)
      return item.workspaces
    },
    models: async (modelId: string) => {
      const item = await getModelWorkspacesByModelId(modelId)
      return item.workspaces
    }
  }

  const fetchSelectedWorkspaces = async () => {
    const fetchFunction = fetchWorkpaceFunctions[contentType]

    if (!fetchFunction) return []

    const workspaces = await fetchFunction(item.id)

    return workspaces
  }

  const handleWorkspaceUpdates = async (
    startingWorkspaces: Tables<"workspaces">[],
    selectedWorkspaces: Tables<"workspaces">[],
    itemId: string,
    deleteWorkspaceFn: (
      itemId: string,
      workspaceId: string
    ) => Promise<boolean>,
    createWorkspaceFn: (
      workspaces: { user_id: string; item_id: string; workspace_id: string }[]
    ) => Promise<void>,
    itemIdKey: string
  ) => {
    if (!selectedWorkspace) return

    const deleteList = startingWorkspaces.filter(
      startingWorkspace =>
        !selectedWorkspaces.some(
          selectedWorkspace => selectedWorkspace.id === startingWorkspace.id
        )
    )

    for (const workspace of deleteList) {
      await deleteWorkspaceFn(itemId, workspace.id)
    }

    if (deleteList.map(w => w.id).includes(selectedWorkspace.id)) {
      const setStateFunction = stateUpdateFunctions[contentType]

      if (setStateFunction) {
        setStateFunction((prevItems: any) =>
          prevItems.filter((prevItem: any) => prevItem.id !== item.id)
        )
      }
    }

    const createList = selectedWorkspaces.filter(
      selectedWorkspace =>
        !startingWorkspaces.some(
          startingWorkspace => startingWorkspace.id === selectedWorkspace.id
        )
    )

    await createWorkspaceFn(
      createList.map(workspace => {
        return {
          user_id: workspace.user_id,
          [itemIdKey]: itemId,
          workspace_id: workspace.id
        } as any
      })
    )
  }

  const updateFunctions = {
    chats: updateChat,
    presets: async (presetId: string, updateState: TablesUpdate<"presets">) => {
      const updatedPreset = await updatePreset(presetId, updateState)

      await handleWorkspaceUpdates(
        startingWorkspaces,
        selectedWorkspaces,
        presetId,
        deletePresetWorkspace,
        createPresetWorkspaces as any,
        "preset_id"
      )

      return updatedPreset
    },
    prompts: async (promptId: string, updateState: TablesUpdate<"prompts">) => {
      const updatedPrompt = await updatePrompt(promptId, updateState)

      await handleWorkspaceUpdates(
        startingWorkspaces,
        selectedWorkspaces,
        promptId,
        deletePromptWorkspace,
        createPromptWorkspaces as any,
        "prompt_id"
      )

      return updatedPrompt
    },
    files: async (fileId: string, updateState: TablesUpdate<"files">) => {
      const updatedFile = await updateFile(fileId, updateState)

      await handleWorkspaceUpdates(
        startingWorkspaces,
        selectedWorkspaces,
        fileId,
        deleteFileWorkspace,
        createFileWorkspaces as any,
        "file_id"
      )

      return updatedFile
    },
    collections: async (
      collectionId: string,
      updateState: TablesUpdate<"assistants">
    ) => {
      if (!profile) return

      const { ...rest } = updateState

      const filesToAdd = selectedCollectionFiles.filter(
        selectedFile =>
          !startingCollectionFiles.some(
            startingFile => startingFile.id === selectedFile.id
          )
      )

      const filesToRemove = startingCollectionFiles.filter(startingFile =>
        selectedCollectionFiles.some(
          selectedFile => selectedFile.id === startingFile.id
        )
      )

      for (const file of filesToAdd) {
        await createCollectionFile({
          user_id: item.user_id,
          collection_id: collectionId,
          file_id: file.id
        })
      }

      for (const file of filesToRemove) {
        await deleteCollectionFile(collectionId, file.id)
      }

      const updatedCollection = await updateCollection(collectionId, rest)

      await handleWorkspaceUpdates(
        startingWorkspaces,
        selectedWorkspaces,
        collectionId,
        deleteCollectionWorkspace,
        createCollectionWorkspaces as any,
        "collection_id"
      )

      return updatedCollection
    },
    assistants: async (
      assistantId: string,
      updateState: {
        assistantId: string
        image: File
      } & TablesUpdate<"assistants">
    ) => {
      const { image, ...rest } = updateState

      const filesToAdd = selectedAssistantFiles.filter(
        selectedFile =>
          !startingAssistantFiles.some(
            startingFile => startingFile.id === selectedFile.id
          )
      )

      const filesToRemove = startingAssistantFiles.filter(startingFile =>
        selectedAssistantFiles.some(
          selectedFile => selectedFile.id === startingFile.id
        )
      )

      for (const file of filesToAdd) {
        await createAssistantFile({
          user_id: item.user_id,
          assistant_id: assistantId,
          file_id: file.id
        })
      }

      for (const file of filesToRemove) {
        await deleteAssistantFile(assistantId, file.id)
      }

      const collectionsToAdd = selectedAssistantCollections.filter(
        selectedCollection =>
          !startingAssistantCollections.some(
            startingCollection =>
              startingCollection.id === selectedCollection.id
          )
      )

      const collectionsToRemove = startingAssistantCollections.filter(
        startingCollection =>
          selectedAssistantCollections.some(
            selectedCollection =>
              selectedCollection.id === startingCollection.id
          )
      )

      for (const collection of collectionsToAdd) {
        await createAssistantCollection({
          user_id: item.user_id,
          assistant_id: assistantId,
          collection_id: collection.id
        })
      }

      for (const collection of collectionsToRemove) {
        await deleteAssistantCollection(assistantId, collection.id)
      }

      const toolsToAdd = selectedAssistantTools.filter(
        selectedTool =>
          !startingAssistantTools.some(
            startingTool => startingTool.id === selectedTool.id
          )
      )

      const toolsToRemove = startingAssistantTools.filter(startingTool =>
        selectedAssistantTools.some(
          selectedTool => selectedTool.id === startingTool.id
        )
      )

      for (const tool of toolsToAdd) {
        await createAssistantTool({
          user_id: item.user_id,
          assistant_id: assistantId,
          tool_id: tool.id
        })
      }

      for (const tool of toolsToRemove) {
        await deleteAssistantTool(assistantId, tool.id)
      }

      let updatedAssistant = await updateAssistant(assistantId, rest)

      if (image) {
        const filePath = await uploadAssistantImage(updatedAssistant, image)

        updatedAssistant = await updateAssistant(assistantId, {
          image_path: filePath
        })

        const url = (await getAssistantImageFromStorage(filePath)) || ""

        if (url) {
          const response = await fetch(url)
          const blob = await response.blob()
          const base64 = await convertBlobToBase64(blob)

          setAssistantImages(prev => [
            ...prev,
            {
              assistantId: updatedAssistant.id,
              path: filePath,
              base64,
              url
            }
          ])
        }
      }

      await handleWorkspaceUpdates(
        startingWorkspaces,
        selectedWorkspaces,
        assistantId,
        deleteAssistantWorkspace,
        createAssistantWorkspaces as any,
        "assistant_id"
      )

      return updatedAssistant
    },
    tools: async (toolId: string, updateState: TablesUpdate<"tools">) => {
      const updatedTool = await updateTool(toolId, updateState)

      await handleWorkspaceUpdates(
        startingWorkspaces,
        selectedWorkspaces,
        toolId,
        deleteToolWorkspace,
        createToolWorkspaces as any,
        "tool_id"
      )

      return updatedTool
    },
    models: async (modelId: string, updateState: TablesUpdate<"models">) => {
      const updatedModel = await updateModel(modelId, updateState)

      await handleWorkspaceUpdates(
        startingWorkspaces,
        selectedWorkspaces,
        modelId,
        deleteModelWorkspace,
        createModelWorkspaces as any,
        "model_id"
      )

      return updatedModel
    }
  }

  const stateUpdateFunctions = {
    chats: setChats,
    presets: setPresets,
    prompts: setPrompts,
    files: setFiles,
    collections: setCollections,
    assistants: setAssistants,
    tools: setTools,
    models: setModels
  }

  const handleUpdate = async () => {
    try {
      const updateFunction = updateFunctions[contentType]
      const setStateFunction = stateUpdateFunctions[contentType]

      if (!updateFunction || !setStateFunction) return
      if (isTyping) return // Prevent update while typing

      const updatedItem = await updateFunction(item.id, updateState)

      setStateFunction((prevItems: any) =>
        prevItems.map((prevItem: any) =>
          prevItem.id === item.id ? updatedItem : prevItem
        )
      )

      setOpen(false)

      toast.success(`${contentType.slice(0, -1)} updated successfully`)
    } catch (error) {
      toast.error(`Error updating ${contentType.slice(0, -1)}. ${error}`)
    }
  }

  const handleSelectWorkspace = (workspace: Tables<"workspaces">) => {
    setSelectedWorkspaces(prevState => {
      const isWorkspaceAlreadySelected = prevState.find(
        selectedWorkspace => selectedWorkspace.id === workspace.id
      )

      if (isWorkspaceAlreadySelected) {
        return prevState.filter(
          selectedWorkspace => selectedWorkspace.id !== workspace.id
        )
      } else {
        return [...prevState, workspace]
      }
    })
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog sx={{ minWidth: "450px" }}>
        <DialogTitle>{`Edit ${contentType.slice(0, -1)}`}</DialogTitle>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            handleUpdate()
          }}
        >
          <Stack spacing={2}>
            {workspaces.length > 1 && (
              <Box sx={{ gap: 1 }}>
                <Typography>Assigned Workspaces</Typography>

                <AssignWorkspaces
                  selectedWorkspaces={selectedWorkspaces}
                  onSelectWorkspace={handleSelectWorkspace}
                />
              </Box>
            )}
            {renderInputs(renderState[contentType])}
            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
            >
              <DeleteItemButton item={item} contentType={contentType} />

              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  justifyContent: "flex-end",
                  gap: 2
                }}
              >
                <Button variant="outlined" onClick={() => setOpen(false)}>
                  Cancel
                </Button>

                <Button ref={buttonRef} onClick={handleUpdate}>
                  Save
                </Button>
              </Box>
            </Box>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  )
}
