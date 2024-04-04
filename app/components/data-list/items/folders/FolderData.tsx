import { FolderItem } from "@/app/components/data-list/items/folders/FolderItem"
import { DataListItem } from "@/app/components/data-list/DataListItem"
import { Tables } from "@/supabase/types"
import { ContentType } from "@/app/lib/types"
import { FC } from "react"
import { Box } from "@mui/joy"

interface FolderDataProps {
  key: string
  folder: Tables<"folders">
  contentType: ContentType
  onUpdateFolder: (itemId: string, folderId: string | null) => void
  variant: "grid" | "list"
  onClick: (folderId: string | null) => void
  dataWithFolders: any[]
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void
}

export const FolderData: FC<FolderDataProps> = ({
  key,
  folder,
  contentType,
  onUpdateFolder,
  variant,
  onClick,
  dataWithFolders,
  onDragStart
}) => {
  return (
    <FolderItem
      key={key}
      folder={folder}
      contentType={contentType}
      onUpdateFolder={onUpdateFolder}
      variant={variant === "list" ? "expandable" : "basic"}
      onClick={variant === "grid" ? () => onClick(folder.id) : undefined}
    >
      {dataWithFolders
        .filter(item => item.folder_id === folder.id)
        .map(item => (
          <Box
            key={item.id}
            draggable={true}
            onDragStart={e => onDragStart(e, item.id)}
          >
            <DataListItem contentType={contentType} item={item} />
          </Box>
        ))}
    </FolderItem>
  )
}
