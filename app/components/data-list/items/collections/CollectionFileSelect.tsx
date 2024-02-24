import { MetadachiContext } from "@/app/lib/context"
import { CollectionFile } from "@/app/lib/types"
import { FC, useContext } from "react"
import { FileIcon } from "@/app/components/files/file-icon"
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
          <FileIcon type={option.type} size={24} />
          {option.name}
        </AutocompleteOption>
      )}
    />
  )
}
