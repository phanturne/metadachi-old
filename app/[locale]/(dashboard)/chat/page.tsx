"use client"

import { useSearchParams } from "next/navigation"
import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { getMessagesByChatId } from "@/app/lib/db/messages"
import { LLMID, MessageImage } from "@/app/lib/types"
import { getMessageImageFromStorage } from "@/app/lib/db/storage/message-images"
import { convertBlobToBase64 } from "@/app/lib/utils/blob-to-b64"
import { getMessageFileItemsByMessageId } from "@/app/lib/db/message-file-items"
import { getChatById } from "@/app/lib/db/chats"
import Loading from "@/app/[locale]/loading"
import { getChatFilesByChatId } from "@/app/lib/db/chat-files"
import { getAssistantToolsByAssistantId } from "@/app/lib/db/assistant-tools"
import useHotkey from "@/app/lib/hooks/use-hotkey"
import { useChatHandler } from "@/app/lib/hooks/use-chat-handler"
import ChatSettingsCard from "@/app/components/chat/ChatSettingsCard"
import ChatListCard from "@/app/components/chat/ChatListCard"
import { Button, ScrollShadow } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"
import { useScroll } from "@/app/lib/hooks/use-scroll"
import { NewChatContent } from "@/app/components/chat/NewChatContent"
import ChatMessages from "@/app/components/chat/ChatMessages"
import { ChatInput } from "@/app/components/chat/input/ChatInput"
import PromptSuggestions from "@/app/components/chat/PromptSuggestions"
import { ChatCommands } from "@/app/components/chat/input/ChatCommands"
import { toast } from "sonner"
import FileDropzoneContainer from "@/app/components/files/FileDropzoneContainer"

export default function ChatPage() {
  const searchParams = useSearchParams()
  const chatId = searchParams.get("id")

  // Register hotkeys
  const { handleNewChat, handleFocusChatInput } = useChatHandler()
  useHotkey("o", () => handleNewChat())

  const { messagesStartRef, messagesEndRef } = useScroll()

  useEffect(() => {
    handleFocusChatInput()
  }, [])

  const {
    chatMessages,
    setChatMessages,
    setSelectedChat,
    setChatSettings,
    setChatImages,
    assistants,
    setSelectedAssistant,
    setChatFileItems,
    setChatFiles,
    setShowFilesDisplay,
    setUseRetrieval,
    setSelectedTools
  } = useContext(MetadachiContext)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await fetchMessages()
      await fetchChat()
    }

    if (chatId) {
      fetchData().then(() => {
        setLoading(false)
      })
    } else {
      setChatMessages([])
      setChatFiles([])
      setChatImages([])
      setChatFileItems([])
      setSelectedChat(null)
      setLoading(false)
    }
  }, [searchParams])

  const fetchMessages = async () => {
    const fetchedMessages = await getMessagesByChatId(chatId as string)

    const imagePromises: Promise<MessageImage>[] = fetchedMessages.flatMap(
      message =>
        message.image_paths
          ? message.image_paths.map(async imagePath => {
              const url = await getMessageImageFromStorage(imagePath)

              if (url) {
                const response = await fetch(url)
                const blob = await response.blob()
                const base64 = await convertBlobToBase64(blob)

                return {
                  messageId: message.id,
                  path: imagePath,
                  base64,
                  url,
                  file: null
                }
              }

              return {
                messageId: message.id,
                path: imagePath,
                base64: "",
                url,
                file: null
              }
            })
          : []
    )

    const images: MessageImage[] = await Promise.all(imagePromises.flat())
    setChatImages(images)

    const messageFileItemPromises = fetchedMessages.map(
      async message => await getMessageFileItemsByMessageId(message.id)
    )

    const messageFileItems = await Promise.all(messageFileItemPromises)

    const uniqueFileItems = messageFileItems.flatMap(item => item.file_items)
    setChatFileItems(uniqueFileItems)

    const chatFiles = await getChatFilesByChatId(chatId as string)

    setChatFiles(
      chatFiles.files.map(file => ({
        id: file.id,
        name: file.name,
        type: file.type,
        file: null
      }))
    )

    setUseRetrieval(true)
    setShowFilesDisplay(true)

    const fetchedChatMessages = fetchedMessages.map(message => {
      return {
        message,
        fileItems: messageFileItems
          .filter(messageFileItem => messageFileItem.id === message.id)
          .flatMap(messageFileItem =>
            messageFileItem.file_items.map(fileItem => fileItem.id)
          )
      }
    })

    setChatMessages(fetchedChatMessages)
  }

  const fetchChat = async () => {
    const chat = await getChatById(chatId as string)
    if (!chat) return

    if (chat.assistant_id) {
      const assistant = assistants.find(
        assistant => assistant.id === chat.assistant_id
      )

      if (assistant) {
        setSelectedAssistant(assistant)

        const assistantTools = (
          await getAssistantToolsByAssistantId(assistant.id)
        ).tools
        setSelectedTools(assistantTools)
      }
    }

    setSelectedChat(chat)
    setChatSettings({
      model: chat.model as LLMID,
      prompt: chat.prompt,
      temperature: chat.temperature,
      contextLength: chat.context_length,
      includeProfileContext: chat.include_profile_context,
      includeWorkspaceInstructions: chat.include_workspace_instructions,
      embeddingsProvider: chat.embeddings_provider as "openai" | "local"
    })
  }

  const isNewChat = !chatId && chatMessages.length == 0

  if (loading) {
    return <Loading />
  }

  return (
    <FileDropzoneContainer>
      {/* Chat Sidebar*/}
      <div className="m-4 flex w-72 flex-col gap-4">
        <ChatActions />
        <ChatSettingsCard />
        <ChatListCard />
      </div>

      <div className="flex grow flex-col overflow-auto">
        {/* Chat Body*/}
        <ScrollShadow className="flex h-full flex-col overflow-y-scroll px-20">
          {!chatId && chatMessages.length === 0 ? (
            <NewChatContent />
          ) : (
            <>
              <div ref={messagesStartRef} />
              <ChatMessages />
              <div ref={messagesEndRef} />
            </>
          )}
        </ScrollShadow>

        <div className="relative flex w-full flex-col gap-4 px-20 py-4">
          <ChatCommands />
          {isNewChat && <PromptSuggestions />}
          <form className="flex w-full flex-col items-start rounded-medium bg-default-100 transition-colors hover:bg-default-200/70">
            {/*{images.length > 0 && <ChatInputFilesList />}*/}
            <ChatInput />
          </form>
        </div>
      </div>
    </FileDropzoneContainer>
  )
}

function ChatActions() {
  const { handleNewChat } = useChatHandler()

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied to clipboard.")
  }

  return (
    <div className="flex justify-between gap-2">
      <Button
        size="sm"
        className="grow"
        startContent={
          <Icon icon="solar:pen-new-square-linear" className="text-base" />
        }
        onClick={handleNewChat}
      >
        New Chat
      </Button>

      <Button
        size="sm"
        variant="flat"
        className="grow"
        startContent={
          <Icon icon="solar:square-share-line-linear" className="text-base" />
        }
        onClick={handleShare}
      >
        Share
      </Button>
    </div>
  )
}
