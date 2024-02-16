"use client"

import Sidebar from "@/app/components/sidebar/Sidebar"
import { Box } from "@mui/joy"
import { useChatHandler } from "@/app/lib/hooks/use-chat-handler"
import useHotkey from "@/app/lib/hooks/use-hotkey"
import ChatSidebar from "@/app/[locale]/(dashboard)/(workspace)/chat/components/ChatSidebar"

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
