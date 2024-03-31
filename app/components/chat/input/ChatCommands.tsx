import * as React from "react"
import { FC } from "react"
import { PromptPicker } from "@/app/components/chat/input/PromptPicker"
import { FilePicker } from "@/app/components/chat/input/FilePicker"
import Sheet from "@mui/joy/Sheet"
import List from "@mui/joy/List"
import { AssistantPicker } from "@/app/components/chat/input/AssistantPicker"
import { ToolPicker } from "@/app/components/chat/input/tool-picker"

interface ChatActionsProps {}

export const ChatCommands: FC<ChatActionsProps> = ({}) => {
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
        <PromptPicker />
        <FilePicker />
        <ToolPicker />
        <AssistantPicker />
      </List>
    </Sheet>
  )
}
