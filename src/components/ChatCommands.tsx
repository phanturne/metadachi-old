import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import { ListSubheader } from "@mui/joy";
import * as React from "react";
import { usePromptStore } from "@/stores";
import Sheet from "@mui/joy/Sheet";
import { dashboardPxMultiplier, useChatInput } from "@/components/Chat";
import { Prompt } from "@/types";

export type PromptCommandInfo = Pick<Prompt, "title" | "content">;
export type AiCommandInfo = any;
export type BotCommandInfo = any;
export type ChatCommandInfo = any;
export type CommandInfo = {
  command?: AiCommandInfo[];
  prompt?: PromptCommandInfo[];
  bot?: BotCommandInfo[];
  chat?: ChatCommandInfo[];
};

export const ChatCommands = () => {
  // Each JoyUI padding unit is 8px. The padding used in the sheet below is using a standard px value for some reason (maybe b/c position: 'absolute')?
  const pxVal = 8;

  return (
    <Sheet
      variant="outlined"
      sx={{
        position: "absolute",
        bottom: 60,
        right: {
          xs: pxVal * dashboardPxMultiplier.xs,
          lg: pxVal * dashboardPxMultiplier.lg,
        },
        width: {
          xs: `calc(100vw - var(--Sidebar-width) - ${
            pxVal * dashboardPxMultiplier.xs * 2
          }px)`,
          lg: `calc(100vw - calc(var(--Sidebar-width) + 190px + ${
            pxVal * dashboardPxMultiplier.lg * 2
          }px))`,
        },

        boxShadow: "md",
        borderRadius: "6px",
        overflow: "scroll",
        overflowX: "hidden",
        maxHeight: {
          xs: `calc(100dvh - 60px - ${pxVal * dashboardPxMultiplier.xs}px)`,
          sm: "400px",
        },
        mb: 1,
      }}
    >
      <List>
        <PromptCommandsList />
      </List>
    </Sheet>
  );
};

export const PromptCommandsList = () => {
  const { commands } = useChatInput();
  if (!(commands.prompt && commands.prompt.length > 0)) {
    return;
  }

  return (
    <ListItem nested>
      <ListSubheader sticky>Prompts</ListSubheader>
      {commands.prompt.map((p, index) => (
        <PromptCommand key={`Prompt-${index}`} prompt={p} />
      ))}
    </ListItem>
  );
};

const PromptCommand = ({ prompt }: { prompt: PromptCommandInfo }) => {
  const { input, setInput, setCommands, inputRef } = useChatInput();
  const promptStore = usePromptStore();

  const onPromptSelected = () => {
    // Timeout is required for focusing the element
    setTimeout(() => {
      setInput(prompt.content);
      setCommands({});
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
