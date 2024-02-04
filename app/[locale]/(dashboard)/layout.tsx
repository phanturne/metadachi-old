"use client"

import Sidebar from "@/components/Sidebar"
import { Box } from "@mui/joy"
import { useChatHandler } from "@/lib/hooks/use-chat-handler"
import useHotkey from "@/lib/hooks/use-hotkey"

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
        height: "100%",
        width: "100%",
        overflow: "none"
      }}
    >
      {/*<CommandK />*/}
      <Sidebar />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100dvh",
          alignItems: "center",
          overflow: "auto"
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
