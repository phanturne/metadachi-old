import { MetadachiContext } from "@/app/lib/context"
import { Tables } from "@/supabase/types"
import { FC, useContext } from "react"
import { Autocomplete, AutocompleteOption } from "@mui/joy"
import { ArticleRounded, LibraryBooksRounded } from "@mui/icons-material"

interface AssistantRetrievalSelectProps {
  selectedAssistantRetrievalItems: Tables<"files">[] | Tables<"collections">[]
  setSelectedAssistantRetrievalItems: (
    _: (Tables<"files"> | Tables<"collections">)[]
  ) => void
}

export const AssistantRetrievalSelect: FC<AssistantRetrievalSelectProps> = ({
  selectedAssistantRetrievalItems,
  setSelectedAssistantRetrievalItems
}) => {
  const { files, collections } = useContext(MetadachiContext)

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      placeholder={`Search collections/files...`}
      value={
        (files || collections)?.filter(item =>
          selectedAssistantRetrievalItems.map(i => i.id).includes(item.id)
        ) as (Tables<"files"> | Tables<"collections">)[]
      }
      onChange={(_, newValue) => {
        setSelectedAssistantRetrievalItems(newValue)
      }}
      options={files || collections}
      getOptionLabel={item => item.name}
      limitTags={1}
      groupBy={option => ("type" in option ? "Files" : "Collections")}
      renderOption={(props, option) => (
        <AutocompleteOption {...props}>
          {"type" in option ? <ArticleRounded /> : <LibraryBooksRounded />}
          {option.name}
        </AutocompleteOption>
      )}
    />
  )
}
