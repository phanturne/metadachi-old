"use client"

import { ChatInput } from "@/components/chat/chat-input"
import FileDropzoneContainer from "@/components/FileDropzoneContainer"
import NewChatContent from "@/app/[locale]/(dashboard)/chat/NewChatContent"
import { useSearchParams } from "next/navigation"
import { Box } from "@mui/joy"
import ChatTabs from "@/components/ChatTabs"

export default function ChatPage() {
  const searchParams = useSearchParams()

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
        <NewChatContent />

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
          <ChatTabs tab="chat" />
          <ChatInput />
        </Box>
      </Box>
    </FileDropzoneContainer>
  )
}