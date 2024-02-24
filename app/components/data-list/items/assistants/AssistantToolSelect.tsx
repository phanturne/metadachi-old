import { MetadachiContext } from "@/app/lib/context"
import { Tables } from "@/supabase/types"
import { FC, useContext } from "react"
import { Autocomplete, AutocompleteOption } from "@mui/joy"
import { BuildRounded } from "@mui/icons-material"

interface AssistantToolSelectProps {
  disabled?: boolean
  selectedAssistantTools: Tables<"tools">[]
  setSelectedAssistantTools: (tool: Tables<"tools">[]) => void
}

export const AssistantToolSelect: FC<AssistantToolSelectProps> = ({
  disabled,
  selectedAssistantTools,
  setSelectedAssistantTools
}) => {
  const { tools } = useContext(MetadachiContext)

  return (
    <Autocomplete
      disabled={disabled}
      multiple
      disableCloseOnSelect
      placeholder={`Search tools...`}
      value={tools.filter(tool =>
        selectedAssistantTools.map(t => t.id).includes(tool.id)
      )}
      onChange={(_, newValue) => {
        setSelectedAssistantTools(newValue)
      }}
      options={tools}
      getOptionLabel={item => item.name}
      limitTags={1}
      renderOption={(props, option) => (
        <AutocompleteOption {...props}>
          <BuildRounded />
          {option.name}
        </AutocompleteOption>
      )}
    />
  )
}
