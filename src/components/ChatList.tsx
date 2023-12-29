"use client";
import { useChatStore } from "@/stores";
import Dropdown from "@mui/joy/Dropdown";
import MenuButton from "@mui/joy/MenuButton";
import IconButton from "@mui/joy/IconButton";
import { HistoryRounded } from "@mui/icons-material";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import { Box, Grid, Sheet } from "@mui/joy";

export function ChatList() {
  const chatStore = useChatStore();
  const chats = chatStore.sessions;

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100dvh",
        flexDirection: "column-reverse",
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 3, md: 4 }}
        sx={{ flexGrow: 1 }}
      >
        {chats.map((c) => (
          <Grid xs={1} key={`chat-option-${c.id}`}>
            <Sheet
              variant="soft"
              sx={{ textAlign: "center", p: 1, borderRadius: 4 }}
            >
              <Typography
                level="title-md"
                noWrap
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {c.topic}
              </Typography>
            </Sheet>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export function ChatListDropdown() {
  const chatStore = useChatStore();
  const chats = chatStore.sessions;

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral" } }}
        sx={{ borderRadius: 40 }}
      >
        <IconButton color="neutral" size="sm">
          <HistoryRounded />
        </IconButton>
      </MenuButton>
      <Menu
        placement="bottom-start"
        sx={{
          m: 0,
          p: 0,
          width: 250,
          overflow: "scroll",
          overflowX: "hidden",
          maxHeight: "calc(100% - 50px)",
        }}
      >
        {chats.length === 0 && (
          <MenuItem>
            <Typography>Chat History is Empty</Typography>
          </MenuItem>
        )}
        {chats.map((c, i) => (
          <MenuItem
            key={`ChatListItem_${c.id}`}
            onClick={() => {
              chatStore.selectSession(i);
            }}
          >
            {c.topic}
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
}
