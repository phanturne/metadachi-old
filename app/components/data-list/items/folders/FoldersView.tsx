import { FC } from "react"
import { Grid } from "@mui/joy"
import { FolderData } from "@/app/components/data-list/items/folders/FolderData"
import { Tables } from "@/supabase/types"
import { ContentType } from "@/app/lib/types"
import Divider from "@mui/joy/Divider"

interface FoldersViewProps {
  contentType: ContentType
  currentFolder: string | null
  variant: "list" | "grid"
  folders: Tables<"folders">[]
  handleFolderClick: (folderId: string | null) => void
  dataWithFolders: any[]
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void
}

export const FoldersView: FC<FoldersViewProps> = ({
  contentType,
  currentFolder,
  variant,
  folders,
  handleFolderClick,
  dataWithFolders,
  handleDragStart
}) => {
  return (
    <>
      {currentFolder === null &&
        (variant === "list" ? (
          folders.map(folder => (
            <FolderData
              contentType={contentType}
              key={folder.id}
              folder={folder}
              onUpdateFolder={handleFolderClick}
              variant={variant}
              onClick={handleFolderClick}
              dataWithFolders={dataWithFolders}
              onDragStart={handleDragStart}
            />
          ))
        ) : (
          <Grid container columns={12}>
            {folders.map(folder => (
              <Grid
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                key={`grid-folder-${folder.id}`}
              >
                <FolderData
                  contentType={contentType}
                  key={folder.id}
                  folder={folder}
                  onUpdateFolder={handleFolderClick}
                  variant={variant}
                  onClick={handleFolderClick}
                  dataWithFolders={dataWithFolders}
                  onDragStart={handleDragStart}
                />
              </Grid>
            ))}
          </Grid>
        ))}
      <Divider />
    </>
  )
}
