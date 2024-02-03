"use client"

import Sidebar from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { Box } from "@mui/joy"
import { SIDEBAR_WIDTH } from "@/lib/constants"
import { IconChevronCompactRight } from "@tabler/icons-react"
import { useChatHandler } from "@/lib/hooks/use-chat-handler"
import useHotkey from "@/lib/hooks/use-hotkey"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { HelpButton } from "@/components/chat/help-button"

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  // Register hotkeys
  const { handleNewChat } = useChatHandler()
  useHotkey("s", () => setShowSidebar(prevState => !prevState))
  useHotkey("o", () => handleNewChat())

  const [showSidebar, setShowSidebar] = useState(
    (localStorage.getItem("showSidebar") ?? "true") === "true"
  )

  // const [loading, setLoading] = useState(true)
  // useEffect(() => {
  //   ;(async () => {
  //     const session = (await supabase.auth.getSession()).data.session
  //
  //     if (!session) {
  //       router.push("/login")
  //     } else {
  //       setLoading(false)
  //     }
  //   })()
  // }, [])
  //
  // if (loading) {
  //   return null
  // }

  const handleToggleSidebar = () => {
    setShowSidebar(prevState => !prevState)
    localStorage.setItem("showSidebar", String(!showSidebar))
  }

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

      {/* TODO: Change to Menu Button*/}
      <Button
        className={cn(
          "absolute left-[4px] top-[50%] z-10 h-[32px] w-[32px] cursor-pointer"
        )}
        style={{
          marginLeft: showSidebar ? `${SIDEBAR_WIDTH}px` : "0px",
          transform: showSidebar ? "rotate(180deg)" : "rotate(0deg)"
        }}
        variant="ghost"
        size="icon"
        onClick={handleToggleSidebar}
      >
        <IconChevronCompactRight size={24} />
      </Button>

      {showSidebar && <Sidebar />}

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
      <div className="absolute bottom-2 right-2 hidden md:block lg:bottom-4 lg:right-4">
        <HelpButton />
      </div>
    </Box>
  )
}
