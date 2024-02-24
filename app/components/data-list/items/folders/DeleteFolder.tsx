import { MetadachiContext } from "@/app/lib/context"
import { deleteFolder } from "@/app/lib/db/folders"
import { supabase } from "@/app/lib/supabase/browser-client"
import { Tables } from "@/supabase/types"
import { ContentType } from "@/app/lib/types"
import React, { FC, useContext, useState } from "react"
import { toast } from "sonner"
import { DeleteRounded } from "@mui/icons-material"
import {
  Box,
  DialogContent,
  DialogTitle,
  IconButton,
  Modal,
  ModalDialog,
  Stack
} from "@mui/joy"
import Button from "@mui/joy/Button"

interface DeleteFolderProps {
  folder: Tables<"folders">
  contentType: ContentType
}

export const DeleteFolder: FC<DeleteFolderProps> = ({
  folder,
  contentType
}) => {
  const {
    setChats,
    setFolders,
    setPresets,
    setPrompts,
    setFiles,
    setCollections,
    setAssistants,
    setTools,
    setModels
  } = useContext(MetadachiContext)

  const [open, setOpen] = useState(false)

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

  const handleDeleteFolderOnly = async () => {
    await deleteFolder(folder.id)

    setFolders(prevState => prevState.filter(c => c.id !== folder.id))

    setOpen(false)

    const setStateFunction = stateUpdateFunctions[contentType]

    if (!setStateFunction) return

    setStateFunction((prevItems: any) =>
      prevItems.map((item: any) => {
        if (item.folder_id === folder.id) {
          return {
            ...item,
            folder_id: null
          }
        }

        return item
      })
    )
  }

  const handleDeleteFolderAndItems = async () => {
    const setStateFunction = stateUpdateFunctions[contentType]

    if (!setStateFunction) return

    const { error } = await supabase
      .from(contentType)
      .delete()
      .eq("folder_id", folder.id)

    if (error) {
      toast.error(error.message)
    }

    setStateFunction((prevItems: any) =>
      prevItems.filter((item: any) => item.folder_id !== folder.id)
    )

    handleDeleteFolderOnly()
  }

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        size="sm"
        sx={{ "&:hover": { backgroundColor: "transparent" }, ml: -1 }}
      >
        <DeleteRounded />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog sx={{ minWidth: "550px" }}>
          <DialogTitle>{`Delete "${folder.name}"`}</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this folder?
          </DialogContent>
          <Stack spacing={2}>
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "flex-end",
                gap: 2
              }}
            >
              <Button
                variant="plain"
                color="neutral"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button color="danger" onClick={handleDeleteFolderAndItems}>
                Delete Folder & Included Items
              </Button>

              <Button color="danger" onClick={handleDeleteFolderOnly}>
                Delete Folder Only
              </Button>
            </Box>
          </Stack>
        </ModalDialog>
      </Modal>
    </>
  )
}
