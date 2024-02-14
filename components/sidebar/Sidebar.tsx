"use client"

import * as React from "react"
import List from "@mui/joy/List"
import Sheet from "@mui/joy/Sheet"
import { Routes } from "@/lib/constants"
import ComingSoonChip from "@/components/ui/Chips"
import ProfileMenu from "@/components/ui/ProfileMenu"
import { SidebarItem, SidebarRouteItem } from "@/components/sidebar/SidebarItem"
import Divider from "@mui/joy/Divider"
import { SidebarHeader } from "@/components/sidebar/SidebarHeader"
import { CreateWorkspaceButton } from "@/components/workspace/CreateWorkspaceButton"
import { WorkspaceList } from "@/components/workspace/WorkspaceList"

export default function Sidebar({ isShrunk = true }: { isShrunk?: boolean }) {
  const [selectedRoute, setSelectedRoute] = React.useState(Routes.Home)

  const SIDEBAR_WIDTH = isShrunk ? 60 : 260

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
          route={Routes.Explore}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          trailingContent={<ComingSoonChip />}
        />
        {/*<SidebarRouteItem*/}
        {/*  route={Routes.Games}*/}
        {/*  selectedRoute={selectedRoute}*/}
        {/*  setSelectedRoute={setSelectedRoute}*/}
        {/*  trailingContent={<ComingSoonChip />}*/}
        {/*/>*/}
        <Divider sx={{ mx: 1.5 }} />
        {/*<SidebarRouteItem*/}
        {/*  route={Routes.Collections}*/}
        {/*  selectedRoute={selectedRoute}*/}
        {/*  setSelectedRoute={setSelectedRoute}*/}
        {/*/>*/}
        <WorkspaceList variant="sidebar" />
        <SidebarItem onClick={() => {}}>
          <CreateWorkspaceButton />
        </SidebarItem>
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
