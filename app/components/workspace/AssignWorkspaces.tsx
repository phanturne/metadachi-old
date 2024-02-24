import { MetadachiContext } from "@/app/lib/context"
import { Tables } from "@/supabase/types"
import { FC, useContext } from "react"
import { Autocomplete } from "@mui/joy"
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

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      placeholder={`Search workspaces...`}
      value={workspaces.filter(workspace =>
        selectedWorkspaces.map(w => w.id).includes(workspace.id)
      )}
      onChange={(_, newValue) => {
        if (newValue.length === 0) {
          toast.warning("You must select at least one workspace")
        } else {
          setSelectedWorkspaces(newValue)
        }
      }}
      options={workspaces}
      getOptionLabel={workspace => workspace.name}
      limitTags={1}
    />
  )
}
