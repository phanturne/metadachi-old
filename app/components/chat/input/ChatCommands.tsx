import * as React from "react"
import { FC, useContext } from "react"
import { PromptPicker } from "@/app/components/chat/input/PromptPicker"
import { FilePicker } from "@/app/components/chat/input/FilePicker"
import { AssistantPicker } from "@/app/components/chat/input/AssistantPicker"
import { ToolPicker } from "@/app/components/chat/input/ToolPicker"
import { MetadachiContext } from "@/app/lib/context"
import { Card } from "@nextui-org/react"

interface ChatActionsProps {}

export const ChatCommands: FC<ChatActionsProps> = ({}) => {
  const {
    isPromptPickerOpen,
    isToolPickerOpen,
    isFilePickerOpen,
    isAssistantPickerOpen
  } = useContext(MetadachiContext)

  if (
    !isFilePickerOpen &&
    !isAssistantPickerOpen &&
    !isPromptPickerOpen &&
    !isToolPickerOpen
  )
    return

  return (
    // The inset-x amount is the same as the padding-x of its parent
    <Card
      radius="lg"
      className="absolute inset-x-20 bottom-20 z-10 max-h-[400px] overflow-x-hidden overflow-y-scroll shadow-md"
    >
      <PromptPicker />
      <FilePicker />
      <ToolPicker />
      <AssistantPicker />
    </Card>
  )
}
