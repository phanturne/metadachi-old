import { CreateItemModal } from "@/app/components/ui/data-list/CreateItemModal"
import { MetadachiContext } from "@/app/lib/context"
import { MODEL_NAME_MAX } from "@/app/lib/db/limits"
import { TablesInsert } from "@/supabase/types"
import { FC, useContext, useState } from "react"
import { FormControl, FormHelperText, FormLabel, Input } from "@mui/joy"

interface CreateModelProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const CreateModel: FC<CreateModelProps> = ({ isOpen, onOpenChange }) => {
  const { profile, selectedWorkspace } = useContext(MetadachiContext)

  const [isTyping, setIsTyping] = useState(false)

  const [apiKey, setApiKey] = useState("")
  const [baseUrl, setBaseUrl] = useState("")
  const [description, setDescription] = useState("")
  const [modelId, setModelId] = useState("")
  const [name, setName] = useState("")
  const [contextLength, setContextLength] = useState(4096)

  if (!profile || !selectedWorkspace) return null

  return (
    <CreateItemModal
      contentType="models"
      isOpen={isOpen}
      isTyping={isTyping}
      onOpenChange={onOpenChange}
      createState={
        {
          user_id: profile.user_id,
          api_key: apiKey,
          base_url: baseUrl,
          description,
          context_length: contextLength,
          model_id: modelId,
          name
        } as TablesInsert<"models">
      }
      renderInputs={() => (
        <>
          <FormControl>
            <FormLabel>Name</FormLabel>

            <Input
              placeholder="Model name..."
              value={name}
              onChange={e => setName(e.target.value)}
              slotProps={{ input: { maxLength: MODEL_NAME_MAX } }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Model ID</FormLabel>

            <Input
              placeholder="Model ID..."
              value={modelId}
              onChange={e => setModelId(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Base URL</FormLabel>

            <Input
              placeholder="Base URL..."
              value={baseUrl}
              onChange={e => setBaseUrl(e.target.value)}
            />

            <FormHelperText>
              Your API must be compatible with the OpenAI SDK.
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>API Key</FormLabel>

            <Input
              type="password"
              placeholder="API Key..."
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Max Context Length</FormLabel>

            <Input
              type="number"
              placeholder="4096"
              value={contextLength}
              onChange={e => setContextLength(parseInt(e.target.value))}
              slotProps={{ input: { min: 0 } }}
            />
          </FormControl>
        </>
      )}
    />
  )
}
