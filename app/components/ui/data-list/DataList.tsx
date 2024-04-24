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
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { updateModel } from "@/app/lib/db/models"
import { ChatList } from "@/app/components/chat/ChatList"
import { FilesView } from "@/app/components/ui/data-list/items/files/FilesView"
import { FoldersView } from "@/app/components/ui/data-list/FoldersView"

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
      <div
        ref={divRef}
        className="flex h-full flex-col overflow-y-auto"
        onDrop={handleDrop}
      >
        {data.length === 0 && (
          <div className="flex grow items-center justify-center">
            <p className="mt-8 text-lg italic">No matching {contentType}.</p>
          </div>
        )}

        {(dataWithFolders.length > 0 || dataWithoutFolders.length > 0) && (
          <div
            className={`h-full ${isOverflowing ? "w-[calc(100%-8px)]" : "w-full"} ${isOverflowing ? "mr-2" : ""} my-4`}
          >
            {/* Nested folders are currently unsupported. Render `FoldersView` if no folder is active. */}
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
              <ChatList
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
          </div>
        )}
      </div>

      <div
        className={`flex grow ${isDragOver ? "bg-accent" : ""}`}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      />
    </>
  )
}
