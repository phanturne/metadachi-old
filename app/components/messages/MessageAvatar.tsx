import { useContext } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { Box, Tooltip, Typography } from "@mui/joy"
import { AssistantRounded, CreateRounded } from "@mui/icons-material"
import { Tables } from "@/supabase/types"
import { LLM } from "@/app/lib/types"
import Avatar from "@mui/joy/Avatar"
import { ModelIcon } from "@/app/components/models/model-icon"
import Image from "next/image"

const ICON_SIZE = 28

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

  const title = isSystemRole
    ? "Prompt"
    : isAssistantRole
      ? selectedAssistant
        ? selectedAssistant?.name
        : modelData?.modelName
      : profile?.display_name
        ? profile?.display_name
        : profile?.username

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1
      }}
    >
      {isSystemRole && (
        <Avatar size="sm">
          <CreateRounded />
        </Avatar>
      )}

      {isUserRole && <UserAvatar image_url={profile?.image_url} />}

      {isAssistantRole && (
        <AssistantAvatar
          selectedAssistantId={selectedAssistant?.id}
          selectedAssistantImage={selectedAssistantImage}
          modelData={modelData}
        />
      )}

      <Typography fontWeight="bold">{title}</Typography>
    </Box>
  )
}

export const UserAvatar = ({ image_url }: { image_url?: string }) => {
  return <Avatar src={image_url} size="sm"></Avatar>
}

interface AssistantAvatarProps {
  selectedAssistantId?: string | null
  selectedAssistantImage?: string
  modelData: LLM
  size?: number
}

export const AssistantAvatar = ({
  selectedAssistantId: selectedAssistantId,
  selectedAssistantImage,
  modelData,
  size = ICON_SIZE
}: AssistantAvatarProps) => {
  if (selectedAssistantId) {
    return selectedAssistantImage ? (
      <Image
        className="rounded"
        src={selectedAssistantImage || ""}
        alt="assistant image"
        height={size}
        width={size}
      />
    ) : (
      <Avatar size="sm">
        <AssistantRounded />
      </Avatar>
    )
  } else {
    return (
      <Tooltip variant="outlined" title={modelData?.modelName}>
        <ModelIcon provider={modelData?.provider} height={size} width={size} />
      </Tooltip>
    )
  }
}
