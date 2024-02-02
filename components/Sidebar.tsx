"use client"

import * as React from "react"
import { useContext } from "react"
import Box from "@mui/joy/Box"
import List from "@mui/joy/List"
import ListItem from "@mui/joy/ListItem"
import ListItemButton from "@mui/joy/ListItemButton"
import ListItemContent from "@mui/joy/ListItemContent"
import Sheet from "@mui/joy/Sheet"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import { usePathname, useRouter } from "next/navigation"
import {
  AddCircleOutlineRounded,
  AutoAwesomeRounded,
  ChatRounded,
  ExploreRounded,
  HomeRepairServiceRounded,
  HomeRounded,
  ImageRounded,
  PersonRounded,
  SettingsRounded
} from "@mui/icons-material"
import { Button } from "@mui/joy"
import { Routes, SIDEBAR_WIDTH } from "@/lib/constants"
import Typography from "@mui/joy/Typography"
import { DataList } from "@/components/sidebar/data-list"
import { ChatbotUIContext } from "@/context/context"
import Divider from "@mui/joy/Divider"
import { supabase } from "@/lib/supabase/browser-client"
import { useSnackbar } from "@/lib/providers/SnackbarProvider"

const routeDictionary: Record<
  string,
  { icon: React.ReactNode; label: string }
> = {
  [Routes.Home]: { icon: <HomeRounded />, label: "Home" },
  [Routes.Chat]: { icon: <ChatRounded />, label: "Chats" },
  [Routes.Images]: { icon: <ImageRounded />, label: "Images" },
  [Routes.Toolbox]: { icon: <HomeRepairServiceRounded />, label: "Toolbox" },
  [Routes.Explore]: { icon: <ExploreRounded />, label: "Explore" },
  [Routes.Settings]: { icon: <SettingsRounded />, label: "Settings" },
  [Routes.Profile]: { icon: <PersonRounded />, label: "Profile" }
}

export default async function Sidebar() {
  const [selectedRoute, setSelectedRoute] = React.useState(Routes.Home)
  const router = useRouter()

  const { chats, selectedWorkspace, setSelectedWorkspace, workspaces } =
    useContext(ChatbotUIContext)
  const pathname = usePathname()
  const { setSnackbar } = useSnackbar()
  const session = (await supabase.auth.getSession()).data.session
  const homeWorkspace = workspaces.find(w => w.is_home)

  function MenuItem({
    route,
    trailingContent,
    onClick,
    onMouseOver
  }: {
    route: string
    trailingContent?: React.ReactNode
    onClick?: React.MouseEventHandler<HTMLAnchorElement>
    onMouseOver?: React.MouseEventHandler<HTMLAnchorElement>
  }) {
    if (!routeDictionary[route]) {
      return
    }

    return (
      <ListItem sx={{ m: 0 }}>
        <ListItemButton
          selected={route === selectedRoute}
          onMouseOver={onMouseOver}
          onClick={
            onClick !== undefined
              ? onClick
              : () => {
                  setSelectedRoute(route)
                  router.push(route)
                }
          }
        >
          <ListItemDecorator>{routeDictionary[route].icon}</ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">
              {routeDictionary[route].label}
            </Typography>
          </ListItemContent>
          {trailingContent}
        </ListItemButton>
      </ListItem>
    )
  }

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
      return router.push(`/${workspaceId}/${Routes.Chat}`)
    }

    return (
      <Button
        variant="outlined"
        color="neutral"
        size="sm"
        onClick={handleNewChat}
        startDecorator={<AddCircleOutlineRounded />}
      >
        <Typography level="title-sm">New Chat</Typography>
      </Button>
    )
  }

  return (
    <Sheet
      sx={{
        width: `${SIDEBAR_WIDTH}px`,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        borderRight: "1px solid",
        borderColor: "divider"
      }}
    >
      <SidebarHeader />
      <NewChatButton />

      <List
        size="sm"
        sx={{
          gap: 1,
          overflow: "hidden",
          "--List-nestedInsetStart": "30px",
          "--ListItem-radius": theme => theme.vars.radius.sm
        }}
      >
        {/* TODO: Add Image Generation*/}
        {/*<MenuItem route={Routes.Images} />*/}
        <MenuItem route={Routes.Toolbox} />
        <MenuItem route={Routes.Explore} />
        <Divider sx={{ m: 1 }} />
        <DataList
          contentType="chats"
          data={chats}
          // folders={chatFolders}
          folders={[]} // Chat folders will not be displayed in the sidebar
        />
      </List>

      {/*<List*/}
      {/*  size="sm"*/}
      {/*  sx={{*/}
      {/*    overflow: "hidden",*/}
      {/*    mt: 1,*/}
      {/*    flexGrow: 0,*/}
      {/*    "--ListItem-radius": theme => theme.vars.radius.sm,*/}
      {/*    "--List-gap": "8px"*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <MenuItem route={Routes.Settings} />*/}

      {/*  <ProfileMenu placement="right">*/}
      {/*    <MenuButton*/}
      {/*      component="button"*/}
      {/*      variant="plain"*/}
      {/*      sx={{ justifyContent: "start", fontWeight: "normal", p: 0, m: 0 }}*/}
      {/*    >*/}
      {/*      <MenuItem route={Routes.Profile} onClick={() => {}} />*/}
      {/*    </MenuButton>*/}
      {/*  </ProfileMenu>*/}
      {/*</List>*/}
    </Sheet>
  )
}

function SidebarHeader() {
  const router = useRouter()

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 1
      }}
    >
      <Button
        variant="plain"
        startDecorator={<AutoAwesomeRounded />}
        onClick={() => router.push(Routes.Home)}
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
    </Box>
  )
}
