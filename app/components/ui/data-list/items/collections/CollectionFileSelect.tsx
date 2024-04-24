import { MetadachiContext } from "@/app/lib/context"
import { CollectionFile } from "@/app/lib/types"
import { FC, useContext } from "react"
import { FileIcons } from "@/app/components/icons/FileIcons"
import { Autocomplete, AutocompleteOption } from "@mui/joy"

interface CollectionFileSelectProps {
  selectedCollectionFiles: CollectionFile[]
  setSelectedCollectionFiles: (files: CollectionFile[]) => void
}

export const CollectionFileSelect: FC<CollectionFileSelectProps> = ({
  selectedCollectionFiles,
  setSelectedCollectionFiles
}) => {
  const { files } = useContext(MetadachiContext)

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      placeholder={`Search files...`}
      value={selectedCollectionFiles}
      onChange={(_, newValue) => {
        setSelectedCollectionFiles(newValue)
      }}
      options={files}
      getOptionLabel={item => item.name}
      limitTags={1}
      renderOption={(props, option) => (
        <AutocompleteOption {...props}>
          <FileIcons type={option.type} className="text-2xl" />
          {option.name}
        </AutocompleteOption>
      )}
    />
  )
}
