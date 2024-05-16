// Source: https://github.com/mckaywrigley/chatbot-ui/blob/main/components/sidebar/sidebar-data-list.tsx

import { Tables } from "@/supabase/types"
import * as React from "react"
import { FC, useContext, useRef, useState } from "react"
import { ContentType } from "@/app/lib/types"
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"
import { useParams } from "next/navigation"
import { MetadachiContext } from "@/app/lib/context"
import { deleteFolder, updateFolder } from "@/app/lib/db/folders"
import { supabase } from "@/app/lib/supabase/browser-client"
import { toast } from "sonner"

interface FolderProps {
  folder: Tables<"folders">
  contentType: ContentType
  children: React.ReactNode
  onUpdateFolder: (itemId: string, folderId: string | null) => void
  variant: "basic" | "expandable"
  onClick: any
}

export const FolderItem: FC<FolderProps> = ({
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
  const params = useParams()
  const isActive = params.chatid === folder.id

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

  const handleClick = () => {
    if (onClick) onClick()
    if (variant === "expandable") {
      setIsExpanded(!isExpanded)
    }
  }

  const ExpandFolderButton = () => {
    return (
      <>
        {isExpanded ? (
          <Icon icon="solar:alt-arrow-down-linear" className="text-base" />
        ) : (
          <Icon icon="solar:alt-arrow-right-linear" className="text-base" />
        )}
      </>
    )
  }

  return (
    <div
      ref={itemRef}
      id="folder"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Button
        variant={isActive ? "flat" : "light"}
        onClick={handleClick}
        onFocusChange={isFocused => setIsHovering(isFocused)}
        className="w-full overflow-hidden px-2"
        startContent={
          variant === "expandable" ? (
            <ExpandFolderButton />
          ) : (
            <Icon icon="solar:folder-bold" className="text-2xl" />
          )
        }
        endContent={
          <>
            {(isActive || isHovering) && (
              <>
                <UpdateFolder folder={folder} />
                <DeleteFolder folder={folder} contentType={contentType} />
              </>
            )}
          </>
        }
      >
        <p className="grow overflow-hidden text-ellipsis text-left">
          {folder.name}
        </p>
      </Button>

      {/* TODO: Update Folder Item List UI */}
      {isExpanded && (
        <div className="ml-5 flex flex-col space-y-2 border-l-2 pl-4">
          {children}
        </div>
      )}
    </div>
  )
}

interface UpdateFolderProps {
  folder: Tables<"folders">
}

const UpdateFolder: FC<UpdateFolderProps> = ({ folder }) => {
  const { setFolders } = useContext(MetadachiContext)

  const [open, setOpen] = useState(false)
  const [name, setName] = useState(folder.name)

  const handleUpdateFolder = async () => {
    const updatedFolder = await updateFolder(folder.id, {
      name
    })
    setFolders(prevState =>
      prevState.map(c => (c.id === folder.id ? updatedFolder : c))
    )

    setOpen(false)
  }

  return (
    <>
      <Button
        isIconOnly
        variant="light"
        onClick={() => setOpen(true)}
        size="sm"
        className="-ml-2"
      >
        <Icon icon="solar:pen-linear" className="text-base" />
      </Button>
      <Modal isOpen={open} onOpenChange={() => setOpen(false)}>
        <ModalContent>
          <ModalHeader>{`Edit chats`}</ModalHeader>
          <ModalBody>
            <Input
              isRequired
              label="Name"
              value={name}
              onValueChange={setName}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleUpdateFolder}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

interface DeleteFolderProps {
  folder: Tables<"folders">
  contentType: ContentType
}

const DeleteFolder: FC<DeleteFolderProps> = ({ folder, contentType }) => {
  const {
    setChats,
    setFolders,
    setPresets,
    setPrompts,
    setFiles,
    setCollections,
    setAssistants,
    setTools,
    setModels
  } = useContext(MetadachiContext)

  const [open, setOpen] = useState(false)

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

  const handleDeleteFolderOnly = async () => {
    await deleteFolder(folder.id)

    setFolders(prevState => prevState.filter(c => c.id !== folder.id))

    setOpen(false)

    const setStateFunction = stateUpdateFunctions[contentType]

    if (!setStateFunction) return

    setStateFunction((prevItems: any) =>
      prevItems.map((item: any) => {
        if (item.folder_id === folder.id) {
          return {
            ...item,
            folder_id: null
          }
        }

        return item
      })
    )
  }

  const handleDeleteFolderAndItems = async () => {
    const setStateFunction = stateUpdateFunctions[contentType]

    if (!setStateFunction) return

    const { error } = await supabase
      .from(contentType)
      .delete()
      .eq("folder_id", folder.id)

    if (error) {
      toast.error(error.message)
    }

    setStateFunction((prevItems: any) =>
      prevItems.filter((item: any) => item.folder_id !== folder.id)
    )

    handleDeleteFolderOnly()
  }

  return (
    <>
      <Button
        isIconOnly
        variant="light"
        onClick={() => setOpen(true)}
        size="sm"
        className="-ml-2"
      >
        <Icon icon="solar:trash-bin-2-linear" className="text-base" />
      </Button>
      <Modal isOpen={open} onOpenChange={() => setOpen(false)}>
        <ModalContent>
          <ModalHeader>{`Delete "${folder.name}"`}</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this folder?</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button color="danger" onClick={handleDeleteFolderAndItems}>
              Delete Folder & Items
            </Button>
            <Button color="danger" onClick={handleDeleteFolderOnly}>
              Delete Folder Only
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
