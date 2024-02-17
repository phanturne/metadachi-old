import { MetadachiContext } from "@/app/lib/context"
import { updateAssistant } from "@/app/lib/db/assistants"
import { updateChat } from "@/app/lib/db/chats"
import { updateCollection } from "@/app/lib/db/collections"
import { updateFile } from "@/app/lib/db/files"
import { updatePreset } from "@/app/lib/db/presets"
import { updatePrompt } from "@/app/lib/db/prompts"
import { updateTool } from "@/app/lib/db/tools"
import { Tables } from "@/supabase/types"
import { ContentType, DataListType } from "@/app/lib/types"
import { FC, useContext, useEffect, useRef, useState } from "react"
import { Box, Typography } from "@mui/joy"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { updateModel } from "@/app/lib/db/models"
import { FilesView } from "@/app/components/data-list/items/files/FilesView"
import { ChatsView } from "@/app/components/data-list/items/chat/ChatsView"
import { FoldersView } from "@/app/components/data-list/items/folders/FoldersView"

interface DataList {
  contentType: ContentType
  data: DataListType
  folders: Tables<"folders">[]
  variant?: "list" | "grid"
}

export const DataList: FC<DataList> = ({
  contentType,
  data,
  folders,
  variant = "list"
}) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const chatId = searchParams.get("id")
  const chatSearchParam = chatId ? `id=${chatId}&` : ""
  const tab = searchParams.get("tab")
  const tabSearchParam = tab ? `tab=${tab}&` : ""

  const {
    setChats,
    setPresets,
    setPrompts,
    setFiles,
    setCollections,
    setAssistants,
    setTools,
    setModels
  } = useContext(MetadachiContext)

  const divRef = useRef<HTMLDivElement>(null)

  const [isOverflowing, setIsOverflowing] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  const updateFunctions = {
    chats: updateChat,
    presets: updatePreset,
    prompts: updatePrompt,
    files: updateFile,
    collections: updateCollection,
    assistants: updateAssistant,
    tools: updateTool,
    models: updateModel
  }

  const stateUpdateFunctions = {
    chats: setChats,
    presets: setPresets,
    prompts: setPrompts,
    files: setFiles,
    collections: setCollections,
    assistants: setAssistants,
    tools: setTools,
    models: setModels
  }

  const updateFolder = async (itemId: string, folderId: string | null) => {
    const item: any = data.find(item => item.id === itemId)

    if (!item) return null

    const updateFunction = updateFunctions[contentType]
    const setStateFunction = stateUpdateFunctions[contentType]

    if (!updateFunction || !setStateFunction) return

    const updatedItem = await updateFunction(item.id, {
      folder_id: folderId
    })

    setStateFunction((items: any) =>
      items.map((item: any) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    )
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("text/plain", id)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    const target = e.target as Element

    if (!target.closest("#folder")) {
      const itemId = e.dataTransfer.getData("text/plain")
      updateFolder(itemId, null)
    }

    setIsDragOver(false)
  }

  // TODO: Check purpose
  useEffect(() => {
    if (divRef.current) {
      setIsOverflowing(
        divRef.current.scrollHeight > divRef.current.clientHeight
      )
    }
  }, [data])

  const dataWithFolders = data.filter(item => item.folder_id)
  const dataWithoutFolders = data.filter(item => item.folder_id === null)
  // TODO: Fix bug where selecting a folder from ChatTabContent will collapse the folders in SidebarChats
  const [currentFolder, setCurrentFolder] = useState<string | null>(
    searchParams.get(`${contentType}-folders`)
  )
  const [displayedFiles, setDisplayedFiles] = useState(dataWithoutFolders)

  // Important: Refreshes the data list when the data changes
  useEffect(() => {
    setDisplayedFiles(data.filter(item => item.folder_id === currentFolder))
  }, [data])

  const handleFolderClick = (folderId: string | null) => {
    setCurrentFolder(folderId)
    setDisplayedFiles(data.filter(item => item.folder_id == folderId))
    const folderString = folderId ? `${contentType}-folders=${folderId}` : ""
    router.replace(
      `${pathname}?${chatSearchParam}${tabSearchParam}${folderString}`
    )
  }

  return (
    <>
      <Box
        ref={divRef}
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          height: "100%"
        }}
        onDrop={handleDrop}
      >
        {data.length === 0 && (
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Typography fontSize="lg" fontStyle="italic">
              No {contentType}.
            </Typography>
          </Box>
        )}

        {(dataWithFolders.length > 0 || dataWithoutFolders.length > 0) && (
          <Box
            sx={{
              height: "100%",
              width: isOverflowing ? "calc(100%-8px)" : "100%",
              mr: isOverflowing ? 2 : 0,
              "& > :not(style) + :not(style)": {
                mt: 2
              }
            }}
          >
            {currentFolder === null && (
              <FoldersView
                contentType={contentType}
                currentFolder={currentFolder}
                variant={variant}
                folders={folders}
                handleFolderClick={handleFolderClick}
                dataWithFolders={dataWithFolders}
                handleDragStart={handleDragStart}
              />
            )}

            {contentType === "chats" ? (
              <ChatsView
                displayedFiles={displayedFiles}
                handleDrop={handleDrop}
                handleDragEnter={handleDragEnter}
                handleDragLeave={handleDragLeave}
                handleDragOver={handleDragOver}
                handleDragStart={handleDragStart}
                contentType={contentType}
              />
            ) : (
              <FilesView
                contentType={contentType}
                handleDrop={handleDrop}
                handleDragEnter={handleDragEnter}
                handleDragLeave={handleDragLeave}
                handleDragOver={handleDragOver}
                currentFolder={currentFolder}
                handleFolderClick={handleFolderClick}
                displayedFiles={displayedFiles}
                handleDragStart={handleDragStart}
              />
            )}
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          backgroundColor: isDragOver ? "accent" : "inherit"
        }}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      />
    </>
  )
}
