// Source: https://github.com/mckaywrigley/chatbot-ui/blob/main/components/utility/workspace-switcher.tsx

"use client"

import { MetadachiContext } from "@/app/lib/context"
import { createWorkspace } from "@/app/lib/db/workspaces"
import * as React from "react"
import { useContext } from "react"
import { toast } from "sonner"
import { useAuthModal } from "@/app/lib/providers/AuthContextProvider"
import { Button } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

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
    <Button
      variant="light"
      size="sm"
      onClick={handleCreateWorkspace}
      startContent={<Icon icon="solar:add-circle-linear" className="text-xl" />}
      // disabled={!profile && !selectedWorkspace}
    >
      Create Workspace
    </Button>
  )
}
