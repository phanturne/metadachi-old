import { ChatbotUIContext } from "@/context/context"
import { CHAT_SETTING_LIMITS } from "@/lib/chat-setting-limits"
import useHotkey from "@/lib/hooks/use-hotkey"
import { LLM_LIST } from "@/lib/models/llm/llm-list"
import { FC, useCallback, useContext, useEffect, useRef, useState } from "react"
import { ChatSettingsForm } from "../ChatSettingsForm"
import { DEFAULT_CHAT_SETTINGS } from "@/types"
import { Typography, Dropdown, MenuButton, Menu } from "@mui/joy"
import { TuneRounded } from "@mui/icons-material"
import { ClickAwayListener } from "@mui/base"

interface ChatSettingsProps {}

export const ChatSettingsPopup: FC<ChatSettingsProps> = ({}) => {
  useHotkey("i", () => handleClick())

  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    if (buttonRef.current) {
      buttonRef.current.click()
    }
  }

  const handleOpenChange = useCallback(
    (_: React.SyntheticEvent | null, isOpen: boolean) => {
      setOpen(isOpen)
    },
    []
  )

  const { chatSettings, setChatSettings } = useContext(ChatbotUIContext)

  useEffect(() => {
    if (!chatSettings) return

    setChatSettings({
      ...chatSettings,
      temperature: Math.min(
        chatSettings.temperature,
        CHAT_SETTING_LIMITS[chatSettings.model]?.MAX_TEMPERATURE || 1
      ),
      contextLength: Math.min(
        chatSettings.contextLength,
        CHAT_SETTING_LIMITS[chatSettings.model]?.MAX_CONTEXT_LENGTH || 4096
      )
    })
  }, [chatSettings?.model])

  const fullModel = LLM_LIST.find(
    llm => llm.modelId === (chatSettings?.model ?? DEFAULT_CHAT_SETTINGS.model)
  )

  return (
    <Dropdown open={open} onOpenChange={handleOpenChange}>
      <MenuButton
        ref={buttonRef}
        variant="plain"
        endDecorator={<TuneRounded />}
      >
        <Typography level="title-md">
          {fullModel?.modelName ||
            (chatSettings?.model ?? DEFAULT_CHAT_SETTINGS.model)}
        </Typography>
      </MenuButton>
      <ClickAwayListener
        onClickAway={event => {
          if (event.target !== buttonRef.current) {
            handleClick()
          }
        }}
      >
        <Menu variant="plain">
          <ChatSettingsForm
            chatSettings={chatSettings ?? DEFAULT_CHAT_SETTINGS}
            onChangeChatSettings={setChatSettings}
          />
        </Menu>
      </ClickAwayListener>
    </Dropdown>
  )
}
