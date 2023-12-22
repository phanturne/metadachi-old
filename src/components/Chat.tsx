import {
  Autocomplete,
  Box,
  FormControl,
  selectClasses,
  Textarea,
} from '@mui/joy';
import Sheet from '@mui/joy/Sheet';
import * as React from 'react';
import { createContext, ReactNode, useContext, useState } from 'react';
import { usePromptStore } from '@/stores/prompt';
import { useDebouncedCallback } from 'use-debounce';
import { extractCommand, extractPrefix } from '@/utils';
import { BOT_PREFIX, CHAT_PREFIX, PROMPT_PREFIX } from '@/constants';
import { useChatStore } from '@/stores';
import { useRouter } from 'next/navigation';
import Typography from '@mui/joy/Typography';
import { useMaskStore } from '@/stores/mask';
import {
  ChatSuggestions,
  CommandItem,
  SuggestionItems,
} from '@/components/ChatSuggestions';

const ChatInputContext = createContext({
  input: '',
  setInput: (_: string) => {},
  suggestions: [] as SuggestionItems,
});

export const useChatInput = () => {
  return useContext(ChatInputContext);
};

export function ChatInput({
  start,
  end,
}: {
  start?: ReactNode;
  end?: ReactNode;
}) {
  const router = useRouter();

  const chatStore = useChatStore();
  // TODO: Command Store
  const promptStore = usePromptStore();
  // TODO: Bot Store
  // TODO: Chat Store

  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestionItems>({});
  const [isFocused, setIsFocused] = useState(true);

  // Update input suggestions based on the user input
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currInput = e.target.value;
    setInput(currInput);

    // Must fetch the suggestions and set them here. Otherwise, the previous suggestions will be displayed??
    const currSuggestions = getSuggestions(currInput) ?? {};
    setSuggestions(currSuggestions);
  };

  const getSuggestions = useDebouncedCallback(
    (text: string) => {
      const { prefix, message } = extractPrefix(text);

      switch (prefix) {
        case PROMPT_PREFIX:
          // Set Prompt & Command Suggestions
          const prompts = promptStore.search(message);
          const commands: CommandItem[] = [];
          return { command: commands, prompt: prompts };

        case BOT_PREFIX:
        case CHAT_PREFIX:
          // TODO: Get prompts or chats
          return {};

        default:
          return {};
      }
    },
    100,
    { leading: true, trailing: true }
  );

  // `Enter`: submits message
  // `Shift + Enter`: create new line
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Shift +
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const submit = () => {
    if (input.trim() === '') return;

    // Parse the chat prefix
    const { prefix } = extractPrefix(input);
    let currInput = input;

    if (prefix) {
      const { command, message } = extractCommand(input);

      if (prefix === PROMPT_PREFIX) {
        // Prompts are already replaced in `onSelect()`, so it must be a command prefix
        const prompt = promptStore.search(command)[0];
        if (prompt) {
          currInput = prompt.content + message;
        }
      }
    }

    // chatStore.onUserInput(input);
    setInput('');
  };

  const hasSuggestions = () =>
    Object.values(suggestions).some(
      (array) => Array.isArray(array) && array.length > 0
    );

  return (
    <Box
      sx={{
        px: 3,
        pb: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {hasSuggestions() && isFocused && (
        <ChatInputContext.Provider value={{ input, setInput, suggestions }}>
          <ChatSuggestions />
        </ChatInputContext.Provider>
      )}
      <Textarea
        name='inputValue'
        placeholder='Send a message, / for prompts & commands, @ for bots'
        maxRows={5}
        value={input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChange}
        onKeyDown={onKeyDown}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          '--Textarea-focusedThickness': '0rem',
        }}
        startDecorator={start}
        endDecorator={end}
      />
    </Box>
  );
}

export function EmptyChatConfig() {
  const botStore = useMaskStore();
  const bots = botStore.getAll();

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: 'scroll',
        px: 3,
        flexDirection: 'column-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <Sheet
        variant='plain'
        sx={{
          height: '300px',
          width: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <FormControl sx={{ width: '240px', gap: 1 }}>
          <Typography>Bot</Typography>
          <Autocomplete
            // defaultValue={bots?.[0]?.name}
            placeholder='Select a Bot'
            options={bots.map((b) => b.name)}
            sx={{
              [`& .${selectClasses.indicator}`]: {
                transition: '0.2s',
                [`&.${selectClasses.expanded}`]: {
                  transform: 'rotate(-180deg)',
                },
              },
            }}
            slotProps={{
              listbox: {
                sx: {
                  maxHeight: '300px',
                },
              },
            }}
          />
        </FormControl>
      </Sheet>
    </Box>
  );
}
