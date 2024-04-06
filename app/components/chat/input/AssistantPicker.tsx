// TODO: Update UI
import { MetadachiContext } from "@/app/lib/context"
import { Tables } from "@/supabase/types"
import * as React from "react"
import { FC, useContext, useEffect, useRef } from "react"
import { usePromptAndCommand } from "@/app/lib/hooks/use-prompt-and-command"
import { Listbox, ListboxItem } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"
import Image from "next/image"

interface AssistantPickerProps {}

export const AssistantPicker: FC<AssistantPickerProps> = ({}) => {
  const {
    assistants,
    assistantImages,
    focusAssistant,
    hashtagCommand,
    isAssistantPickerOpen,
    setIsAssistantPickerOpen
  } = useContext(MetadachiContext)

  const { handleSelectAssistant } = usePromptAndCommand()

  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (focusAssistant && itemsRef.current[0]) {
      itemsRef.current[0].focus()
    }
  }, [focusAssistant])

  const filteredAssistants = assistants.filter(assistant =>
    assistant.name.toLowerCase().includes(hashtagCommand.toLowerCase())
  )

  const handleOpenChange = (isOpen: boolean) => {
    setIsAssistantPickerOpen(isOpen)
  }

  const callSelectAssistant = (assistant: Tables<"assistants">) => {
    handleSelectAssistant(assistant)
    handleOpenChange(false)
  }

  const getKeyDownHandler =
    (index: number) => (e: React.KeyboardEvent<HTMLLIElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault()
        handleOpenChange(false)
      } else if (e.key === "Enter") {
        e.preventDefault()
        callSelectAssistant(filteredAssistants[index])
      } else if (
        (e.key === "Tab" || e.key === "ArrowDown") &&
        !e.shiftKey &&
        index === filteredAssistants.length - 1
      ) {
        e.preventDefault()
        itemsRef.current[0]?.focus()
      } else if (e.key === "ArrowUp" && !e.shiftKey && index === 0) {
        // go to last element if arrow up is pressed on first element
        e.preventDefault()
        itemsRef.current[itemsRef.current.length - 1]?.focus()
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        const prevIndex =
          index - 1 >= 0 ? index - 1 : itemsRef.current.length - 1
        itemsRef.current[prevIndex]?.focus()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        const nextIndex = index + 1 < itemsRef.current.length ? index + 1 : 0
        itemsRef.current[nextIndex]?.focus()
      }
    }

  const setItemRef = (ref: HTMLDivElement | null, index: number) => {
    if (ref) {
      itemsRef.current[index] = ref
    }
  }

  if (!isAssistantPickerOpen) return

  return (
    <Listbox className="p-2">
      {filteredAssistants.length === 0 ? (
        <ListboxItem className="pointer-events-none" key="no-matching">
          No matching assistants.
        </ListboxItem>
      ) : (
        filteredAssistants.map((item: any, index: number) => (
          <ListboxItem
            className="pb-2"
            key={item.id}
            onClick={() => callSelectAssistant(item)}
            onKeyDown={getKeyDownHandler(index)}
            tabIndex={index}
            // ref={(ref: HTMLDivElement) => setItemRef(ref, index)}
          >
            {/* TODO: Fix refs not working */}
            <div
              ref={(ref: HTMLDivElement) => setItemRef(ref, index)}
              className="flex gap-4"
            >
              {item.image_path ? (
                <Image
                  src={
                    assistantImages.find(
                      image => image.path === item.image_path
                    )?.url || ""
                  }
                  alt={item.name}
                  width={32}
                  height={32}
                  className="rounded"
                />
              ) : (
                <Icon icon="fluent-emoji:robot" className="text-4xl" />
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
