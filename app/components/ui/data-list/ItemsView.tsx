// Source: https://github.com/mckaywrigley/chatbot-ui/blob/main/components/sidebar/items/folders/folder-item.tsx

import { FC } from "react"
import { ContentType } from "@/app/lib/types"
import { DataListItemWrapper } from "@/app/components/ui/data-list/DataListItemWrapper"
import { Button } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

interface ItemsViewProps {
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

export const ItemsView: FC<ItemsViewProps> = ({
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
    <div
      className="flex w-full grow flex-col overflow-auto"
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      {currentFolder && (
        <Button
          variant="bordered"
          startContent={
            <Icon icon="solar:arrow-left-linear" className="text-2xl" />
          }
          onClick={() => handleFolderClick(null)}
          className="mb-2 w-24"
        >
          Back
        </Button>
      )}
      {displayedFiles.map(item => {
        return (
          <div
            key={item.id}
            draggable="true"
            onDragStart={e => handleDragStart(e, item.id)}
          >
            <DataListItemWrapper contentType={contentType} item={item} />
          </div>
        )
      })}
    </div>
  )
}
