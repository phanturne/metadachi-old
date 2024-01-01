import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import { ListSubheader } from "@mui/joy";
import * as React from "react";
import Sheet from "@mui/joy/Sheet";
import { useChatInput } from "@/components/Chat";
import { Prompt } from "@/typing";
import { dashboardPx } from "@/constants";

export type PromptCommandInfo = Pick<Prompt, "title" | "content">;
export type CommandInfo = any;
export type BotInfo = any;
export type ChatInfo = any;
export type ChatActionInfo = {
  command?: CommandInfo[];
  prompt?: PromptCommandInfo[];
  bot?: BotInfo[];
  chat?: ChatInfo[];
};

export const ChatActions = () => {
  // Each JoyUI padding unit is 8px. The padding used in the sheet below is using a standard px value for some reason (maybe b/c position: 'absolute')?
  const pxVal = 8;

  return (
    <Sheet
      variant="outlined"
      sx={{
        position: "absolute",
        bottom: 60,
        right: {
          xs: pxVal * dashboardPx.xs,
          lg: pxVal * dashboardPx.lg,
        },
        width: {
          xs: `calc(100vw - var(--Sidebar-width) - ${
            pxVal * dashboardPx.xs * 2
          }px)`,
          lg: `calc(100vw - calc(var(--Sidebar-width) + 190px + ${
            pxVal * dashboardPx.lg * 2
          }px))`,
        },

        boxShadow: "md",
        borderRadius: "6px",
        overflow: "scroll",
        overflowX: "hidden",
        maxHeight: {
          xs: `calc(100dvh - 60px - ${pxVal * dashboardPx.xs}px)`,
          sm: "400px",
        },
        mb: 1,
      }}
    >
      <List>
        <PromptActionsList />
      </List>
    </Sheet>
  );
};

export const PromptActionsList = () => {
  const { actions } = useChatInput();
  if (!(actions.prompt && actions.prompt.length > 0)) {
    return;
  }

  return (
    <ListItem nested>
      <ListSubheader sticky>Prompts</ListSubheader>
      {actions.prompt.map((p, index) => (
        <PromptAction key={`Prompt-${index}`} prompt={p} />
      ))}
    </ListItem>
  );
};

const PromptAction = ({ prompt }: { prompt: PromptCommandInfo }) => {
  const { input, setInput, setActions, inputRef } = useChatInput();

  const onPromptSelected = () => {
    // Timeout is required for focusing the element
    setTimeout(() => {
      setInput(prompt.content);
      setActions({});
      inputRef?.current?.focus();
    }, 0);
  };

  return (
    <ListItem sx={{ pb: 1 }}>
      <ListItemButton onMouseDown={onPromptSelected}>
        <ListItemContent>
          <Typography level="title-sm">{prompt.title}</Typography>
          <Typography level="body-sm" noWrap>
            {prompt.content}
          </Typography>
        </ListItemContent>
      </ListItemButton>
    </ListItem>
  );
};
