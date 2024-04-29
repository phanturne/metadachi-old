import { MetadachiContext } from "@/app/lib/context"
import { Tables } from "@/supabase/types"
import * as React from "react"
import { FC, useContext, useEffect, useRef } from "react"
import { usePromptAndCommand } from "@/app/lib/hooks/use-prompt-and-command"
import { FileIcons } from "@/app/components/files/FileIcons"
import { usePickerKeyHandler } from "@/app/lib/hooks/use-keydown-handler"
import { Listbox, ListboxItem } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

interface FilePickerProps {}

export const FilePicker: FC<FilePickerProps> = ({}) => {
  const {
    files,
    collections,
    setIsFilePickerOpen,
    newMessageFiles,
    chatFiles,
    isFilePickerOpen,
    hashtagCommand,
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
      file.name.toLowerCase().includes(hashtagCommand.toLowerCase()) &&
      !selectedFileIds.includes(file.id)
  )

  const filteredCollections = collections.filter(
    collection =>
      collection.name.toLowerCase().includes(hashtagCommand.toLowerCase()) &&
      !selectedCollectionIds.includes(collection.id)
  )

  const handleOpenChange = (isAtPickerOpen: boolean) => {
    setIsFilePickerOpen(isAtPickerOpen)
  }

  const handleItemSelect = (item: Tables<"files"> | Tables<"collections">) => {
    if ("type" in item) {
      handleSelectUserFile(item as Tables<"files">)
    } else {
      handleSelectUserCollection(item as Tables<"collections">)
    }

    handleOpenChange(false)
  }

  useEffect(() => {
    if (focusFile && itemsRef.current[0]) {
      itemsRef.current[0].focus()
    }
  }, [focusFile])

  const filteredItems = [...filteredFiles, ...filteredCollections]
  const getKeyDownHandler = usePickerKeyHandler({
    itemsRef,
    filteredItems: filteredItems,
    handleItemSelect: handleItemSelect,
    handleOpenChange
  })

  const setItemRef = (ref: HTMLDivElement | null, index: number) => {
    if (ref) {
      itemsRef.current[index] = ref
    }
  }

  if (!isFilePickerOpen) return

  return (
    <Listbox className="p-2">
      {filteredItems.length === 0 ? (
        <ListboxItem className="pointer-events-none" key="no-matching">
          No matching files.
        </ListboxItem>
      ) : (
        filteredItems.map((item: any, index: number) => (
          <ListboxItem
            className="pb-2"
            key={item.id}
            onClick={() => handleItemSelect(item)}
            onKeyDown={getKeyDownHandler(index, item)}
            tabIndex={index}
            // ref={(ref: HTMLDivElement) => setItemRef(ref, index)}
          >
            {/* TODO: Fix refs not working */}
            <div
              ref={(ref: HTMLDivElement) => setItemRef(ref, index)}
              className="flex gap-4"
            >
              {/* Files have a "type" attribute. Folders don't */}
              {"type" in item ? (
                <FileIcons
                  type={(item as Tables<"files">).type}
                  className="text-4xl"
                />
              ) : (
                <Icon icon="bxs:folder" className="text-4xl" />
              )}

              <div>
                <p className="text-sm">{item.name}</p>
                <p className="text-xs text-default-500">
                  {item.content || "No description"}
                </p>
              </div>
            </div>
          </ListboxItem>
        ))
      )}
    </Listbox>
  )
}
