import { MODEL_NAME_MAX } from "@/app/lib/db/limits"
import { Tables, TablesUpdate } from "@/supabase/types"
import { FC, useState } from "react"
import { DataListItem } from "@/app/components/data-list/shared/DataListItem"
import { AutoAwesomeRounded } from "@mui/icons-material"
import { DATA_LIST_ITEM_ICON_STYLE } from "@/app/lib/constants"
import { FormControl, FormHelperText, FormLabel, Input } from "@mui/joy"

interface ModelItemProps {
  model: Tables<"models">
}

export const ModelItem: FC<ModelItemProps> = ({ model }) => {
  const [isTyping, setIsTyping] = useState(false)

  const [apiKey, setApiKey] = useState(model.api_key)
  const [baseUrl, setBaseUrl] = useState(model.base_url)
  const [description, setDescription] = useState(model.description)
  const [modelId, setModelId] = useState(model.model_id)
  const [name, setName] = useState(model.name)
  const [contextLength, setContextLength] = useState(4096)

  return (
    <DataListItem
      item={model}
      isTyping={isTyping}
      contentType="models"
      icon={<AutoAwesomeRounded sx={DATA_LIST_ITEM_ICON_STYLE} />}
      updateState={
        {
          api_key: apiKey,
          base_url: baseUrl,
          description,
          context_length: contextLength,
          model_id: modelId,
          name
        } as TablesUpdate<"models">
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
