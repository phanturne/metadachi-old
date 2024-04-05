import { MetadachiContext } from "@/app/lib/context"
import useHotkey from "../../../lib/hooks/use-hotkey"
import { LLM_LIST } from "@/app/lib/models/llm/llm-list"
import * as React from "react"
import { FC, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useChatHandler } from "@/app/lib/hooks/use-chat-handler"
import { usePromptAndCommand } from "@/app/lib/hooks/use-prompt-and-command"
import { useSelectFileHandler } from "@/app/lib/hooks/use-select-file-handler"
import { Box, IconButton, Textarea } from "@mui/joy"
import { SendRounded, StopRounded } from "@mui/icons-material"
import FileInput from "@/app/components/input/FileInput"
import { useAuthModal } from "@/app/lib/providers/AuthContextProvider"
import { toast } from "sonner"
import { useChatHistoryHandler } from "@/app/lib/hooks/use-chat-history"
import { ChatCommands } from "@/app/components/chat/input/ChatCommands"

interface ChatInputProps {}

export const ChatInput: FC<ChatInputProps> = ({}) => {
  const { t } = useTranslation()

  useHotkey("l", () => {
    handleFocusChatInput()
  })

  const { openAuthModal } = useAuthModal()

  const [isTyping, setIsTyping] = useState<boolean>(false)

  const {
    profile,
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
    <Box
      sx={{
        position: "relative",
        mt: 1,
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <ChatCommands />

      <Textarea
        slotProps={{ textarea: { ref: chatInputRef } }}
        placeholder={`Ask anything. Type "@" for assistants, "/" for prompts, "#" for files, and "!" for tools.`}
        onChange={e => handleInputChange(e.target.value)}
        value={userInput}
        minRows={1}
        maxRows={18}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onCompositionStart={() => setIsTyping(true)}
        onCompositionEnd={() => setIsTyping(false)}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          "--Textarea-focusedThickness": "0rem",
          width: "100%",
          borderRadius: "xl",
          "& .MuiTextarea-startDecorator": {
            my: 0
          },
          "& .MuiTextarea-endDecorator": {
            my: 0
          },
          "& .MuiTextarea-textarea": {
            alignSelf: "center"
          }
        }}
        startDecorator={
          <>
            <FileInput
              isIconOnly
              handleSelectedFile={e => {
                if (!e.target.files) return
                handleSelectDeviceFile(e.target.files[0])
              }}
              accept={filesToAccept}
            />
          </>
        }
        endDecorator={
          <>
            {isGenerating ? (
              <IconButton onClick={handleStopMessage}>
                <StopRounded />
              </IconButton>
            ) : (
              <IconButton
                size="md"
                disabled={!userInput}
                onClick={() => {
                  if (!userInput) return

                  handleSendMessage(userInput, chatMessages, false)
                }}
              >
                <SendRounded />
              </IconButton>
            )}
          </>
        }
      />
    </Box>
  )
}
