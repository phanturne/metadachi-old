import { FC, useContext } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { usePromptAndCommand } from "@/app/lib/hooks/use-prompt-and-command"
import { PromptPicker } from "@/app/components/chat/prompt-picker"
import { FilePicker } from "@/app/components/chat/file-picker"
import { ToolPicker } from "@/app/components/chat/tool-picker"

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
  } = useContext(MetadachiContext)

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
