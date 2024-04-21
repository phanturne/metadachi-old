import { useChatHandler } from "@/app/lib/hooks/use-chat-handler"
import { MetadachiContext } from "@/app/lib/context"
import { deleteWorkspace } from "@/app/lib/db/workspaces"
import { Tables } from "@/supabase/types"
import React, { FC, useContext, useState } from "react"
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

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

  const handleModalClose = () => {
    // Clear the inputs
    setName("")
    setHasError(false)

    // Close the modal
    setOpen(false)
  }

  const handleDeleteWorkspace = async (event: React.FormEvent) => {
    event.preventDefault()

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
        variant="flat"
        color="danger"
        onClick={() => setOpen(true)}
        startContent={
          <Icon icon="solar:trash-bin-2-linear" className="text-base" />
        }
      >
        Delete Workspace
      </Button>
      <Modal isOpen={open} onOpenChange={handleModalClose}>
        <ModalContent>
          <ModalHeader>{`Delete "${workspace.name}"`}</ModalHeader>

          <form onSubmit={handleDeleteWorkspace}>
            <ModalBody>
              <p className="text-sm text-warning">
                WARNING: Deleting a workspace will delete all of its data.
              </p>
              <Input
                isRequired
                label="Workspace Name"
                labelPlacement="outside"
                placeholder="Type the name of this workspace to confirm"
                value={name}
                onValueChange={setName}
                isInvalid={hasError}
                errorMessage={
                  hasError
                    ? "The name you entered does not match the workspace name."
                    : undefined
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onClick={() => setOpen(false)}>
                Cancel
              </Button>

              <Button color="danger" type="submit">
                Delete
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
