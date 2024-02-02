import { IconMoodSmile, IconPencil, IconRobotFace } from "@tabler/icons-react"
import Image from "next/image"
import { WithTooltip } from "@/components/ui/with-tooltip"
import { ModelIcon } from "@/components/models/model-icon"
import { LLM, LLMID } from "@/types"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Tables } from "@/supabase/types"
import { useContext } from "react"
import { ChatbotUIContext } from "@/context/context"

const ICON_SIZE = 28

export default function MessageAvatar({
  message,
  modelData
}: {
  message: Tables<"messages">
  modelData: LLM
}) {
  const { profile, selectedAssistant, assistantImages } =
    useContext(ChatbotUIContext)
  const selectedAssistantImage = assistantImages.find(
    image => image.path === selectedAssistant?.image_path
  )?.base64

  return (
    <>
      {message.role === "system" ? (
        <div className="flex items-center space-x-4">
          <IconPencil
            className="border-primary bg-primary text-secondary rounded border-[1px] p-1"
            size={ICON_SIZE}
          />

          <div className="text-lg font-semibold">Prompt</div>
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          {message.role === "assistant" ? (
            selectedAssistant ? (
              selectedAssistantImage ? (
                <Image
                  className="rounded"
                  src={selectedAssistantImage || ""}
                  alt="assistant image"
                  height={ICON_SIZE}
                  width={ICON_SIZE}
                />
              ) : (
                <IconRobotFace
                  className="bg-primary text-secondary border-primary rounded border-[1px] p-1"
                  size={ICON_SIZE}
                />
              )
            ) : (
              <WithTooltip
                display={<div>{modelData.modelName}</div>}
                trigger={
                  <ModelIcon
                    provider={modelData.provider}
                    height={ICON_SIZE}
                    width={ICON_SIZE}
                  />
                }
              />
            )
          ) : profile?.image_url ? (
            <Avatar className={`h-[28px] w-[28px] rounded`}>
              <AvatarImage src={profile?.image_url} />
            </Avatar>
          ) : (
            <IconMoodSmile
              className="bg-primary text-secondary border-primary rounded border-[1px] p-1"
              size={ICON_SIZE}
            />
          )}

          <div className="font-semibold">
            {message.role === "assistant"
              ? selectedAssistant
                ? selectedAssistant?.name
                : modelData?.modelName
              : profile?.display_name ?? profile?.username}
          </div>
        </div>
      )}
    </>
  )
}
