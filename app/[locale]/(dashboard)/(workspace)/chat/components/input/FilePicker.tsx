import { MetadachiContext } from "@/app/lib/context"
import { Tables } from "@/supabase/types"
import * as React from "react"
import { FC, useContext, useEffect, useRef } from "react"
import { Box, Typography } from "@mui/joy"
import { usePromptAndCommand } from "@/app/lib/hooks/use-prompt-and-command"
import { ChatCommandsList } from "@/app/[locale]/(dashboard)/(workspace)/chat/components/input/ChatCommandsList"
import { FolderRounded } from "@mui/icons-material"
import SvgIcon from "@mui/joy/SvgIcon"
import { FileIcon } from "@/app/components/ui/file-icon"

interface FilePickerProps {}

export const FilePicker: FC<FilePickerProps> = ({}) => {
  const {
    files,
    collections,
    setIsAtPickerOpen,
    newMessageFiles,
    chatFiles,
    isAtPickerOpen,
    atCommand,
    focusFile
  } = useContext(MetadachiContext)

  const { handleSelectUserFile, handleSelectUserCollection } =
    usePromptAndCommand()

  const selectedCollectionIds: string[] = []
  const selectedFileIds = [...newMessageFiles, ...chatFiles].map(
    file => file.id
  )

  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (focusFile && itemsRef.current[0]) {
      itemsRef.current[0].focus()
    }
  }, [focusFile])

  const filteredFiles = files.filter(
    file =>
      file.name.toLowerCase().includes(atCommand.toLowerCase()) &&
      !selectedFileIds.includes(file.id)
  )

  const filteredCollections = collections.filter(
    collection =>
      collection.name.toLowerCase().includes(atCommand.toLowerCase()) &&
      !selectedCollectionIds.includes(collection.id)
  )

  const handleOpenChange = (isAtPickerOpen: boolean) => {
    setIsAtPickerOpen(isAtPickerOpen)
  }

  const handleItemSelect = (item: Tables<"files"> | Tables<"collections">) => {
    if ("type" in item) {
      handleSelectUserFile(item as Tables<"files">)
    } else {
      handleSelectUserCollection(item as Tables<"collections">)
    }

    handleOpenChange(false)
  }

  if (!isAtPickerOpen) return

  const getItemContent = (item: Tables<"files"> | Tables<"collections">) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        {"type" in item ? (
          <FileIcon type={(item as Tables<"files">).type} size={32} />
        ) : (
          <SvgIcon size="lg">
            <FolderRounded />
          </SvgIcon>
        )}

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography level="title-sm">{item.name}</Typography>
          <Typography level="body-sm">
            {item.description || "No description."}
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <ChatCommandsList
      commandType="file"
      filteredItems={[...filteredFiles, ...filteredCollections]}
      focusItem={focusFile}
      setIsPickerOpen={setIsAtPickerOpen}
      handleItemSelect={handleItemSelect}
      getItemContent={getItemContent}
    />
  )
}
