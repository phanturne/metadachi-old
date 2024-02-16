import { FC, useContext } from "react"
import { ChatbotUIContext } from "@/context/context"
import { usePromptAndCommand } from "@/lib/hooks/use-prompt-and-command"
import { PromptPicker } from "@/components/chat/prompt-picker"
import { FilePicker } from "@/components/chat/file-picker"
import { ToolPicker } from "@/components/chat/tool-picker"

interface ChatCommandInputProps {}

export const ChatCommandInput: FC<ChatCommandInputProps> = ({}) => {
  const {
    newMessageFiles,
    chatFiles,
    slashCommand,
    isAtPickerOpen,
    setIsAtPickerOpen,
    atCommand,
    focusPrompt,
    focusFile
  } = useContext(ChatbotUIContext)

  const { handleSelectUserFile, handleSelectUserCollection } =
    usePromptAndCommand()

  return (
    <>
      <PromptPicker />

      <FilePicker
        isOpen={isAtPickerOpen}
        searchQuery={atCommand}
        onOpenChange={setIsAtPickerOpen}
        selectedFileIds={[...newMessageFiles, ...chatFiles].map(
          file => file.id
        )}
        selectedCollectionIds={[]}
        onSelectFile={handleSelectUserFile}
        onSelectCollection={handleSelectUserCollection}
        isFocused={focusFile}
      />

      <ToolPicker />
    </>
  )
}
