"use client"

import { ChatbotUIContext } from "@/context/context"
import { useContext, useEffect } from "react"
import { Box, Typography } from "@mui/joy"
import { AutoAwesomeRounded } from "@mui/icons-material"
import { useChatHandler } from "@/lib/hooks/use-chat-handler"
import { useScroll } from "@/lib/hooks/use-scroll"
import ChatMessages from "@/components/chat/ChatMessages"

export default function ChatTab({ chatId }: { chatId: string | null }) {
  const { chatMessages } = useContext(ChatbotUIContext)
  const { handleFocusChatInput } = useChatHandler()
  const { messagesStartRef, messagesEndRef } = useScroll()

  useEffect(() => {
    handleFocusChatInput()
  }, [])

  const NewChatContent = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <AutoAwesomeRounded />
        <Typography level="title-lg" sx={{ mt: 2, mb: 5 }}>
          How may I help you today?
        </Typography>
      </Box>
    )
  }

  const ExistingChatContent = () => {
    return (
      <>
        <div ref={messagesStartRef} />
        <ChatMessages />
        <div ref={messagesEndRef} />
      </>
    )
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflowY: "auto"
      }}
    >
      {!chatId && chatMessages.length === 0 ? (
        <NewChatContent />
      ) : (
        <ExistingChatContent />
      )}
    </Box>
  )
}
