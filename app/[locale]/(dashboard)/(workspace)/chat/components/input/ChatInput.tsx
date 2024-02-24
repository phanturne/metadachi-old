import { MetadachiContext } from "@/app/lib/context"
import useHotkey from "@/app/lib/hooks/use-hotkey"
import { LLM_LIST } from "@/app/lib/models/llm/llm-list"
import * as React from "react"
import { FC, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { ChatCommands } from "@/app/[locale]/(dashboard)/(workspace)/chat/components/input/ChatCommands"
import { useChatHandler } from "@/app/lib/hooks/use-chat-handler"
import { usePromptAndCommand } from "@/app/lib/hooks/use-prompt-and-command"
import { useSelectFileHandler } from "@/app/lib/hooks/use-select-file-handler"
import { Box, IconButton, Textarea } from "@mui/joy"
import { SendRounded, StopRounded } from "@mui/icons-material"
import { FileInputIconButton } from "@/app/components/input/FileInput"

interface ChatInputProps {}

export const ChatInput: FC<ChatInputProps> = ({}) => {
  const { t } = useTranslation()

  useHotkey("l", () => {
    handleFocusChatInput()
  })

  const [isTyping, setIsTyping] = useState<boolean>(false)

  const {
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
    isAtPickerOpen,
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

    if (
      isPromptPickerOpen &&
      (event.key === "Tab" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown")
    ) {
      event.preventDefault()
      setFocusPrompt(!focusPrompt)
    }

    if (
      isAtPickerOpen &&
      (event.key === "Tab" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown")
    ) {
      event.preventDefault()
      setFocusFile(!focusFile)
    }

    if (
      isToolPickerOpen &&
      (event.key === "Tab" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown")
    ) {
      event.preventDefault()
      setFocusTool(!focusTool)
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
        // placeholder={`Ask anything. Type "/" for prompts, "#" for files, and "!" for tools.`}
        placeholder={`Ask anything. Type "/" for prompts and "#" for files.`}
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
            <FileInputIconButton
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
