import { CreateItemModal } from "@/app/components/data-list/shared/CreateItemModal"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { MetadachiContext } from "@/app/lib/context"
import { MODEL_NAME_MAX } from "@/app/lib/db/limits"
import { TablesInsert } from "@/supabase/types"
import { FC, useContext, useState } from "react"

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
          model_id: modelId,
          name
        } as TablesInsert<"models">
      }
      renderInputs={() => (
        <>
          <div className="space-y-1.5 text-sm">
            <div>Create a custom model.</div>

            <div>
              Your API <span className="font-bold">*must*</span> be compatible
              with the OpenAI SDK.
            </div>
          </div>

          <div className="space-y-1">
            <Label>Name</Label>

            <Input
              placeholder="Model name..."
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={MODEL_NAME_MAX}
            />
          </div>

          <div className="space-y-1">
            <Label>Model ID</Label>

            <Input
              placeholder="Model ID..."
              value={modelId}
              onChange={e => setModelId(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label>Base URL</Label>

            <Input
              placeholder="Base URL..."
              value={baseUrl}
              onChange={e => setBaseUrl(e.target.value)}
            />

            <div className="pt-1 text-xs italic">
              Your API must be compatible with the OpenAI SDK.
            </div>
          </div>

          <div className="space-y-1">
            <Label>API Key</Label>

            <Input
              type="password"
              placeholder="API Key..."
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
            />
          </div>
        </>
      )}
    />
  )
}