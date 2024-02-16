"use client"

import { ChatbotUIContext } from "@/context/context"
import * as React from "react"
import { useContext, useEffect } from "react"
import { Box } from "@mui/joy"
import { useChatHandler } from "@/lib/hooks/use-chat-handler"
import { useScroll } from "@/lib/hooks/use-scroll"
import ChatMessages from "@/app/[locale]/(dashboard)/(workspace)/chat/_components/ChatMessages"
import { NewChatContent } from "@/app/[locale]/(dashboard)/(workspace)/chat/_components/NewChatContent"

export default function ChatsCollection({ chatId }: { chatId: string | null }) {
  const { chatMessages } = useContext(ChatbotUIContext)
  const { handleFocusChatInput } = useChatHandler()
  const { messagesStartRef, messagesEndRef } = useScroll()

  useEffect(() => {
    handleFocusChatInput()
  }, [])

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
        <>
          <div ref={messagesStartRef} />
          <ChatMessages />
          <div ref={messagesEndRef} />
        </>
      )}
    </Box>
  )
}
