import { CreateItemModal } from "@/app/components/ui/data-list/CreateItemModal"
import { ChatSettingsForm } from "@/app/components/forms/ChatSettingsForm"
import { MetadachiContext } from "@/app/lib/context"
import { PRESET_NAME_MAX } from "@/app/lib/db/limits"
import { TablesInsert } from "@/supabase/types"
import { FC, useContext, useState } from "react"
import { FormControl, FormLabel, Input } from "@mui/joy"

interface CreatePresetProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const CreatePreset: FC<CreatePresetProps> = ({
  isOpen,
  onOpenChange
}) => {
  const { profile, selectedWorkspace } = useContext(MetadachiContext)

  const [name, setName] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [description, setDescription] = useState("")
  const [presetChatSettings, setPresetChatSettings] = useState({
    model: selectedWorkspace?.default_model,
    prompt: selectedWorkspace?.default_prompt,
    temperature: selectedWorkspace?.default_temperature,
    contextLength: selectedWorkspace?.default_context_length,
    includeProfileContext: selectedWorkspace?.include_profile_context,
    includeWorkspaceInstructions:
      selectedWorkspace?.include_workspace_instructions,
    embeddingsProvider: selectedWorkspace?.embeddings_provider
  })

  if (!profile) return null
  if (!selectedWorkspace) return null

  return (
    <CreateItemModal
      contentType="presets"
      isOpen={isOpen}
      isTyping={isTyping}
      onOpenChange={onOpenChange}
      createState={
        {
          user_id: profile.user_id,
          name,
          description,
          include_profile_context: presetChatSettings.includeProfileContext,
          include_workspace_instructions:
            presetChatSettings.includeWorkspaceInstructions,
          context_length: presetChatSettings.contextLength,
          model: presetChatSettings.model,
          prompt: presetChatSettings.prompt,
          temperature: presetChatSettings.temperature,
          embeddings_provider: presetChatSettings.embeddingsProvider
        } as TablesInsert<"presets">
      }
      renderInputs={() => (
        <>
          <FormControl>
            <FormLabel>Name</FormLabel>

            <Input
              placeholder="Preset name..."
              value={name}
              onChange={e => setName(e.target.value)}
              slotProps={{ input: { maxLength: PRESET_NAME_MAX } }}
            />
          </FormControl>

          <ChatSettingsForm
            chatSettings={presetChatSettings as any}
            onChangeChatSettings={setPresetChatSettings}
          />
        </>
      )}
    />
  )
}
