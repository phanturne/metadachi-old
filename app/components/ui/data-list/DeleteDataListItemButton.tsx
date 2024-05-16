// Source: https://github.com/mckaywrigley/chatbot-ui/blob/main/components/sidebar/items/all/sidebar-delete-item.tsx

import { MetadachiContext } from "@/app/lib/context"
import { deleteAssistant } from "@/app/lib/db/assistants"
import { deleteChat } from "@/app/lib/db/chats"
import { deleteCollection } from "@/app/lib/db/collections"
import { deleteFile } from "@/app/lib/db/files"
import { deleteModel } from "@/app/lib/db/models"
import { deletePreset } from "@/app/lib/db/presets"
import { deletePrompt } from "@/app/lib/db/prompts"
import { deleteFileFromStorage } from "@/app/lib/db/storage/files"
import { deleteTool } from "@/app/lib/db/tools"
import { Tables } from "@/supabase/types"
import { ContentType, DataItemType } from "@/app/lib/types"
import * as React from "react"
import { FC, useContext, useState } from "react"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

interface DeleteDataListItemButton {
  item: DataItemType
  contentType: ContentType
}

export const DeleteDataListItemButton: FC<DeleteDataListItemButton> = ({
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
  } = useContext(MetadachiContext)

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
      <Button
        color="danger"
        variant="light"
        onClick={() => setOpen(true)}
        startContent={
          <Icon icon="solar:trash-bin-trash-linear" className="text-2xl" />
        }
      >
        Delete
      </Button>
      <Modal isOpen={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader>Delete {contentType.slice(0, -1)}</ModalHeader>
          <ModalBody>
            <p> Are you sure you want to delete {item.name}?</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button color="danger" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
