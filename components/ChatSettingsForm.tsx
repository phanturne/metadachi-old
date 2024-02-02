"use client"

import { ChatSettings } from "@/types"
import { FC } from "react"
import { ModelSelect } from "./models/ModelSelect"
import { AdvancedSettings } from "./ui/advanced-settings"
import { Box, Textarea, Typography } from "@mui/joy"
import Sheet from "@mui/joy/Sheet"

interface ChatSettingsFormProps {
  chatSettings: ChatSettings
  onChangeChatSettings: (value: ChatSettings) => void
  showTooltip?: boolean
}

export const ChatSettingsForm: FC<ChatSettingsFormProps> = ({
  chatSettings,
  onChangeChatSettings,
  showTooltip = true
}) => {
  return (
    <Sheet
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        p: 3,
        borderRadius: "sm"
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography level="title-sm" fontWeight="bold">
          Model
        </Typography>

        <ModelSelect
          selectedModelId={chatSettings.model}
          onSelectModel={model => {
            onChangeChatSettings({ ...chatSettings, model })
          }}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography level="title-sm" fontWeight="bold">
          Prompt
        </Typography>

        <Textarea
          placeholder="You are a helpful AI assistant."
          onChange={e => {
            onChangeChatSettings({ ...chatSettings, prompt: e.target.value })
          }}
          value={chatSettings.prompt}
          minRows={3}
          maxRows={6}
        />
      </Box>

      <AdvancedSettings
        chatSettings={chatSettings}
        onChangeChatSettings={onChangeChatSettings}
        showTooltip={showTooltip}
      />
    </Sheet>
  )
}
