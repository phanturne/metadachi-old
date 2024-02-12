import { ChatbotUIContext } from "@/context/context"
import { deleteAssistant } from "@/db/assistants"
import { deleteChat } from "@/db/chats"
import { deleteCollection } from "@/db/collections"
import { deleteFile } from "@/db/files"
import { deleteModel } from "@/db/models"
import { deletePreset } from "@/db/presets"
import { deletePrompt } from "@/db/prompts"
import { deleteFileFromStorage } from "@/db/storage/files"
import { deleteTool } from "@/db/tools"
import { Tables } from "@/supabase/types"
import { ContentType, DataItemType } from "@/types"
import { FC, useContext, useState } from "react"
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Modal,
  ModalDialog
} from "@mui/joy"

interface SidebarDeleteItemProps {
  item: DataItemType
  contentType: ContentType
}

export const DeleteItemButton: FC<SidebarDeleteItemProps> = ({
  item,
  contentType
}) => {
  const {
    setChats,
    setPresets,
    setPrompts,
    setFiles,
    setCollections,
    setAssistants,
    setTools,
    setModels
  } = useContext(ChatbotUIContext)

  const [open, setOpen] = useState(false)

  const deleteFunctions = {
    chats: async (chat: Tables<"chats">) => {
      await deleteChat(chat.id)
    },
    presets: async (preset: Tables<"presets">) => {
      await deletePreset(preset.id)
    },
    prompts: async (prompt: Tables<"prompts">) => {
      await deletePrompt(prompt.id)
    },
    files: async (file: Tables<"files">) => {
      await deleteFileFromStorage(file.file_path)
      await deleteFile(file.id)
    },
    collections: async (collection: Tables<"collections">) => {
      await deleteCollection(collection.id)
    },
    assistants: async (assistant: Tables<"assistants">) => {
      await deleteAssistant(assistant.id)
      setChats(prevState =>
        prevState.filter(chat => chat.assistant_id !== assistant.id)
      )
    },
    tools: async (tool: Tables<"tools">) => {
      await deleteTool(tool.id)
    },
    models: async (model: Tables<"models">) => {
      await deleteModel(model.id)
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

  const handleDelete = async () => {
    const deleteFunction = deleteFunctions[contentType]
    const setStateFunction = stateUpdateFunctions[contentType]

    if (!deleteFunction || !setStateFunction) return

    await deleteFunction(item as any)

    setStateFunction((prevItems: any) =>
      prevItems.filter((prevItem: any) => prevItem.id !== item.id)
    )

    setOpen(false)
  }

  return (
    <>
      <Button color="danger" onClick={() => setOpen(true)} variant="plain">
        Delete
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Delete {contentType.slice(0, -1)}</DialogTitle>
          <DialogContent>
            Are you sure you want to delete {item.name}?
          </DialogContent>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between"
            }}
          >
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button color="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  )
}
