"use client"

import { useSearchParams } from "next/navigation"
import { Box } from "@mui/joy"
import { useContext, useEffect, useState } from "react"
import AssistantsList from "@/app/components/data-list/items/assistants/AssistantsList"
import PromptsList from "@/app/components/data-list/items/prompts/PromptsList"
import FilesList from "@/app/components/data-list/items/files/FilesList"
import ToolsList from "@/app/components/data-list/items/tools/ToolsList"
import { MetadachiContext } from "@/app/lib/context"
import { getMessagesByChatId } from "@/app/lib/db/messages"
import { LLMID, MessageImage } from "@/app/lib/types"
import { getMessageImageFromStorage } from "@/app/lib/db/storage/message-images"
import { convertBlobToBase64 } from "@/app/lib/utils/blob-to-b64"
import { getMessageFileItemsByMessageId } from "@/app/lib/db/message-file-items"
import { getChatById } from "@/app/lib/db/chats"
import Loading from "@/app/[locale]/loading"
import { getChatFilesByChatId } from "@/app/lib/db/chat-files"
import { ChatFilesDisplay } from "@/app/components/files/ChatFilesDisplay"
import { getAssistantToolsByAssistantId } from "@/app/lib/db/assistant-tools"
import ChatContent from "@/app/components/chat/input/ChatContent"
import { ChatToolsDisplay } from "@/app/components/chat/ChatToolsDisplay"
import { AssistantDisplay } from "@/app/components/chat/AssistantDisplay"
import ChatTabs from "@/app/components/chat/ChatTabs"
import { ChatInput } from "@/app/components/chat/input/ChatInput"
import useHotkey from "@/app/lib/hooks/use-hotkey"
import { useChatHandler } from "@/app/lib/hooks/use-chat-handler"

export default function ChatPage() {
  const searchParams = useSearchParams()
  const chatId = searchParams.get("id")
  const [tab, setTab] = useState(searchParams.get("tab") ?? "chat")

  // Register hotkeys
  const { handleNewChat } = useChatHandler()
  useHotkey("o", () => handleNewChat())

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

  if (loading) {
    return <Loading />
  }

  const isNewChat = !chatId && chatMessages.length == 0

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center"
      }}
    >
      {/*<ChatHeader variant={isNewChat ? "new" : null} />*/}

      {tab === "chat" ? (
        <ChatContent chatId={chatId} />
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
          {tab === "assistants" && <AssistantsList />}
          {tab === "prompts" && <PromptsList />}
          {tab === "files" && <FilesList />}
          {tab === "tools" && <ToolsList />}
        </Box>
      )}

      <Box
        sx={{
          position: "relative",
          width: "300px",
          paddingBottom: 2,
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
        <AssistantDisplay />

        <ChatTabs tab={tab} setTab={setTab} />
        <ChatInput />
      </Box>
    </Box>
  )
}
