import { MetadachiContext } from "@/app/lib/context"
import { createChat } from "@/app/lib/db/chats"
import { Tables } from "@/supabase/types"
import { ContentType, DataItemType } from "@/app/lib/types"
import { useRouter } from "next/navigation"
import { FC, useContext, useRef, useState } from "react"
import { UpdateItemModal } from "./UpdateItemModal"
import { Button, Typography } from "@mui/joy"

interface SidebarItemProps {
  item: DataItemType
  isTyping: boolean
  contentType: ContentType
  icon: React.ReactNode
  updateState: any
  renderInputs: (renderState: any) => JSX.Element
}

export const DataListItem: FC<SidebarItemProps> = ({
  item,
  contentType,
  updateState,
  renderInputs,
  icon,
  isTyping
}) => {
  const { selectedWorkspace, setChats, setSelectedAssistant } =
    useContext(MetadachiContext)

  const router = useRouter()

  const itemRef = useRef<HTMLDivElement>(null)

  const [isHovering, setIsHovering] = useState(false)
  const [open, setOpen] = useState(false)

  const actionMap = {
    chats: async (item: any) => {},
    presets: async (item: any) => {},
    prompts: async (item: any) => {},
    files: async (item: any) => {},
    collections: async (item: any) => {},
    assistants: async (assistant: Tables<"assistants">) => {
      if (!selectedWorkspace) return

      const createdChat = await createChat({
        user_id: assistant.user_id,
        workspace_id: selectedWorkspace.id,
        assistant_id: assistant.id,
        context_length: assistant.context_length,
        include_profile_context: assistant.include_profile_context,
        include_workspace_instructions:
          assistant.include_workspace_instructions,
        model: assistant.model,
        name: `Chat with ${assistant.name}`,
        prompt: assistant.prompt,
        temperature: assistant.temperature,
        embeddings_provider: assistant.embeddings_provider
      })

      setChats(prevState => [createdChat, ...prevState])
      setSelectedAssistant(assistant)

      return router.push(`/chat/?id=${createdChat.id}`)
    },
    tools: async (item: any) => {},
    models: async (item: any) => {}
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.stopPropagation()
      itemRef.current?.click()
    }
  }

  // const handleClickAction = async (
  //   e: React.MouseEvent<SVGSVGElement, MouseEvent>
  // ) => {
  //   e.stopPropagation()

  //   const action = actionMap[contentType]

  //   await action(item as any)
  // }

  return (
    <>
      <Button
        variant="plain"
        color="neutral"
        sx={{
          p: 1,
          overflow: "hidden",
          "&:hover": {
            bgcolor: "transparent",
            opacity: 0.5
          }
        }}
        startDecorator={icon}
        onClick={() => setOpen(true)}
      >
        <Typography
          noWrap
          sx={{
            pl: 1,
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {item.name}
        </Typography>

        {/* TODO */}
        {/* {isHovering && (
          <WithTooltip
            delayDuration={1000}
            display={<div>Start chat with {contentType.slice(0, -1)}</div>}
            trigger={
              <IconSquarePlus
                className="cursor-pointer hover:text-blue-500"
                size={20}
                onClick={handleClickAction}
              />
            }
          />
        )} */}
      </Button>

      <UpdateItemModal
        open={open}
        setOpen={setOpen}
        item={item}
        isTyping={isTyping}
        contentType={contentType}
        updateState={updateState}
        renderInputs={renderInputs}
      />
    </>
  )
}
