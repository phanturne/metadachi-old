// Source: https://github.com/mckaywrigley/chatbot-ui/blob/605f8e4daf445fa945ea4374e88e9fab8d287439/components/utility/workspace-switcher.tsx#L4

"use client"

import { useChatHandler } from "@/app/lib/hooks/use-chat-handler"
import { MetadachiContext } from "@/app/lib/context"
import { createWorkspace } from "@/app/lib/db/workspaces"
import { useRouter } from "next/navigation"
import React, { FC, useContext } from "react"
import { Avatar, Select, SelectItem } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

interface WorkspaceSwitcherProps {}

export const WorkspaceSwitcher: FC<WorkspaceSwitcherProps> = ({}) => {
  const {
    workspaces,
    workspaceImages,
    selectedWorkspace,
    setSelectedWorkspace,
    setWorkspaces
  } = useContext(MetadachiContext)

  const { handleNewChat } = useChatHandler()

  const router = useRouter()

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

    return router.push(`/chat`)
  }

  const handleSelect = (workspaceId: string) => {
    const workspace = workspaces.find(workspace => workspace.id === workspaceId)

    if (!workspace) return

    setSelectedWorkspace(workspace)

    return router.push(`/chat`)
  }

  const workspaceImage =
    workspaceImages.find(image => image.path === selectedWorkspace?.image_path)
      ?.base64 || ""

  const selectedWorkspaceList = selectedWorkspace ? [selectedWorkspace.id] : []

  return (
    <Select
      variant="bordered"
      placeholder={`Select a workspace...`}
      selectedKeys={selectedWorkspaceList}
      onSelectionChange={ids => {
        handleSelect(Array.from(ids)?.[0] as string)
      }}
      startContent={
        <>
          {workspaceImage ? (
            <Avatar
              size="sm"
              classNames={{ base: "h-7 w-7 shrink-0" }}
              showFallback
              name={selectedWorkspace?.name}
              src={workspaceImage}
            />
          ) : selectedWorkspace?.is_home ? (
            <Icon icon="solar:home-2-bold-duotone" className="text-2xl" />
          ) : (
            <Icon
              icon="solar:box-minimalistic-bold-duotone"
              className="text-2xl"
            />
          )}
        </>
      }
    >
      {workspaces.map(item => {
        const image =
          workspaceImages.find(image => image.path === item.image_path)
            ?.base64 || ""

        return (
          <SelectItem key={item.id} value={item.name} textValue={item.name}>
            <div className="flex items-center gap-2">
              {image ? (
                <Avatar
                  size="sm"
                  classNames={{ base: "h-7 w-7 shrink-0" }}
                  showFallback
                  name={item.name}
                  src={image}
                />
              ) : item?.is_home ? (
                <Icon icon="solar:home-2-bold-duotone" className="text-2xl" />
              ) : (
                <Icon
                  icon="solar:box-minimalistic-bold-duotone"
                  className="text-2xl"
                />
              )}
              {item.name}
            </div>
          </SelectItem>
        )
      })}
    </Select>
  )
}
