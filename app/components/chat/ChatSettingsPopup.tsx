import { MetadachiContext } from "@/app/lib/context"
import { CHAT_SETTING_LIMITS } from "@/app/lib/utils/chat-setting-limits"
import useHotkey from "@/app/lib/hooks/use-hotkey"
import * as React from "react"
import { useContext, useEffect } from "react"
import { ChatSettingsForm } from "@/app/components/chat/ChatSettingsForm"
import { DEFAULT_CHAT_SETTINGS, LLMID, ModelProvider } from "@/app/lib/types"
import { Button, MenuList, Typography } from "@mui/joy"
import { TuneRounded } from "@mui/icons-material"
import { ClickAwayListener } from "@mui/base"
import { Popper } from "@mui/base/Popper"
import { styled } from "@mui/joy/styles"

const Popup = styled(Popper)({
  zIndex: 1000
})

export function ChatSettingsPopup() {
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const [open, setOpen] = React.useState(false)
  useHotkey("i", () => setOpen(!open))

  const handleClose = () => {
    setOpen(false)
  }

  const {
    chatSettings,
    setChatSettings,
    models,
    availableHostedModels,
    availableLocalModels,
    availableOpenRouterModels
  } = useContext(MetadachiContext)

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

  if (!chatSettings) return

  const allModels = [
    ...models.map(model => ({
      modelId: model.model_id as LLMID,
      modelName: model.name,
      provider: "custom" as ModelProvider,
      hostedId: model.id,
      platformLink: "",
      imageInput: false
    })),
    ...availableHostedModels,
    ...availableLocalModels,
    ...availableOpenRouterModels
  ]

  const fullModel = allModels.find(llm => llm.modelId === chatSettings.model)

  return (
    <>
      <Button
        ref={buttonRef}
        variant="plain"
        color="neutral"
        endDecorator={<TuneRounded />}
        onClick={() => {
          setOpen(!open)
        }}
      >
        <Typography level="title-md">
          {fullModel?.modelName ||
            (chatSettings?.model ?? DEFAULT_CHAT_SETTINGS.model)}
        </Typography>
      </Button>
      <Popup
        role={undefined}
        id="composition-menu"
        open={open}
        anchorEl={buttonRef.current}
        // disablePortal
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 4]
            }
          }
        ]}
      >
        <ClickAwayListener
          onClickAway={event => {
            if (event.target !== buttonRef.current) {
              handleClose()
            }
          }}
        >
          <MenuList variant="plain" sx={{ m: 0, p: 0 }}>
            <ChatSettingsForm
              chatSettings={chatSettings ?? DEFAULT_CHAT_SETTINGS}
              onChangeChatSettings={setChatSettings}
            />
          </MenuList>
        </ClickAwayListener>
      </Popup>
    </>
  )
}
