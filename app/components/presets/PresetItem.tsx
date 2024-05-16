// Source: https://github.com/mckaywrigley/chatbot-ui/blob/main/components/sidebar/items/presets/preset-item.tsx

import { ModelIcon } from "@/app/components/models/ModelIcon"
import { ChatSettingsForm } from "@/app/components/chat/ChatSettingsForm"
import { PRESET_NAME_MAX } from "@/app/lib/db/limits"
import { LLM_LIST } from "@/app/lib/models/llm/llm-list"
import { Tables } from "@/supabase/types"
import React, { FC, useState } from "react"
import { DataListItem } from "@/app/components/ui/data-list/DataListItem"
import { Input } from "@nextui-org/react"

interface PresetItemProps {
  preset: Tables<"presets">
}

export const PresetItem: FC<PresetItemProps> = ({ preset }) => {
  const [name, setName] = useState(preset.name)
  const [isTyping, setIsTyping] = useState(false)
  const [description, setDescription] = useState(preset.description)
  const [presetChatSettings, setPresetChatSettings] = useState({
    model: preset.model,
    prompt: preset.prompt,
    temperature: preset.temperature,
    contextLength: preset.context_length,
    includeProfileContext: preset.include_profile_context,
    includeWorkspaceInstructions: preset.include_workspace_instructions
  })

  const modelDetails = LLM_LIST.find(model => model.modelId === preset.model)

  return (
    <DataListItem
      item={preset}
      isTyping={isTyping}
      contentType="presets"
      icon={
        <ModelIcon provider={modelDetails?.provider || "custom"} size="md" />
      }
      updateState={{
        name,
        description,
        include_profile_context: presetChatSettings.includeProfileContext,
        include_workspace_instructions:
          presetChatSettings.includeWorkspaceInstructions,
        context_length: presetChatSettings.contextLength,
        model: presetChatSettings.model,
        prompt: presetChatSettings.prompt,
        temperature: presetChatSettings.temperature
      }}
      renderInputs={() => (
        <>
          <Input
            isRequired
            label="Name"
            labelPlacement="outside"
            placeholder="Preset name..."
            value={name}
            onValueChange={setName}
            maxLength={PRESET_NAME_MAX}
            description={`${name.length}/${PRESET_NAME_MAX}`}
          />

          <ChatSettingsForm
            chatSettings={presetChatSettings as any}
            onChangeChatSettings={setPresetChatSettings}
          />
        </>
      )}
    />
  )
}
