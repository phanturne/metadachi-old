// Source: https://github.com/mckaywrigley/chatbot-ui/blob/main/components/sidebar/items/models/create-model.tsx

import { CreateItemModal } from "@/app/components/ui/data-list/CreateItemModal"
import { MetadachiContext } from "@/app/lib/context"
import { MODEL_NAME_MAX } from "@/app/lib/db/limits"
import { TablesInsert } from "@/supabase/types"
import React, { FC, useContext, useState } from "react"
import { Input } from "@nextui-org/react"
import { PasswordInput } from "@/app/components/input"

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
