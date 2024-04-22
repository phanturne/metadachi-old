import { FC } from "react"
import { Tables } from "@/supabase/types"
import { ContentType } from "@/app/lib/types"
import { FolderItem } from "@/app/components/data-list/shared/FolderItem"
import { DataListItem } from "@/app/components/data-list/DataListItem"
import { Divider } from "@nextui-org/react"

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
          <div className="flex flex-wrap">
            {folders.map(folder => (
              <div
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
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
              </div>
            ))}
          </div>
        ))}
      <Divider className="mb-4 mt-2" />
    </>
  )
}

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

const FolderData: FC<FolderDataProps> = ({
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
          <div
            key={item.id}
            draggable={true}
            onDragStart={e => onDragStart(e, item.id)}
          >
            <DataListItem contentType={contentType} item={item} />
          </div>
        ))}
    </FolderItem>
  )
}
