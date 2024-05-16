// Source: https://github.com/mckaywrigley/chatbot-ui/blob/main/components/chat/tool-picker.tsx

import { MetadachiContext } from "@/app/lib/context"
import { Tables } from "@/supabase/types"
import * as React from "react"
import { FC, useContext, useEffect, useRef } from "react"
import { usePromptAndCommand } from "@/app/lib/hooks/use-prompt-and-command"
import { Listbox, ListboxItem } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

interface ToolPickerProps {}

export const ToolPicker: FC<ToolPickerProps> = ({}) => {
  const {
    tools,
    focusTool,
    toolCommand,
    isToolPickerOpen,
    setIsToolPickerOpen
  } = useContext(MetadachiContext)

  const { handleSelectTool } = usePromptAndCommand()

  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (focusTool && itemsRef.current[0]) {
      itemsRef.current[0].focus()
    }
  }, [focusTool])

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(toolCommand.toLowerCase())
  )

  const handleOpenChange = (isOpen: boolean) => {
    setIsToolPickerOpen(isOpen)
  }

  const callSelectTool = (tool: Tables<"tools">) => {
    handleSelectTool(tool)
    handleOpenChange(false)
  }

  const getKeyDownHandler =
    (index: number) => (e: React.KeyboardEvent<HTMLLIElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault()
        handleOpenChange(false)
      } else if (e.key === "Enter") {
        e.preventDefault()
        callSelectTool(filteredTools[index])
      } else if (
        (e.key === "Tab" || e.key === "ArrowDown") &&
        !e.shiftKey &&
        index === filteredTools.length - 1
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

  if (!isToolPickerOpen) return

  return (
    <Listbox className="p-2">
      {filteredTools.length === 0 ? (
        <ListboxItem className="pointer-events-none" key="no-matching">
          No matching assistants.
        </ListboxItem>
      ) : (
        filteredTools.map((item: any, index: number) => (
          <ListboxItem
            className="pb-2"
            key={item.id}
            onClick={() => callSelectTool(item)}
            onKeyDown={getKeyDownHandler(index)}
            tabIndex={index}
            // ref={(ref: HTMLDivElement) => setItemRef(ref, index)}
          >
            {/* TODO: Fix refs not working */}
            <div
              ref={(ref: HTMLDivElement) => setItemRef(ref, index)}
              className="flex gap-4"
            >
              <Icon
                icon="solar:magic-stick-3-bold-duotone"
                className="text-4xl"
              />

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
