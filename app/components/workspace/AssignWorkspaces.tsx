// Source: https://github.com/mckaywrigley/chatbot-ui/blob/main/components/workspace/assign-workspaces.tsx

import { MetadachiContext } from "@/app/lib/context"
import { Tables } from "@/supabase/types"
import React, { FC, useContext } from "react"
import { Select, SelectItem } from "@nextui-org/react"
import { toast } from "sonner"

interface AssignWorkspaces {
  selectedWorkspaces: Tables<"workspaces">[]
  setSelectedWorkspaces: (workspace: Tables<"workspaces">[]) => void
}

export const AssignWorkspaces: FC<AssignWorkspaces> = ({
  selectedWorkspaces,
  setSelectedWorkspaces
}) => {
  const { workspaces } = useContext(MetadachiContext)

  const selectedWorkspaceIds = workspaces
    .filter(workspace =>
      selectedWorkspaces.map(w => w.id).includes(workspace.id)
    )
    .map(workspace => workspace.id)

  return (
    <Select
      isRequired
      selectionMode="multiple"
      label="Workspaces"
      labelPlacement="outside"
      placeholder={`Search workspaces...`}
      selectedKeys={selectedWorkspaceIds}
      onSelectionChange={ids => {
        const selected = workspaces.filter(workspace =>
          Array.from(ids).includes(workspace.id)
        )

        if (selected.length === 0) {
          toast.warning("You must select at least one workspace")
        } else {
          setSelectedWorkspaces(selected)
        }
      }}
    >
      {workspaces.map(workspace => (
        <SelectItem key={workspace.id} value={workspace.name}>
          {workspace.name}
        </SelectItem>
      ))}
    </Select>
  )
}
