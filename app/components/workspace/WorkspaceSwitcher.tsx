// Source: https://github.com/mckaywrigley/chatbot-ui/blob/605f8e4daf445fa945ea4374e88e9fab8d287439/components/utility/workspace-switcher.tsx#L4

"use client"

import { MetadachiContext } from "@/app/lib/context"
import { useRouter } from "next/navigation"
import React, { FC, useContext } from "react"
import {
  Avatar,
  Divider,
  Select,
  SelectItem,
  SelectSection
} from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"
import { CreateWorkspaceButton } from "@/app/components/workspace/CreateWorkspaceButton"

interface WorkspaceSwitcherProps {}

export const WorkspaceSwitcher: FC<WorkspaceSwitcherProps> = ({}) => {
  const {
    workspaces,
    workspaceImages,
    selectedWorkspace,
    setSelectedWorkspace
  } = useContext(MetadachiContext)

  const router = useRouter()

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
              icon="solar:notes-minimalistic-bold-duotone"
              className="text-2xl"
            />
          )}
        </>
      }
    >
      <SelectSection showDivider>
        <SelectItem
          key="create-workspace"
          value="Create Workspace"
          textValue="Create Workspace"
          onClick={e => e.stopPropagation()}
        >
          <CreateWorkspaceButton />
        </SelectItem>
      </SelectSection>

      {
        workspaces.map(item => {
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
                    icon="solar:notes-minimalistic-bold-duotone"
                    className="text-2xl"
                  />
                )}
                {item.name}
              </div>
            </SelectItem>
          )
        }) as any
      }
    </Select>
  )
}
