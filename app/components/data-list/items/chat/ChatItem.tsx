import { MetadachiContext } from "@/app/lib/context"
import { LLM_LIST } from "@/app/lib/models/llm/llm-list"
import { Tables } from "@/supabase/types"
import { LLM } from "@/app/lib/types"
import { useParams, useRouter } from "next/navigation"
import { FC, useContext, useState } from "react"
import { DeleteChat } from "./DeleteChat"
import { UpdateChat } from "./UpdateChat"
import { AssistantAvatar } from "@/app/components/messages/MessageAvatar"
import { Box, Typography } from "@mui/joy"
import Button from "@mui/joy/Button"
import { UpdateFolder } from "@/app/components/data-list/items/folders/UpdateFolder"
import { DeleteFolder } from "@/app/components/data-list/items/folders/DeleteFolder"
import * as React from "react"

interface ChatItemProps {
  chat: Tables<"chats">
}

export const ChatItem: FC<ChatItemProps> = ({ chat }) => {
  const [isHovering, setIsHovering] = useState(false)

  const {
    selectedWorkspace,
    selectedChat,
    availableLocalModels,
    assistantImages,
    availableOpenRouterModels
  } = useContext(MetadachiContext)

  const router = useRouter()
  const params = useParams()
  const isActive = params.chatid === chat.id || selectedChat?.id === chat.id

  const handleClick = () => {
    if (!selectedWorkspace) return
    return router.push(`/chat/?id=${chat.id}`)
  }

  const MODEL_DATA = [
    ...LLM_LIST,
    ...availableLocalModels,
    ...availableOpenRouterModels
  ].find(llm => llm.modelId === chat.model) as LLM

  const assistantImage = assistantImages.find(
    image => image.assistantId === chat.assistant_id
  )?.base64

  return (
    <Button
      size="sm"
      variant={isActive ? "soft" : "plain"}
      color="neutral"
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      sx={{ width: "100%", overflow: "hidden", textAlign: "start", px: 1 }}
      startDecorator={
        <AssistantAvatar
          selectedAssistantId={chat.assistant_id}
          selectedAssistantImage={assistantImage}
          modelData={MODEL_DATA}
        />
      }
      endDecorator={
        <>
          {(isActive || isHovering) && (
            <Box
              onClick={e => {
                e.stopPropagation()
                e.preventDefault()
              }}
              sx={{ display: "flex", flexShrink: 0 }}
            >
              <UpdateChat chat={chat} />
              <DeleteChat chat={chat} />
            </Box>
          )}
        </>
        //
        // <Box
        //   onClick={e => e.stopPropagation()}
        //   sx={{
        //     display: "flex",
        //     opacity: isActive ? 1 : 0,
        //     "&:hover": {
        //       opacity: 1
        //     }
        //   }}
        // >
        //   <UpdateChat chat={chat} />
        //   <DeleteChat chat={chat} />
        // </Box>
      }
    >
      <Typography
        noWrap
        level="body-sm"
        sx={{
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}
      >
        {chat.name}
      </Typography>
    </Button>
  )
}
