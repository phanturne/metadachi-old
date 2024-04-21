"use client"

import { ChatSettings } from "@/app/lib/types"
import { ModelSelect } from "../models/ModelSelect"
import { AdvancedModelSettings } from "../models/AdvancedModelSettings"
import { Textarea } from "@nextui-org/react"

interface ChatSettingsFormProps {
  chatSettings: ChatSettings
  onChangeChatSettings: (value: ChatSettings) => void
  showTooltip?: boolean
}

export const ChatSettingsForm = ({
  chatSettings,
  onChangeChatSettings,
  showTooltip = true
}: ChatSettingsFormProps) => {
  return (
    <>
      <ModelSelect
        selectedModelId={chatSettings.model}
        onSelectModel={model => {
          onChangeChatSettings({ ...chatSettings, model })
        }}
      />

      <Textarea
        label="Prompt"
        labelPlacement="outside"
        placeholder="You are a helpful AI assistant."
        onChange={e => {
          onChangeChatSettings({ ...chatSettings, prompt: e.target.value })
        }}
        value={chatSettings.prompt}
        minRows={3}
        maxRows={6}
      />

      <AdvancedModelSettings
        chatSettings={chatSettings}
        onChangeChatSettings={onChangeChatSettings}
        showTooltip={showTooltip}
      />
    </>
  )
}

export const ChatSettingsFormWrapper = ({
  chatSettings,
  onChangeChatSettings,
  showTooltip = true
}: ChatSettingsFormProps) => {
  return (
    <div className="flex flex-col space-y-6 rounded-md border border-gray-300 p-3">
      <ChatSettingsForm
        chatSettings={chatSettings}
        onChangeChatSettings={onChangeChatSettings}
        showTooltip={showTooltip}
      />{" "}
    </div>
  )
}
