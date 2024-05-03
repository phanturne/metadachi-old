import { MODEL_NAME_MAX } from "@/app/lib/db/limits"
import { Tables, TablesUpdate } from "@/supabase/types"
import React, { FC, useState } from "react"
import { DataListItem } from "@/app/components/ui/data-list/DataListItem"
import { Input } from "@nextui-org/react"
import { PasswordInput } from "@/app/components/input"
import { Icon } from "@iconify-icon/react"

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
      icon={<Icon icon="solar:planet-bold-duotone" className="text-2xl" />}
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
          <Input
            isRequired
            label="Name"
            labelPlacement="outside"
            placeholder="Model name..."
            value={name}
            onValueChange={setName}
            maxLength={MODEL_NAME_MAX}
            description={`${name.length}/${MODEL_NAME_MAX}`}
          />

          <Input
            isRequired
            label="Model ID"
            labelPlacement="outside"
            placeholder="Model ID..."
            value={modelId}
            onValueChange={setModelId}
          />

          <Input
            isRequired
            label="Base URL"
            labelPlacement="outside"
            placeholder="Base URL..."
            value={baseUrl}
            onValueChange={setBaseUrl}
            description="Your API must be compatible with the OpenAI SDK."
          />

          <PasswordInput
            value={apiKey}
            onValueChange={setApiKey}
            label="API Key"
            labelPlacement="outside"
            placeholder="API Key..."
          />

          <Input
            type="number"
            label="Max Context Length"
            placeholder="4096"
            value={contextLength.toString()}
            onValueChange={value => setContextLength(parseInt(value))}
            min={0}
          />
        </>
      )}
    />
  )
}
