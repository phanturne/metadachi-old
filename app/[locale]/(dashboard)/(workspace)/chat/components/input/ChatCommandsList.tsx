import { useEffect, useRef } from "react"
import { ListItemContent, Typography } from "@mui/joy"
import ListItem from "@mui/joy/ListItem"
import ListItemButton from "@mui/joy/ListItemButton"

interface ChatCommandsListProps {
  commandType: "prompt" | "file" | "tool"
  filteredItems: any
  focusItem: any
  setIsPickerOpen: (val: boolean) => void
  handleItemSelect: (arg0: any, arg1?: any, arg2?: any) => void
  getItemContent: (arg0: any) => any
}

export function ChatCommandsList({
  commandType,
  filteredItems,
  focusItem,
  setIsPickerOpen,
  handleItemSelect,
  getItemContent
}: ChatCommandsListProps) {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (focusItem && itemsRef.current[0]) {
      itemsRef.current[0].focus()
    }
  }, [focusItem])

  const handleOpenChange = (isOpen: boolean) => {
    setIsPickerOpen(isOpen)
  }

  const getKeyDownHandler =
    (index: number, item: any) => (e: React.KeyboardEvent<HTMLDivElement>) => {
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

  return (
    <>
      {filteredItems.length === 0 ? (
        <ListItem
          sx={{
            justifyContent: "center"
          }}
        >
          <Typography>{`No matching ${commandType}s.`}</Typography>
        </ListItem>
      ) : (
        filteredItems.map((item: any, index: number) => (
          <ListItem sx={{ pb: 1 }} key={item.id}>
            <ListItemButton
              onClick={() => handleItemSelect(item)}
              onKeyDown={getKeyDownHandler(index, item)}
              tabIndex={index}
              ref={ref => {
                itemsRef.current[index] = ref
              }}
            >
              <ListItemContent>{getItemContent(item)}</ListItemContent>
            </ListItemButton>
          </ListItem>
        ))
      )}
    </>
  )
}
