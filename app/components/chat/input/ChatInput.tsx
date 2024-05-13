import { MetadachiContext } from "@/app/lib/context"
import useHotkey from "../../../lib/hooks/use-hotkey"
import { LLM_LIST } from "@/app/lib/models/llm/llm-list"
import * as React from "react"
import { FC, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useChatHandler } from "@/app/lib/hooks/use-chat-handler"
import { usePromptAndCommand } from "@/app/lib/hooks/use-prompt-and-command"
import { useSelectFileHandler } from "@/app/lib/hooks/use-select-file-handler"
import FileInput from "@/app/components/input/FileInput"
import { toast } from "sonner"
import { useChatHistoryHandler } from "@/app/lib/hooks/use-chat-history"
import PromptInput from "@/app/components/chat/input/PromptInput"
import { Button, Tooltip } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"
import { cn } from "@/app/lib/utils/utils"

interface ChatInputProps {}

export const ChatInput: FC<ChatInputProps> = ({}) => {
  const { t } = useTranslation()

  useHotkey("l", () => {
    handleFocusChatInput()
  })

  const [isTyping, setIsTyping] = useState<boolean>(false)

  const {
    isAssistantPickerOpen,
    focusAssistant,
    setFocusAssistant,
    userInput,
    chatMessages,
    isGenerating,
    selectedPreset,
    selectedAssistant,
    focusPrompt,
    setFocusPrompt,
    focusFile,
    focusTool,
    setFocusTool,
    isToolPickerOpen,
    isPromptPickerOpen,
    setIsPromptPickerOpen,
    isFilePickerOpen,
    setFocusFile,
    chatSettings
  } = useContext(MetadachiContext)

  const {
    chatInputRef,
    handleSendMessage,
    handleStopMessage,
    handleFocusChatInput
  } = useChatHandler()

  const { handleInputChange } = usePromptAndCommand()

  const { filesToAccept, handleSelectDeviceFile } = useSelectFileHandler()

  const {
    setNewMessageContentToNextUserMessage,
    setNewMessageContentToPreviousUserMessage
  } = useChatHistoryHandler()

  useEffect(() => {
    setTimeout(() => {
      handleFocusChatInput()
    }, 200) // FIX: hacky
  }, [selectedPreset, selectedAssistant])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isTyping && event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      setIsPromptPickerOpen(false)
      handleSendMessage(userInput, chatMessages, false)
    }

    // Consolidate conditions to avoid TypeScript error
    if (
      isPromptPickerOpen ||
      isFilePickerOpen ||
      isToolPickerOpen ||
      isAssistantPickerOpen
    ) {
      if (
        event.key === "Tab" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown"
      ) {
        event.preventDefault()
        // Toggle focus based on picker type
        if (isPromptPickerOpen) setFocusPrompt(!focusPrompt)
        if (isFilePickerOpen) setFocusFile(!focusFile)
        if (isToolPickerOpen) setFocusTool(!focusTool)
        if (isAssistantPickerOpen) setFocusAssistant(!focusAssistant)
      }
    }

    if (event.key === "ArrowUp" && event.shiftKey && event.ctrlKey) {
      event.preventDefault()
      setNewMessageContentToPreviousUserMessage()
    }

    if (event.key === "ArrowDown" && event.shiftKey && event.ctrlKey) {
      event.preventDefault()
      setNewMessageContentToNextUserMessage()
    }

    //use shift+ctrl+up and shift+ctrl+down to navigate through chat history
    if (event.key === "ArrowUp" && event.shiftKey && event.ctrlKey) {
      event.preventDefault()
      setNewMessageContentToPreviousUserMessage()
    }

    if (event.key === "ArrowDown" && event.shiftKey && event.ctrlKey) {
      event.preventDefault()
      setNewMessageContentToNextUserMessage()
    }

    if (
      isAssistantPickerOpen &&
      (event.key === "Tab" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown")
    ) {
      event.preventDefault()
      setFocusAssistant(!focusAssistant)
    }
  }

  const handlePaste = (event: React.ClipboardEvent) => {
    const imagesAllowed = LLM_LIST.find(
      llm => llm.modelId === chatSettings?.model
    )?.imageInput
    if (!imagesAllowed) return

    const items = event.clipboardData.items
    for (const item of items) {
      if (item.type.indexOf("image") === 0) {
        if (!imagesAllowed) {
          toast.error(
            `Images are not supported for this model. Use models like GPT-4 Vision instead.`
          )
          return
        }

        const file = item.getAsFile()
        if (!file) return
        handleSelectDeviceFile(file)
      }
    }
  }

  return (
    <PromptInput
      ref={chatInputRef}
      classNames={{
        inputWrapper: "!bg-transparent shadow-none items-center",
        innerWrapper: "relative items-center"
      }}
      endContent={
        <div className="flex gap-2">
          {!userInput && (
            <Tooltip showArrow content="Speak">
              <Button isIconOnly radius="full" variant="light">
                <Icon
                  className="text-default-500"
                  icon="solar:microphone-3-linear"
                  width={20}
                />
              </Button>
            </Tooltip>
          )}
          <Tooltip showArrow content="Send message">
            <Button
              isIconOnly
              color={!userInput ? "default" : "primary"}
              isDisabled={!userInput && !isGenerating}
              radius="full"
              variant={!userInput ? "flat" : "solid"}
              onClick={() => handleSendMessage(userInput, chatMessages, false)}
            >
              <Icon
                className={cn(
                  "[&>path]:stroke-[2px]",
                  !userInput ? "text-default-500" : "text-primary-foreground"
                )}
                icon="solar:arrow-up-linear"
                width={20}
              />
            </Button>
          </Tooltip>
        </div>
      }
      minRows={1}
      radius="lg"
      startContent={
        <FileInput
          isIconOnly
          handleSelectedFile={e => {
            if (!e.target.files) return
            handleSelectDeviceFile(e.target.files[0])
          }}
          accept={filesToAccept}
        />
      }
      value={userInput}
      variant="flat"
      onValueChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onCompositionStart={() => setIsTyping(true)}
      onCompositionEnd={() => setIsTyping(false)}
    />
  )
}
