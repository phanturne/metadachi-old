"use client"

import { ChatbotUIContext } from "@/context/context"
import { createWorkspace } from "@/db/workspaces"
import * as React from "react"
import { useContext } from "react"
import { IconButton } from "@mui/joy"
import { AddCircleOutlineRounded } from "@mui/icons-material"

export const CreateWorkspaceButton = () => {
  const { workspaces, selectedWorkspace, setSelectedWorkspace, setWorkspaces } =
    useContext(ChatbotUIContext)

  const handleCreateWorkspace = async () => {
    if (!selectedWorkspace) return

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
    <IconButton size="sm" onClick={handleCreateWorkspace}>
      <AddCircleOutlineRounded />
    </IconButton>
  )
}
