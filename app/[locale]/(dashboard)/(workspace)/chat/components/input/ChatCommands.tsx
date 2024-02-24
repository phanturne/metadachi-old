import * as React from "react"
import { FC, useContext } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { PromptPicker } from "@/app/[locale]/(dashboard)/(workspace)/chat/components/input/PromptPicker"
import { FilePicker } from "@/app/[locale]/(dashboard)/(workspace)/chat/components/input/FilePicker"
// import { ToolPicker } from "@/app/[locale]/(dashboard)/(workspace)/chat/components/input/tool-picker"
import Sheet from "@mui/joy/Sheet"
import List from "@mui/joy/List"

interface ChatActionsProps {}

export const ChatCommands: FC<ChatActionsProps> = ({}) => {
  const { isPromptPickerOpen, isToolPickerOpen, isAtPickerOpen } =
    useContext(MetadachiContext)

  if (!isAtPickerOpen && !isPromptPickerOpen && !isToolPickerOpen) return

  return (
    <Sheet
      variant="outlined"
      sx={{
        position: "absolute",
        bottom: "55px",
        left: 0,
        maxHeight: "400px",
        width: "100%",
        overflow: "scroll",
        boxShadow: "md",
        overflowX: "hidden",
        borderRadius: "xl"
      }}
    >
      <List>
        {isPromptPickerOpen && <PromptPicker />}
        {isAtPickerOpen && <FilePicker />}
        {/*{isToolPickerOpen && <ToolPicker />}*/}
      </List>
    </Sheet>
  )
}
