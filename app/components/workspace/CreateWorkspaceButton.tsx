"use client"

import { MetadachiContext } from "@/app/lib/context"
import { createWorkspace } from "@/app/lib/db/workspaces"
import * as React from "react"
import { useContext } from "react"
import { IconButton, Tooltip } from "@mui/joy"
import { AddCircleOutlineRounded } from "@mui/icons-material"
import { toast } from "sonner"
import { useAuthModal } from "@/app/lib/providers/AuthContextProvider"

export const CreateWorkspaceButton = () => {
  const {
    profile,
    workspaces,
    selectedWorkspace,
    setSelectedWorkspace,
    setWorkspaces
  } = useContext(MetadachiContext)

  const { openAuthModal } = useAuthModal()

  const handleCreateWorkspace = async () => {
    if (!profile) {
      openAuthModal()
      return toast.error("You must be logged in to create a workspace.")
    }

    if (!selectedWorkspace) {
      return toast.error("No workspace selected.")
    }

    const createdWorkspace = await createWorkspace({
      user_id: selectedWorkspace.user_id,
      default_context_length: selectedWorkspace.default_context_length,
      default_model: selectedWorkspace.default_model,
      default_prompt: selectedWorkspace.default_prompt,
      default_temperature: selectedWorkspace.default_temperature,
      description: "",
      embeddings_provider: "openai",
      include_profile_context: selectedWorkspace.include_profile_context,
      include_workspace_instructions:
        selectedWorkspace.include_workspace_instructions,
      instructions: selectedWorkspace.instructions,
      is_home: false,
      name: "New Workspace"
    })

    setWorkspaces([...workspaces, createdWorkspace])
    setSelectedWorkspace(createdWorkspace)
  }

  return (
    <Tooltip
      placement="right"
      variant="outlined"
      title="Create a new workspace"
    >
      <IconButton
        size="sm"
        onClick={handleCreateWorkspace}
        // disabled={!profile && !selectedWorkspace}
      >
        <AddCircleOutlineRounded />
      </IconButton>
    </Tooltip>
  )
}
