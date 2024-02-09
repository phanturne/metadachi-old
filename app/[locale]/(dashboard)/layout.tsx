"use client"

import Sidebar from "@/components/Sidebar"
import { Box } from "@mui/joy"
import { useChatHandler } from "@/lib/hooks/use-chat-handler"
import useHotkey from "@/lib/hooks/use-hotkey"
import ChatSidebar from "@/components/chat/ChatSidebar"

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  // Register hotkeys
  const { handleNewChat } = useChatHandler()
  useHotkey("o", () => handleNewChat())

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        overflow: "hidden"
      }}
    >
      {/*<CommandK />*/}
      <Sidebar />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          overflow: "hidden"
        }}
      >
        {children}
      </Box>
      {/*<div className="absolute bottom-2 right-2 hidden md:block lg:bottom-4 lg:right-4">*/}
      {/*  <HelpButton />*/}
      {/*</div>*/}
    </Box>
  )
}
