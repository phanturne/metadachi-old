// Source: https://github.com/mckaywrigley/chatbot-ui/blob/main/components/sidebar/items/chat/delete-chat.tsx

import { RefObject } from "react"

export function usePickerKeyHandler({
  itemsRef,
  filteredItems,
  handleItemSelect,
  handleOpenChange
}: {
  itemsRef: RefObject<(HTMLDivElement | null)[]>
  filteredItems: any[]
  handleItemSelect: (item: any) => void
  handleOpenChange: (isOpen: boolean) => void
}) {
  return (index: number, item: any) =>
    (e: React.KeyboardEvent<HTMLLIElement>) => {
      if (!itemsRef.current) return

      if (e.key === "Backspace") {
        e.preventDefault()
        handleOpenChange(false)
      } else if (e.key === "Enter") {
        e.preventDefault()
        handleItemSelect(item)
      } else if (
        (e.key === "Tab" || e.key === "ArrowDown") &&
        !e.shiftKey &&
        index === filteredItems.length - 1
      ) {
        e.preventDefault()
        itemsRef.current?.[0]?.focus()
      } else if (e.key === "ArrowUp" && !e.shiftKey && index === 0) {
        e.preventDefault()
        itemsRef.current?.[itemsRef.current?.length - 1]?.focus()
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        const prevIndex =
          index - 1 >= 0 ? index - 1 : itemsRef.current?.length - 1
        itemsRef.current?.[prevIndex]?.focus()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        const nextIndex = index + 1 < itemsRef.current?.length ? index + 1 : 0
        itemsRef.current?.[nextIndex]?.focus()
      }
    }
}
