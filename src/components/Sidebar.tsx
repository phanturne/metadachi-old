"use client";

import { useChatStore } from "@/stores";
import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Sheet from "@mui/joy/Sheet";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import { useRouter } from "next/navigation";
import {
  AddCircleOutlineRounded,
  AutoAwesome,
  ChatRounded,
  ExploreRounded,
  Facebook,
  GitHub,
  HomeRepairServiceRounded,
  HomeRounded,
  ImageRounded,
  Instagram,
  PersonRounded,
  Reddit,
  SettingsRounded,
  Twitter,
} from "@mui/icons-material";
import { Button } from "@mui/joy";
import { Routes } from "@/constants";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Typography from "@mui/joy/Typography";
import Profile from "@/components/Profile";

const routeDictionary: Record<
  string,
  { icon: React.ReactNode; label: string }
> = {
  [Routes.Home]: { icon: <HomeRounded />, label: "Home" },
  [Routes.Chats]: { icon: <ChatRounded />, label: "Chats" },
  [Routes.Images]: { icon: <ImageRounded />, label: "Images" },
  [Routes.Toolbox]: { icon: <HomeRepairServiceRounded />, label: "Toolbox" },
  [Routes.Discover]: { icon: <ExploreRounded />, label: "Discover" },
  [Routes.Settings]: { icon: <SettingsRounded />, label: "Settings" },
  [Routes.Profile]: { icon: <PersonRounded />, label: "Profile" },
};

export default function Sidebar() {
  const [selectedRoute, setSelectedRoute] = React.useState(Routes.Home);
  const router = useRouter();
  const chatStore = useChatStore();

  const handleNewChat = () => {
    setSelectedRoute(Routes.Chat);
    chatStore.newSession();
    router.push(Routes.Chat);
  };

  function NewChatButton() {
    return (
      <>
        {/*Displayed on Expanded Sidebars*/}
        <Button
          variant="outlined"
          color="neutral"
          size="sm"
          startDecorator={<AddCircleOutlineRounded />}
          sx={{
            display: { xs: "none", lg: "inline-flex" },
          }}
          onClick={handleNewChat}
        >
          <Typography level="title-sm">New Chat</Typography>
        </Button>

        {/*Displayed on Minimized Sidebars*/}
        <IconButton
          color="neutral"
          size="sm"
          sx={{ display: { xs: "inline-flex", lg: "none" } }}
          onClick={handleNewChat}
        >
          <AddCircleOutlineRounded />
        </IconButton>
      </>
    );
  }

  function MenuItem({
    route,
    trailingContent,
    onClick,
    onMouseOver,
  }: {
    route: string;
    trailingContent?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    onMouseOver?: React.MouseEventHandler<HTMLAnchorElement>;
  }) {
    if (!routeDictionary[route]) {
      return;
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
                  setSelectedRoute(route);
                  router.push(route);
                }
          }
        >
          <ListItemDecorator>{routeDictionary[route].icon}</ListItemDecorator>
          <ListItemContent sx={{ display: { xs: "none", lg: "flex" } }}>
            <Typography level="title-sm">
              {routeDictionary[route].label}
            </Typography>
          </ListItemContent>
          {trailingContent}
        </ListItemButton>
      </ListItem>
    );
  }

  function SidebarMenu() {
    return (
      <Box
        sx={{
          minHeight: 0,
          overflow: "auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            overflow: "hidden",
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <MenuItem route={Routes.Chats} />
          <MenuItem route={Routes.Images} />
          <MenuItem route={Routes.Toolbox} />
          <MenuItem route={Routes.Discover} />
        </List>

        <List
          size="sm"
          sx={{
            overflow: "hidden",
            mt: 1,
            flexGrow: 0,
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
            "--List-gap": "8px",
          }}
        >
          <MenuItem route={Routes.Settings} />

          {/*TODO: Spacing is incorrect. Replace w/ Base UI Popup*/}
          <Profile>
            <MenuItem route={Routes.Profile} onClick={() => {}} />
            {/*<Avatar*/}
            {/*  variant='solid'*/}
            {/*  size='sm'*/}
            {/*  src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286'*/}
            {/*/>*/}
          </Profile>
        </List>
      </Box>
    );
  }

  return (
    <Sheet
      className="Sidebar"
      sx={{
        transform: {
          xs: "translateX(calc(100% * (var(1, 0) - 1)))",
          lg: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        height: "100dvh",
        width: {
          xs: "var(--Sidebar-width)",
          lg: "calc(var(--Sidebar-width) + 190px)",
        },
        top: 0,
        p: { xs: 1, lg: 2 },
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: { xs: 0, lg: 2 },
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={() => ({
          ":root": {
            "--Sidebar-width": "53px",
          },
        })}
      />
      <SidebarHeader />
      <NewChatButton />
      <SidebarMenu />
      {/*<Divider sx={{ display: { xs: 'none', lg: 'flex' } }} />*/}
      {/*<SidebarFooter />*/}
    </Sheet>
  );
}

function SidebarHeader() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        my: { xs: 0, lg: -1 },
        pb: 2,
      }}
    >
      {/*Displayed on Expanded Sidebars*/}
      <Button
        variant="plain"
        startDecorator={<AutoAwesome />}
        onClick={() => router.push(Routes.Home)}
        sx={{
          display: {
            xs: "none",
            lg: "flex",
            width: "100%",
            justifyContent: "start",
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
        }}
      >
        <Typography level="title-lg">Metadachi</Typography>
      </Button>

      {/*Displayed on Minimized Sidebars*/}
      <IconButton
        variant="plain"
        color="primary"
        onClick={() => router.push(Routes.Home)}
        sx={{
          display: { xs: "flex", lg: "none" },
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        <AutoAwesome />
      </IconButton>
    </Box>
  );
}

function SidebarFooter() {
  return (
    <Box
      sx={{
        display: { xs: "none", lg: "flex" },
        gap: 1,
        alignItems: "center",
      }}
    >
      <SocialButtonsRow />
      <IconButton size="sm" variant="plain" color="neutral">
        <LogoutRoundedIcon />
      </IconButton>
    </Box>
  );
}

function SocialButtonsRow() {
  return (
    <Box sx={{ minWidth: 0, flex: 1 }}>
      <IconButton
        color="neutral"
        size="sm"
        component="a"
        target="_blank"
        href="https://github.com/phanturne/metadachi"
      >
        <GitHub />
      </IconButton>
      <IconButton
        color="neutral"
        size="sm"
        component="a"
        target="_blank"
        href="https://twitter.com/metadachi"
      >
        <Twitter />
      </IconButton>
      <IconButton color="neutral" size="sm" disabled={true}>
        <Facebook />
      </IconButton>
      <IconButton color="neutral" size="sm" disabled={true}>
        <Reddit />
      </IconButton>
      <IconButton color="neutral" size="sm" disabled={true}>
        <Instagram />
      </IconButton>
    </Box>
  );
}
