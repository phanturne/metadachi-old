"use client"

import * as React from "react"
import { useContext, useEffect, useState } from "react"
import Box from "@mui/joy/Box"
import List from "@mui/joy/List"
import ListItemContent from "@mui/joy/ListItemContent"
import Sheet from "@mui/joy/Sheet"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import { useRouter } from "next/navigation"
import {
  AddCircleOutlineRounded,
  AutoAwesomeRounded,
  ChatRounded,
  CollectionsBookmarkRounded,
  ExploreRounded,
  HomeRepairServiceRounded,
  HomeRounded,
  ImageRounded,
  PersonRounded,
  SettingsRounded,
  SportsEsportsRounded
} from "@mui/icons-material"
import { Button, IconButton } from "@mui/joy"
import { Routes } from "@/lib/constants"
import Typography from "@mui/joy/Typography"
import { ChatbotUIContext } from "@/context/context"
import { supabase } from "@/lib/supabase/browser-client"
import { useSnackbar } from "@/lib/providers/SnackbarProvider"
import { Session } from "@supabase/gotrue-js"
import ComingSoonChip from "@/components/ui/Chips"
import ProfileMenu from "@/components/ui/ProfileMenu"
import { SidebarItem, SidebarRouteItem } from "@/components/sidebar/SidebarItem"
import Divider from "@mui/joy/Divider"

export const routeDictionary: Record<
  string,
  { icon: React.ReactElement; label: string; disabled?: boolean }
> = {
  [Routes.Home]: { icon: <HomeRounded />, label: "Home" },
  [Routes.Chat]: { icon: <ChatRounded />, label: "Chats" },
  [Routes.Images]: { icon: <ImageRounded />, label: "Images", disabled: true },
  [Routes.Toolbox]: {
    icon: <HomeRepairServiceRounded />,
    label: "Toolbox",
    disabled: true
  },
  [Routes.Games]: {
    icon: <SportsEsportsRounded />,
    label: "Games",
    disabled: true
  },
  [Routes.Collections]: {
    icon: <CollectionsBookmarkRounded />,
    label: "Collections"
  },
  [Routes.Explore]: {
    icon: <ExploreRounded />,
    label: "Explore",
    disabled: true
  },
  [Routes.Settings]: { icon: <SettingsRounded />, label: "Settings" },
  [Routes.Profile]: { icon: <PersonRounded />, label: "Profile" }
}

export default function Sidebar({ isShrunk = true }: { isShrunk?: boolean }) {
  const [selectedRoute, setSelectedRoute] = React.useState(Routes.Home)
  const router = useRouter()

  const { selectedWorkspace, setSelectedWorkspace, workspaces } =
    useContext(ChatbotUIContext)
  const { setSnackbar } = useSnackbar()
  const [session, setSession] = useState<Session | null>(null)
  const homeWorkspace = workspaces.find(w => w.is_home)
  const SIDEBAR_WIDTH = isShrunk ? 60 : 260

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = (await supabase.auth.getSession()).data.session
      setSession(sessionData)
    }

    fetchSession()
  }, [])

  function NewChatButton() {
    const handleNewChat = async () => {
      // User must be logged in to create a new chat
      if (!session) {
        setSnackbar({
          message: "You must be logged in to create a new chat",
          color: "danger"
        })
      }

      let workspaceId = selectedWorkspace?.id
      if (!workspaceId && homeWorkspace) {
        setSelectedWorkspace(homeWorkspace)
        workspaceId = homeWorkspace.id
      }

      if (!workspaceId) {
        setSnackbar({
          message: "No workspace found",
          color: "danger"
        })
        return
      }

      setSelectedRoute(Routes.Chat)
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

  return (
    <Sheet
      sx={{
        width: `${SIDEBAR_WIDTH}px`,
        py: 1.5,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        borderRight: "1px solid",
        borderColor: "divider",
        overflow: "hidden"
      }}
    >
      <SidebarHeader />

      <List
        size="sm"
        sx={{
          gap: 1,
          overflow: "hidden",
          "--List-nestedInsetStart": "30px",
          "--ListItem-radius": theme => theme.vars.radius.sm
        }}
      >
        {/*<NewChatButton />*/}
        <SidebarRouteItem
          route={Routes.Home}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
        />
        <Divider sx={{ mx: 1.5 }} />
        <SidebarRouteItem
          route={Routes.Chat}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
        />
        <SidebarRouteItem
          route={Routes.Images}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          trailingContent={<ComingSoonChip />}
        />
        <SidebarRouteItem
          route={Routes.Toolbox}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          trailingContent={<ComingSoonChip />}
        />
        <SidebarRouteItem
          route={Routes.Games}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          trailingContent={<ComingSoonChip />}
        />
        <Divider sx={{ mx: 1.5 }} />
        <SidebarRouteItem
          route={Routes.Collections}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
        />
        <SidebarRouteItem
          route={Routes.Explore}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          trailingContent={<ComingSoonChip />}
        />
      </List>

      <List
        size="sm"
        sx={{
          gap: 1,
          overflow: "hidden",
          mt: 1,
          flexGrow: 0,
          "--ListItem-radius": theme => theme.vars.radius.sm
        }}
      >
        <SidebarRouteItem
          route={Routes.Settings}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
        />

        <SidebarItem onClick={() => {}}>
          <ProfileMenu placement="right"></ProfileMenu>
        </SidebarItem>
      </List>
    </Sheet>
  )
}

function SidebarHeader({ isShrunk = true }: { isShrunk?: boolean }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center"
      }}
    >
      {isShrunk ? (
        <IconButton
          component="a"
          href={Routes.Home}
          variant="outlined"
          color="primary"
          sx={{
            alignContent: "center",
            justifyContent: "center",
            "&:hover": {
              backgroundColor: "transparent"
            }
          }}
        >
          <AutoAwesomeRounded />
        </IconButton>
      ) : (
        <Button
          component="a"
          href={Routes.Home}
          variant="plain"
          startDecorator={<AutoAwesomeRounded />}
          sx={{
            width: "100%",
            justifyContent: "start",
            "&:hover": {
              backgroundColor: "transparent"
            }
          }}
        >
          <Typography level="title-lg">Metadachi</Typography>
        </Button>
      )}
    </Box>
  )
}
