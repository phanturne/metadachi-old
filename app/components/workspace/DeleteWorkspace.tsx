import { useChatHandler } from "@/app/lib/hooks/use-chat-handler"
import { MetadachiContext } from "@/app/lib/context"
import { deleteWorkspace } from "@/app/lib/db/workspaces"
import { Tables } from "@/supabase/types"
import React, { FC, useContext, useState } from "react"
import { DeleteRounded } from "@mui/icons-material"
import {
  Box,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Input,
  Modal,
  ModalDialog,
  Stack,
  Typography
} from "@mui/joy"
import Button from "@mui/joy/Button"

interface DeleteWorkspaceProps {
  workspace: Tables<"workspaces">
  onDelete?: () => void
}

export const DeleteWorkspace: FC<DeleteWorkspaceProps> = ({
  workspace,
  onDelete
}) => {
  const { setWorkspaces, setSelectedWorkspace } = useContext(MetadachiContext)
  const { handleNewChat } = useChatHandler()

  const [open, setOpen] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [name, setName] = useState("")

  const handleDeleteWorkspace = async () => {
    if (name !== workspace.name) {
      setHasError(true)
      return
    }

    await deleteWorkspace(workspace.id)

    setWorkspaces(prevWorkspaces => {
      const filteredWorkspaces = prevWorkspaces.filter(
        w => w.id !== workspace.id
      )

      setSelectedWorkspace(filteredWorkspaces[0])

      return filteredWorkspaces
    })

    setOpen(false)
    onDelete?.()

    handleNewChat()
  }

  return (
    <>
      <Button
        variant="plain"
        color="danger"
        onClick={() => setOpen(true)}
        startDecorator={<DeleteRounded />}
      >
        Delete Workspace
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog sx={{ minWidth: "450px", overflow: "scroll" }}>
          <DialogTitle>{`Delete "${workspace.name}"`}</DialogTitle>
          <DialogContent>
            <Typography color="warning">
              WARNING: Deleting a workspace will delete all of its data.
            </Typography>
          </DialogContent>

          <FormControl error={hasError}>
            <Input
              className="mt-4"
              placeholder="Type the name of this workspace to confirm"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            {hasError && (
              <FormHelperText>
                The name you entered does not match the workspace name.
              </FormHelperText>
            )}
          </FormControl>

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
              <Button color="danger" onClick={handleDeleteWorkspace}>
                Delete
              </Button>
            </Box>
          </Stack>
        </ModalDialog>
      </Modal>
    </>
  )
}
