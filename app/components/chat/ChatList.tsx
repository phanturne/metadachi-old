import * as React from "react"
import { FC, useContext, useState } from "react"
import { ContentType, LLM } from "@/app/lib/types"
import { DataListItemWrapper } from "@/app/components/ui/data-list/DataListItemWrapper"
import { getSortedData } from "@/app/lib/utils/date-utils"
import { Tables } from "@/supabase/types"
import { MetadachiContext } from "@/app/lib/context"
import { useParams, useRouter } from "next/navigation"
import { LLM_LIST } from "@/app/lib/models/llm/llm-list"
import { AssistantAvatar } from "@/app/components/ui/Avatars"
import { useChatHandler } from "@/app/lib/hooks/use-chat-handler"
import { deleteChat, updateChat } from "@/app/lib/db/chats"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input
} from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

interface ChatsViewProps {
  displayedFiles: any[]
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>) => void
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void
  contentType: ContentType
}

export const ChatList: FC<ChatsViewProps> = ({
  displayedFiles,
  handleDrop,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDragStart,
  contentType
}) => {
  return (
    <>
      {["Today", "Yesterday", "Previous Week", "Older"].map(dateCategory => {
        const sortedData = getSortedData(
          displayedFiles,
          dateCategory as "Today" | "Yesterday" | "Previous Week" | "Older"
        )
        return (
          sortedData.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-semibold leading-none text-default-500">
                {dateCategory}
              </h4>

              <div
                className="flex grow flex-col pb-2"
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
              >
                {sortedData.map((item: any) => (
                  <div
                    key={item.id}
                    draggable="true"
                    onDragStart={e => handleDragStart(e, item.id)}
                  >
                    <DataListItemWrapper
                      contentType={contentType}
                      item={item}
                    />
                  </div>
                ))}
              </div>
            </div>
          )
        )
      })}
    </>
  )
}

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
    // TODO: Fix bug where opening a update/delete modal won't trigger onMouseLeave()
    <Button
      variant={isActive ? "flat" : "light"}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="w-full overflow-hidden px-2"
      startContent={
        <AssistantAvatar
          selectedAssistantId={chat.assistant_id}
          selectedAssistantImage={assistantImage}
          modelProvider={MODEL_DATA?.provider}
        />
      }
      endContent={
        <>
          {(isActive || isHovering) && (
            <>
              <UpdateChat chat={chat} />
              <DeleteChat chat={chat} />
            </>
          )}
        </>
      }
    >
      <p className="grow overflow-hidden text-ellipsis text-left">
        {chat.name}
      </p>
    </Button>
  )
}

interface DeleteChatProps {
  chat: Tables<"chats">
}

const DeleteChat: FC<DeleteChatProps> = ({ chat }) => {
  const { setChats } = useContext(MetadachiContext)
  const { handleNewChat } = useChatHandler()

  const [open, setOpen] = useState(false)

  const handleDeleteChat = async () => {
    await deleteChat(chat.id)
    setChats(prevState => prevState.filter(c => c.id !== chat.id))
    setOpen(false)
    handleNewChat()
  }

  return (
    <>
      <Button
        isIconOnly
        variant="light"
        onClick={() => setOpen(true)}
        size="sm"
        className="-ml-2"
      >
        <Icon icon="solar:trash-bin-2-linear" className="text-base" />
      </Button>
      <Modal isOpen={open} onOpenChange={() => setOpen(false)}>
        <ModalContent>
          <ModalHeader>{`Delete "${chat.name}"`}</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this chat?</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button color="danger" onClick={handleDeleteChat}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

interface UpdateChatProps {
  chat: Tables<"chats">
}

const UpdateChat: FC<UpdateChatProps> = ({ chat }) => {
  const { setChats } = useContext(MetadachiContext)

  const [open, setOpen] = useState(false)
  const [name, setName] = useState(chat.name)

  const handleUpdateChat = async () => {
    const updatedChat = await updateChat(chat.id, {
      name
    })
    setChats(prevState =>
      prevState.map(c => (c.id === chat.id ? updatedChat : c))
    )

    setOpen(false)
  }

  return (
    <>
      <Button
        isIconOnly
        variant="light"
        onClick={() => setOpen(true)}
        size="sm"
        className="-ml-2"
      >
        <Icon icon="solar:pen-linear" className="text-base" />
      </Button>
      <Modal isOpen={open} onOpenChange={() => setOpen(false)}>
        <ModalContent>
          <ModalHeader>{`Edit chats`}</ModalHeader>
          <ModalBody>
            <Input
              isRequired
              label="Chat Name"
              value={name}
              onValueChange={setName}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleUpdateChat}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
