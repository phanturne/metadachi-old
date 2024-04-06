import { useChatHandler } from "@/app/lib/hooks/use-chat-handler"
import { MetadachiContext } from "@/app/lib/context"
import { LLM_LIST } from "@/app/lib/models/llm/llm-list"
import { Tables } from "@/supabase/types"
import { LLM, MessageImage } from "@/app/lib/types"
import { FC, useContext, useEffect, useRef, useState } from "react"
import { FilePreview } from "../files/FilePreview"
import { MessageActions } from "./MessageActions"
import { MessageMarkdown } from "./MessageMarkdown"
import MessageAvatar from "@/app/components/ui/Avatars"
import { MessageFiles } from "@/app/components/messages/MessageFiles"
import MessagePlaceholder from "@/app/components/messages/MessagePlaceholder"
import { MessageImages } from "@/app/components/messages/MessageImages"
import { Textarea, Button } from "@nextui-org/react"

interface MessageProps {
  message: Tables<"messages">
  fileItems: Tables<"file_items">[]
  isEditing: boolean
  isLast: boolean
  onStartEdit: (message: Tables<"messages">) => void
  onCancelEdit: () => void
  onSubmitEdit: (value: string, sequenceNumber: number) => void
}

export const Message: FC<MessageProps> = ({
  message,
  fileItems,
  isEditing,
  isLast,
  onStartEdit,
  onCancelEdit,
  onSubmitEdit
}) => {
  const {
    isGenerating,
    setIsGenerating,
    firstTokenReceived,
    availableLocalModels,
    availableOpenRouterModels,
    chatMessages
  } = useContext(MetadachiContext)

  const { handleSendMessage } = useChatHandler()

  const editInputRef = useRef<HTMLTextAreaElement>(null)

  const [isHovering, setIsHovering] = useState(false)
  const [editedMessage, setEditedMessage] = useState(message.content)

  const [showImagePreview, setShowImagePreview] = useState(false)
  const [selectedImage, setSelectedImage] = useState<MessageImage | null>(null)

  const [showFileItemPreview, setShowFileItemPreview] = useState(false)
  const [selectedFileItem, setSelectedFileItem] =
    useState<Tables<"file_items"> | null>(null)

  const [viewSources, setViewSources] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
  }

  const handleSendEdit = () => {
    onSubmitEdit(editedMessage, message.sequence_number)
    onCancelEdit()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isEditing && event.key === "Enter" && event.metaKey) {
      handleSendEdit()
    }
  }

  const handleRegenerate = async () => {
    setIsGenerating(true)
    await handleSendMessage(
      editedMessage || chatMessages[chatMessages.length - 2].message.content,
      chatMessages,
      true
    )
  }

  const handleStartEdit = () => {
    onStartEdit(message)
  }

  useEffect(() => {
    setEditedMessage(message.content)

    if (isEditing && editInputRef.current) {
      const input = editInputRef.current
      input.focus()
      input.setSelectionRange(input.value.length, input.value.length)
    }
  }, [isEditing])

  const MODEL_DATA = [
    ...LLM_LIST,
    ...availableLocalModels,
    ...availableOpenRouterModels
  ].find(llm => llm.modelId === message.model) as LLM

  return (
    <div
      className="flex w-full justify-center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onKeyDown={handleKeyDown}
    >
      <div className="relative flex grow flex-col">
        {/* TODO: Move MessageActions to end of message? */}

        <div className="relative mb-2 mt-6 flex flex-col">
          <MessageAvatar message={message} modelData={MODEL_DATA} />
          <div className="absolute right-0 top-0">
            <MessageActions
              onCopy={handleCopy}
              onEdit={handleStartEdit}
              isAssistant={message.role === "assistant"}
              isLast={isLast}
              isEditing={isEditing}
              isHovering={isHovering}
              onRegenerate={handleRegenerate}
            />
          </div>
        </div>

        {/* Message Content */}
        {!firstTokenReceived &&
        isGenerating &&
        isLast &&
        message.role === "assistant" ? (
          <MessagePlaceholder />
        ) : isEditing ? (
          <Textarea
            fullWidth
            ref={editInputRef}
            value={editedMessage}
            onChange={e => setEditedMessage(e.target.value)}
            maxRows={20}
          />
        ) : (
          <MessageMarkdown content={message.content} />
        )}

        <MessageFiles
          fileItems={fileItems}
          viewSources={viewSources}
          setViewSources={setViewSources}
          setSelectedFileItem={setSelectedFileItem}
          setShowFileItemPreview={setShowFileItemPreview}
        />

        <MessageImages
          message={message}
          setSelectedImage={setSelectedImage}
          setShowImagePreview={setShowImagePreview}
        />

        {/* Edit User Message Buttons */}
        {isEditing && (
          <div className="flex justify-center space-x-2">
            <Button size="sm" variant="light" onClick={onCancelEdit}>
              Cancel
            </Button>
            <Button size="sm" color="primary" onClick={handleSendEdit}>
              Save & Send
            </Button>
          </div>
        )}
      </div>

      {showImagePreview && selectedImage && (
        <FilePreview
          type="image"
          item={selectedImage}
          isOpen={showImagePreview}
          onOpenChange={(isOpen: boolean) => {
            setShowImagePreview(isOpen)
            setSelectedImage(null)
          }}
        />
      )}

      {showFileItemPreview && selectedFileItem && (
        <FilePreview
          type="file_item"
          item={selectedFileItem}
          isOpen={showFileItemPreview}
          onOpenChange={(isOpen: boolean) => {
            setShowFileItemPreview(isOpen)
            setSelectedFileItem(null)
          }}
        />
      )}
    </div>
  )
}
