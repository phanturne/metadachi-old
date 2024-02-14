import { Routes } from "@/lib/constants"
import { SidebarItem } from "@/components/sidebar/SidebarItem"
import { AddCircleOutlineRounded } from "@mui/icons-material"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import ListItemContent from "@mui/joy/ListItemContent"
import Typography from "@mui/joy/Typography"
import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { toast } from "sonner"
import { ChatbotUIContext } from "@/context/context"
import { Session } from "@supabase/gotrue-js"
import { supabase } from "@/lib/supabase/browser-client"
import { router } from "next/client"

export function NewChatButton({ isShrunk }: { isShrunk?: boolean }) {
  const { selectedWorkspace, setSelectedWorkspace, workspaces } =
    useContext(ChatbotUIContext)
  const [session, setSession] = useState<Session | null>(null)
  const homeWorkspace = workspaces.find(w => w.is_home)

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = (await supabase.auth.getSession()).data.session
      setSession(sessionData)
    }

    fetchSession()
  }, [])

  const handleNewChat = async () => {
    // User must be logged in to create a new chat
    if (!session) {
      toast.error("You must be logged in to create a new chat")
    }

    let workspaceId = selectedWorkspace?.id
    if (!workspaceId && homeWorkspace) {
      setSelectedWorkspace(homeWorkspace)
      workspaceId = homeWorkspace.id
    }

    if (!workspaceId) {
      toast.error("No workspace found")
    }

    return router.push(`/${Routes.Chat}`)
  }

  return (
    <SidebarItem onClick={handleNewChat}>
      {isShrunk ? (
        <AddCircleOutlineRounded />
      ) : (
        <>
          <ListItemDecorator>{<AddCircleOutlineRounded />}</ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">New Chat</Typography>
          </ListItemContent>
        </>
      )}
    </SidebarItem>
  )
}
