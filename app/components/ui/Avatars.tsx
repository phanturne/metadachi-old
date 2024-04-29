import { useContext } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { Tables } from "@/supabase/types"
import { LLM, ModelProvider } from "@/app/lib/types"
import { ModelIcon } from "@/app/components/models/ModelIcon"
import { Icon } from "@iconify-icon/react"
import { Avatar } from "@nextui-org/react"

export default function MessageAvatar({
  message,
  modelData
}: {
  message: Tables<"messages">
  modelData: LLM
}) {
  const { profile, selectedAssistant, assistantImages } =
    useContext(MetadachiContext)

  const selectedAssistantImage = assistantImages.find(
    image => image.path === selectedAssistant?.image_path
  )?.base64

  const isSystemRole = message.role === "system"
  const isAssistantRole = message.role === "assistant"
  const isUserRole = message.role === "user"

  const name = isSystemRole
    ? "Prompt"
    : isAssistantRole
      ? selectedAssistant
        ? selectedAssistant?.name
        : modelData?.modelName
      : profile?.display_name
        ? profile?.display_name
        : profile?.username

  return (
    <div className="flex items-center space-x-1">
      {isSystemRole && (
        <Avatar
          size="sm"
          className="bg-transparent"
          showFallback
          fallback={
            <Icon icon="solar:settings-linear" width="24" height="24" />
          }
        />
      )}

      {isUserRole && (
        <Avatar size="sm" className="bg-transparent" src={profile?.image_url} />
      )}

      {isAssistantRole && (
        <AssistantAvatar
          selectedAssistantId={selectedAssistant?.id}
          selectedAssistantImage={selectedAssistantImage}
          modelProvider={modelData.provider}
        />
      )}

      <p className="font-semibold">{name}</p>
    </div>
  )
}

export const AssistantAvatar = ({
  selectedAssistantImage,
  modelProvider,
  size = "sm"
}: {
  selectedAssistantId?: string | null
  selectedAssistantImage?: string
  modelProvider?: ModelProvider
  size?: "sm" | "md"
}) => {
  let fontSize = "text-2xl"
  switch (size) {
    case "sm":
      fontSize = "text-2xl"
      break
    case "md":
      fontSize = "text-3xl"
      break
  }

  return selectedAssistantImage ? (
    <Avatar
      size="sm"
      className="shrink-0 bg-transparent"
      showFallback
      src={selectedAssistantImage}
      fallback={<Icon icon="solar:atom-bold-duotone" className={fontSize} />}
    />
  ) : (
    <Avatar
      size="sm"
      className="shrink-0 bg-transparent"
      showFallback
      fallback={<ModelIcon provider={modelProvider} size={size} />}
    />
  )
}
