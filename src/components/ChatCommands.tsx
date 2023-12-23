import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import { ListSubheader } from '@mui/joy';
import * as React from 'react';
import { Prompt, usePromptStore } from '@/stores/prompt';
import Sheet from '@mui/joy/Sheet';
import { useChatInput } from '@/components/Chat';
import { extractCommand, extractPrefix } from '@/utils';
import { PROMPT_PREFIX } from '@/constants';

export type PromptCommandInfo = Pick<Prompt, 'title' | 'content'>;
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
  const containerMargin = 25; // Where is it coming from?

  return (
    <Sheet
      variant='outlined'
      sx={{
        position: 'absolute',
        bottom: 60,
        right: 25,
        width: {
          xs: `calc(100vw - var(--Sidebar-width) - ${containerMargin * 2}px)`,
          lg: `calc(100vw - calc(var(--Sidebar-width) + 190px + ${
            containerMargin * 2
          }px))`,
        },

        boxShadow: 'md',
        borderRadius: '6px',
        overflow: 'scroll',
        maxHeight: {
          xs: `calc(100dvh - 60px - ${containerMargin}px)`,
          sm: '400px',
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
  const { suggestions } = useChatInput();
  if (!(suggestions.prompt && suggestions.prompt.length > 0)) {
    return;
  }

  return (
    <ListItem nested>
      <ListSubheader sticky>Prompts</ListSubheader>
      {suggestions.prompt.map((p, index) => (
        <PromptCommand key={`Prompt-${index}`} prompt={p} />
      ))}
    </ListItem>
  );
};

const PromptCommand = ({ prompt }: { prompt: PromptCommandInfo }) => {
  const { input, setInput } = useChatInput();
  const promptStore = usePromptStore();

  const promptSelected = () => {
    const { prefix } = extractPrefix(input);
    if (!prefix) {
      return;
    }

    const { command, message } = extractCommand(input);
    if (prefix === PROMPT_PREFIX) {
      const prompt = promptStore.search(command)[0];
      if (prompt) {
        setInput(prompt.content + message);
      }
    }
  };

  return (
    <ListItem sx={{ pb: 1 }}>
      <ListItemButton onClick={promptSelected}>
        <ListItemContent>
          <Typography level='title-sm'>{prompt.title}</Typography>
          <Typography level='body-sm' noWrap>
            {prompt.content}
          </Typography>
        </ListItemContent>
      </ListItemButton>
    </ListItem>
  );
};
