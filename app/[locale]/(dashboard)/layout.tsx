"use client"

import Sidebar from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import useHotkey from "@/lib/hooks/use-hotkey"
import { cn } from "@/lib/utils"
import { ContentType } from "@/types"
import { IconChevronCompactRight } from "@tabler/icons-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { CommandK } from "@/components/utility/command-k"
import { Box } from "@mui/joy"
import { supabase } from "@/lib/supabase/browser-client"
import { HelpButton } from "@/components/chat/help-button"
import { useChatHandler } from "@/lib/hooks/use-chat-handler"
import { SIDEBAR_WIDTH } from "@/lib/constants"

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  // Register hotkeys
  const { handleNewChat } = useChatHandler()
  useHotkey("s", () => setShowSidebar(prevState => !prevState))
  useHotkey("o", () => handleNewChat())

  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabValue = searchParams.get("tab") || "chats"

  const [contentType, setContentType] = useState<ContentType>(
    tabValue as ContentType
  )

  const [showSidebar, setShowSidebar] = useState(
    localStorage.getItem("showSidebar") === "true"
  )

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    ;(async () => {
      const session = (await supabase.auth.getSession()).data.session

      if (!session) {
        router.push("/login")
      } else {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return null
  }

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
      <CommandK />

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

      {/*TODO: Redesign Sidebar*/}
      {showSidebar && <Sidebar />}
      {/*<div className={cn("border-r-2 duration-200 dark:border-none")}>*/}
      {/*  {showSidebar && (*/}
      {/*    <Sidebar />*/}
      {/*  )}*/}
      {/*</div>*/}
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
