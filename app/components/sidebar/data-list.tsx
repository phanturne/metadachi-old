import { MetadachiContext } from "@/app/lib/context"
import { updateAssistant } from "@/app/lib/db/assistants"
import { updateChat } from "@/app/lib/db/chats"
import { updateCollection } from "@/app/lib/db/collections"
import { updateFile } from "@/app/lib/db/files"
import { updatePreset } from "@/app/lib/db/presets"
import { updatePrompt } from "@/app/lib/db/prompts"
import { updateTool } from "@/app/lib/db/tools"
import { cn } from "@/app/lib/utils"
import { Tables } from "@/supabase/types"
import { ContentType, DataItemType, DataListType } from "@/app/lib/types"
import { FC, useContext, useEffect, useRef, useState } from "react"
import { Separator } from "../ui/separator"
import { AssistantItem } from "./items/assistants/assistant-item"
import { ChatItem } from "./items/chat/chat-item"
import { CollectionItem } from "./items/collections/collection-item"
import { FileItem } from "./items/files/file-item"
import { Folder } from "@/app/components/folders/Folder"
import { ModelItem } from "./items/models/model-item"
import { PresetItem } from "./items/presets/preset-item"
import { PromptItem } from "./items/prompts/prompt-item"
import { ToolItem } from "./items/tools/tool-item"
import { Box, Button, Grid } from "@mui/joy"
import { ArrowBackRounded } from "@mui/icons-material"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { updateModel } from "@/app/lib/db/models"

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

  const getDataListComponent = (
    contentType: ContentType,
    item: DataItemType
  ) => {
    switch (contentType) {
      case "chats":
        return <ChatItem key={item.id} chat={item as Tables<"chats">} />

      case "presets":
        return <PresetItem key={item.id} preset={item as Tables<"presets">} />

      case "prompts":
        return <PromptItem key={item.id} prompt={item as Tables<"prompts">} />

      case "files":
        return <FileItem key={item.id} file={item as Tables<"files">} />

      case "collections":
        return (
          <CollectionItem
            key={item.id}
            collection={item as Tables<"collections">}
          />
        )

      case "assistants":
        return (
          <AssistantItem
            key={item.id}
            assistant={item as Tables<"assistants">}
          />
        )

      case "tools":
        return <ToolItem key={item.id} tool={item as Tables<"tools">} />

      case "models":
        return <ModelItem key={item.id} model={item as Tables<"models">} />

      default:
        return null
    }
  }

  const getSortedData = (
    data: any,
    dateCategory: "Today" | "Yesterday" | "Previous Week" | "Older"
  ) => {
    const now = new Date()
    const todayStart = new Date(now.setHours(0, 0, 0, 0))
    const yesterdayStart = new Date(
      new Date().setDate(todayStart.getDate() - 1)
    )
    const oneWeekAgoStart = new Date(
      new Date().setDate(todayStart.getDate() - 7)
    )

    return data
      .filter((item: any) => {
        const itemDate = new Date(item.updated_at || item.created_at)
        switch (dateCategory) {
          case "Today":
            return itemDate >= todayStart
          case "Yesterday":
            return itemDate >= yesterdayStart && itemDate < todayStart
          case "Previous Week":
            return itemDate >= oneWeekAgoStart && itemDate < yesterdayStart
          case "Older":
            return itemDate < oneWeekAgoStart
          default:
            return true
        }
      })
      .sort(
        (
          a: { updated_at: string; created_at: string },
          b: { updated_at: string; created_at: string }
        ) =>
          new Date(b.updated_at || b.created_at).getTime() -
          new Date(a.updated_at || a.created_at).getTime()
      )
  }

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
  // TODO: Fix bug where selectign a folder from ChatTabContent will collapse the folders in SidebarChats
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

  function FolderData({ folder }: { folder: Tables<"folders"> }) {
    return (
      <Folder
        key={folder.id}
        folder={folder}
        contentType={contentType}
        onUpdateFolder={updateFolder}
        variant={variant === "list" ? "expandable" : "basic"}
        onClick={
          variant === "grid" ? () => handleFolderClick(folder.id) : undefined
        }
      >
        {dataWithFolders
          .filter(item => item.folder_id === folder.id)
          .map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={e => handleDragStart(e, item.id)}
            >
              {getDataListComponent(contentType, item)}
            </div>
          ))}
      </Folder>
    )
  }

  const FoldersView = () => {
    return (
      <>
        {currentFolder === null &&
          (variant === "list" ? (
            folders.map(folder => (
              <FolderData folder={folder} key={folder.id} />
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
                  <FolderData folder={folder} key={folder.id} />
                </Grid>
              ))}
            </Grid>
          ))}
        {folders.length > 0 && <Separator />}
      </>
    )
  }

  const ChatsView = () => {
    return (
      <>
        {["Today", "Yesterday", "Previous Week", "Older"].map(dateCategory => {
          const sortedData = getSortedData(
            displayedFiles,
            dateCategory as "Today" | "Yesterday" | "Previous Week" | "Older"
          )
          return (
            sortedData.length > 0 && (
              <div className="pb-2">
                <div className="text-muted-foreground mb-1 text-sm font-bold">
                  {dateCategory}
                </div>

                <div
                  className={cn(
                    "flex grow flex-col",
                    isDragOver && "bg-accent"
                  )}
                  onDrop={handleDrop}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                >
                  {sortedData.map((item: any) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={e => handleDragStart(e, item.id)}
                    >
                      {getDataListComponent(contentType, item)}
                    </div>
                  ))}
                </div>
              </div>
            )
          )
        })}
      </>
    )
  }

  const FilesView = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column"
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
            <div
              key={item.id}
              draggable
              onDragStart={e => handleDragStart(e, item.id)}
            >
              {getDataListComponent(contentType, item)}
            </div>
          )
        })}
      </Box>
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
          <div className="flex grow flex-col items-center justify-center">
            <div className=" text-centertext-muted-foreground p-8 text-lg italic">
              No {contentType}.
            </div>
          </div>
        )}

        {(dataWithFolders.length > 0 || dataWithoutFolders.length > 0) && (
          <div
            className={`h-full ${
              isOverflowing ? "w-[calc(100%-8px)]" : "w-full"
            } space-y-2 pt-2 ${isOverflowing ? "mr-2" : ""}`}
          >
            {currentFolder === null && <FoldersView />}

            {contentType === "chats" ? <ChatsView /> : <FilesView />}
          </div>
        )}
      </Box>

      <div
        className={cn("flex grow", isDragOver && "bg-accent")}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      />
    </>
  )
}
