import { cn } from "@/app/lib/utils"
import { Tables } from "@/supabase/types"
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react"
import { FC, useRef, useState } from "react"
import { UpdateFolder } from "./update-folder"
import { FolderRounded } from "@mui/icons-material"
import { Box, Typography } from "@mui/joy"
import * as React from "react"
import { DeleteFolder } from "@/app/components/data-list/items/folders/delete-folder"
import { ContentType } from "@/app/lib/types"

interface FolderProps {
  folder: Tables<"folders">
  contentType: ContentType
  children: React.ReactNode
  onUpdateFolder: (itemId: string, folderId: string | null) => void
  variant: "basic" | "expandable"
  onClick: any
}

export const Folder: FC<FolderProps> = ({
  folder,
  contentType,
  children,
  onUpdateFolder,
  variant,
  onClick
}) => {
  const itemRef = useRef<HTMLDivElement>(null)

  const [isDragOver, setIsDragOver] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    setIsDragOver(false)
    const itemId = e.dataTransfer.getData("text/plain")
    onUpdateFolder(itemId, folder.id)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.stopPropagation()
      itemRef.current?.click()
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) onClick()
    if (variant === "expandable") {
      setIsExpanded(!isExpanded)
    }
  }

  const ExpandFolderButton = () => {
    return (
      <>
        {isExpanded ? (
          <IconChevronDown stroke={3} />
        ) : (
          <IconChevronRight stroke={3} />
        )}
      </>
    )
  }

  return (
    <Box
      ref={itemRef}
      id="folder"
      className={cn("rounded focus:outline-none", isDragOver && "bg-accent")}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Box
        tabIndex={0}
        onClick={handleClick}
        sx={{
          "&:hover": {
            backgroundColor: "accent",
            opacity: 0.5
          },
          "&:focus": {
            backgroundColor: "accent",
            outline: "none"
          },
          display: "flex",
          width: "full",
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 2,
          padding: 2
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              overflow: "hidden"
            }}
          >
            {variant === "expandable" ? (
              <ExpandFolderButton />
            ) : (
              <FolderRounded />
            )}
            <Typography noWrap>{folder.name}</Typography>
          </Box>

          {isHovering && (
            <Box
              onClick={e => {
                e.stopPropagation()
                e.preventDefault()
              }}
              sx={{ marginLeft: 2, display: "flex", gap: 2, flexShrink: 0 }}
            >
              <UpdateFolder folder={folder} />
              <DeleteFolder folder={folder} contentType={contentType} />
            </Box>
          )}
        </Box>
      </Box>

      {isExpanded && (
        <Box
          sx={{
            marginLeft: 5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderLeft: "2px solid",
            paddingLeft: 4
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  )
}
