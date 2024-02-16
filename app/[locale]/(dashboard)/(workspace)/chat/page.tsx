"use client"

import { ChatInput } from "@/app/[locale]/(dashboard)/(workspace)/chat/_components/ChatInput"
import FileDropzoneContainer from "@/components/ui/FileDropzoneContainer"
import ChatsCollection from "@/components/collections/types/ChatsCollection"
import { useSearchParams } from "next/navigation"
import { Box } from "@mui/joy"
import ChatTabs from "@/app/[locale]/(dashboard)/(workspace)/chat/_components/ChatTabs"
import { useContext, useEffect, useState } from "react"
import AssistantsCollection from "@/components/collections/types/AssistantsCollection"
import PromptsCollection from "@/components/collections/types/PromptsCollection"
import FilesCollection from "@/components/collections/types/FilesCollection"
import ToolsCollection from "@/components/collections/types/ToolsCollection"
import { ChatbotUIContext } from "@/context/context"
import { getMessagesByChatId } from "@/db/messages"
import { LLMID, MessageImage } from "@/types"
import { getMessageImageFromStorage } from "@/db/storage/message-images"
import { convertBlobToBase64 } from "@/lib/blob-to-b64"
import { getMessageFileItemsByMessageId } from "@/db/message-file-items"
import { getChatById } from "@/db/chats"
import Loading from "@/app/[locale]/loading"
import ChatHeader from "@/app/[locale]/(dashboard)/(workspace)/chat/_components/ChatHeader"
import { getChatFilesByChatId } from "@/db/chat-files"
import { ChatFilesDisplay } from "@/components/files/chat-files-display"
import { ChatToolsDisplay } from "@/app/[locale]/(dashboard)/(workspace)/chat/_components/ChatToolsDisplay"

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
    setTab(searchParams.get("tab") ?? "chat")
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
          <ChatsCollection chatId={chatId} />
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
            {tab === "assistants" && <AssistantsCollection />}
            {tab === "prompts" && <PromptsCollection />}
            {tab === "files" && <FilesCollection />}
            {tab === "tools" && <ToolsCollection />}
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
          <ChatToolsDisplay />
          <ChatFilesDisplay />
          <ChatTabs tab={tab} setTab={setTab} />
          <ChatInput />
        </Box>
      </Box>
    </FileDropzoneContainer>
  )
}
