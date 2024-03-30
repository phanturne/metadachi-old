"use client"

import { MetadachiContext } from "@/app/lib/context"
import * as React from "react"
import { useContext, useEffect } from "react"
import { Box } from "@mui/joy"
import { useChatHandler } from "@/app/lib/hooks/use-chat-handler"
import { useScroll } from "@/app/lib/hooks/use-scroll"
import ChatMessages from "@/app/components/chat/ChatMessages"
import { NewChatContent } from "@/app/components/chat/NewChatContent"

export default function ChatContent({ chatId }: { chatId: string | null }) {
  const { chatMessages } = useContext(MetadachiContext)
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
