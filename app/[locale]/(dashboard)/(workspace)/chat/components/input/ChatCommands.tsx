import * as React from "react"
import { FC } from "react"
import { PromptPicker } from "@/app/[locale]/(dashboard)/(workspace)/chat/components/input/PromptPicker"
import { FilePicker } from "@/app/[locale]/(dashboard)/(workspace)/chat/components/input/FilePicker"
import Sheet from "@mui/joy/Sheet"
import List from "@mui/joy/List"
import { AssistantPicker } from "@/app/[locale]/(dashboard)/(workspace)/chat/components/input/AssistantPicker"
import { ToolPicker } from "@/app/[locale]/(dashboard)/(workspace)/chat/components/input/tool-picker"

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
