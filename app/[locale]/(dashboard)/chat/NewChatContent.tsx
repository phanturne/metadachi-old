"use client"

import { ChatSettings } from "@/components/chat/chat-settings"
import { ChatUI } from "@/components/chat/chat-ui"
import { QuickSettings } from "@/components/chat/quick-settings"
import { Brand } from "@/components/ui/brand"
import { ChatbotUIContext } from "@/context/context"
import { useTheme } from "next-themes"
import { useContext } from "react"
import { Box } from "@mui/joy"

export default function NewChatContent() {
  const { chatMessages } = useContext(ChatbotUIContext)

  const { theme } = useTheme()

  return (
    <>
      {chatMessages.length === 0 ? (
        <Box
          sx={{
            position: "relative",
            display: "flex",
            width: "100%",
            flexGrow: 1,
            overflow: "scroll",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div className="top-50% left-50% -translate-x-50% -translate-y-50% absolute mb-20">
            <Brand theme={theme === "dark" ? "dark" : "light"} />
          </div>

          <div className="flex grow flex-col items-center justify-center" />
        </Box>
      ) : (
        <ChatUI />
      )}
    </>
  )
}
