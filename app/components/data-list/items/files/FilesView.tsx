import { Box, Button } from "@mui/joy"
import { ArrowBackRounded } from "@mui/icons-material"
import { FC } from "react"
import { ContentType } from "@/app/lib/types"
import { DataListContent } from "@/app/components/data-list/DataListContent"

interface FilesViewProps {
  contentType: ContentType
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>) => void
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  currentFolder: string | null
  handleFolderClick: (folderId: string | null) => void
  displayedFiles: any[]
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void
}

export const FilesView: FC<FilesViewProps> = ({
  contentType,
  handleDrop,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  currentFolder,
  handleFolderClick,
  displayedFiles,
  handleDragStart
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        width: "100%",
        overflow: "auto"
      }}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      {currentFolder && (
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<ArrowBackRounded />}
          onClick={() => handleFolderClick(null)}
          sx={{ mb: 1, width: 100 }}
        >
          Back
        </Button>
      )}
      {displayedFiles.map(item => {
        return (
          <Box
            key={item.id}
            draggable="true"
            onDragStart={e => handleDragStart(e, item.id)}
          >
            <DataListContent contentType={contentType} item={item} />
          </Box>
        )
      })}
    </Box>
  )
}
