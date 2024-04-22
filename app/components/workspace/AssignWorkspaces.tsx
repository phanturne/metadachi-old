import { MetadachiContext } from "@/app/lib/context"
import { Tables } from "@/supabase/types"
import React, { FC, useContext } from "react"
import { Autocomplete, AutocompleteItem } from "@nextui-org/react"

interface AssignWorkspaces {
  selectedWorkspaces: Tables<"workspaces">[]
  setSelectedWorkspaces: (workspace: Tables<"workspaces">[]) => void
}

// TODO: Setting the workspace seems to be broken
export const AssignWorkspaces: FC<AssignWorkspaces> = ({
  selectedWorkspaces,
  setSelectedWorkspaces
}) => {
  const { workspaces } = useContext(MetadachiContext)

  // const selectedWorkspaces = workspaces.filter(workspace =>
  //   selectedWorkspaces.map(w => w.id).includes(workspace.id)
  // )

  const selectedWorkspaceIds = selectedWorkspaces.map(workspace => workspace.id)

  // NextUI's Autocomplete component doesn't support multiple selection

  return (
    <Autocomplete
      required
      label="Workspaces"
      labelPlacement="outside"
      placeholder={`Search workspaces...`}
      defaultSelectedKey={workspaces.length > 0 ? workspaces[0]?.id : ""}
      defaultItems={selectedWorkspaces}
      value={workspaces.length > 0 ? workspaces[0]?.id : ""}
      onSelectionChange={id => {
        console.log(selectedWorkspaces)
        const selectedWorkspace = workspaces.find(
          workspace => workspace.id === id
        )

        if (selectedWorkspace) {
          setSelectedWorkspaces([selectedWorkspace])
          console.log("set", selectedWorkspace)
        } else {
          console.log("not set")
          setSelectedWorkspaces([])
        }

        // if (newValue.length === 0) {
        //   toast.warning("You must select at least one workspace")
        // } else {
        //   setSelectedWorkspaces(newValue)
        // }
      }}
    >
      {workspaces.map(workspace => (
        <AutocompleteItem key={workspace.id} textValue={workspace.name}>
          {workspace.name}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  )
}
