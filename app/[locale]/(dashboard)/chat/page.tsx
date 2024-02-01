"use client"

import { ChatInput } from "@/components/chat/chat-input"
import FileDropzoneContainer from "@/components/FileDropzoneContainer"
import ChatTabContent from "@/app/[locale]/(dashboard)/chat/(chat-tabs)/ChatTabContent"
import { useSearchParams } from "next/navigation"
import { Box } from "@mui/joy"
import ChatTabs from "@/components/ChatTabs"
import { useContext, useEffect, useState } from "react"
import AssistantsTabContent from "@/app/[locale]/(dashboard)/chat/(chat-tabs)/AssistantsTabContent"
import PromptsTabContent from "@/app/[locale]/(dashboard)/chat/(chat-tabs)/PromptsTabContent"
import FilesTabContent from "@/app/[locale]/(dashboard)/chat/(chat-tabs)/FilesTabContent"
import ToolsTabContent from "@/app/[locale]/(dashboard)/chat/(chat-tabs)/ToolsTabContent"
import { ChatbotUIContext } from "@/context/context"
import { getMessagesByChatId } from "@/db/messages"
import { LLMID, MessageImage } from "@/types"
import { getMessageImageFromStorage } from "@/db/storage/message-images"
import { convertBlobToBase64 } from "@/lib/blob-to-b64"
import { getMessageFileItemsByMessageId } from "@/db/message-file-items"
import { getFileById } from "@/db/files"
import { getChatById } from "@/db/chats"
import Loading from "@/app/[locale]/loading"
import ChatHeader from "@/components/chat/ChatHeader"

export default function ChatPage() {
  const searchParams = useSearchParams()
  const chatId = searchParams.get("id")
  const [tab, setTab] = useState(searchParams.get("tab") ?? "chat")

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
    setUseRetrieval
  } = useContext(ChatbotUIContext)

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

    const uniqueFileIds = [
      ...new Set(uniqueFileItems.map(item => item.file_id))
    ]

    if (uniqueFileIds.length > 0) {
      const fileFetchPromises = uniqueFileIds.map(async fileId => {
        const file = await getFileById(fileId)
        return file
      })

      const files = await Promise.all(fileFetchPromises)
      setChatFiles(
        files.map(file => ({
          id: file.id,
          name: file.name,
          type: file.type,
          file: null
        }))
      )

      setUseRetrieval(true)
      setShowFilesDisplay(true)
    } else {
      setUseRetrieval(false)
      setShowFilesDisplay(false)
      setChatFiles([])
    }

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

  if (loading) {
    return <Loading />
  }

  const isNewChat = !chatId && chatMessages.length == 0

  return (
    <FileDropzoneContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center"
        }}
      >
        <ChatHeader variant={isNewChat ? "new" : null} />

        {tab === "chat" ? (
          <ChatTabContent chatId={chatId} />
        ) : (
          <Box
            sx={{
              display: "flex",
              height: "100%",
              width: "100%",
              overflow: "scroll",
              px: 10
            }}
          >
            {tab === "assistants" && <AssistantsTabContent />}
            {tab === "prompts" && <PromptsTabContent />}
            {tab === "files" && <FilesTabContent />}
            {tab === "tools" && <ToolsTabContent />}
          </Box>
        )}

        <Box
          sx={{
            position: "relative",
            width: "300px",
            paddingBottom: "8px",
            paddingTop: "5px",
            minWidth: {
              xs: "300px",
              sm: "400px",
              md: "500px",
              lg: "660px",
              xl: "800px"
            }
          }}
        >
          <ChatTabs tab={tab} setTab={setTab} />
          <ChatInput />
        </Box>
      </Box>
    </FileDropzoneContainer>
  )
}
