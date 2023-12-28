"use client";

import {
  Autocomplete,
  Box,
  FormControl,
  selectClasses,
  Textarea,
} from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import * as React from "react";
import { createContext, RefObject, useContext, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { extractPrefix } from "@/utils";
import { BOT_PREFIX, CHAT_PREFIX, PROMPT_PREFIX, Routes } from "@/constants";
import { useChatStore, useMaskStore, usePromptStore } from "@/stores";
import { useRouter } from "next/navigation";
import Typography from "@mui/joy/Typography";
import {
  AiCommandInfo,
  ChatCommands,
  CommandInfo,
} from "@/components/ChatCommands";
import { SxProps } from "@mui/joy/styles/types";
import Stack from "@mui/joy/Stack";
import Avatar from "@mui/joy/Avatar";
import { ChatMessage } from "@/types";
import { Send } from "@mui/icons-material";
import IconButton from "@mui/joy/IconButton";

const ChatInputContext = createContext({
  input: "",
  setInput: (_: string) => {},
  commands: [] as CommandInfo,
  setCommands: (_: CommandInfo) => {},
  inputRef: null as RefObject<HTMLTextAreaElement | null> | null,
});

export const dashboardPxMultiplier = { xs: 3, lg: 6 };

export const useChatInput = () => {
  return useContext(ChatInputContext);
};

export function ChatInput({
  needToCreateChat,
  sxProps,
}: {
  needToCreateChat?: boolean;
  sxProps?: SxProps;
}) {
  const router = useRouter();

  const chatStore = useChatStore();
  // TODO: Command Store
  const promptStore = usePromptStore();
  // TODO: Bot Store
  // TODO: Chat Store

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState("");
  const [commands, setCommands] = useState<CommandInfo>({});
  const [isFocused, setIsFocused] = useState(true);

  // Update input suggestions based on the user input
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currInput = e.target.value;
    setInput(currInput);
    updateSuggestions(currInput);
  };

  const updateSuggestions = useDebouncedCallback(
    (text: string) => {
      const { prefix, message } = extractPrefix(text);

      switch (prefix) {
        case PROMPT_PREFIX:
          // Set Prompt & Command Suggestions
          const prompts = promptStore.search(message);
          const commands: AiCommandInfo[] = [];
          setCommands({ command: commands, prompt: prompts });
          break;

        case BOT_PREFIX:
        case CHAT_PREFIX:
          // TODO: Get prompts or chats
          setCommands({});
          break;

        default:
          setCommands({});
      }
    },
    100,
    { leading: true, trailing: true },
  );

  // `Enter`: submits message
  // `Shift + Enter`: create new line
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Shift +
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const submit = () => {
    if (input.trim() === "") return;

    // Parse the chat prefix
    const { prefix } = extractPrefix(input);
    let currInput = input;

    // if (prefix) {
    //   const { command, message } = extractCommand(input);
    //
    //   if (prefix === PROMPT_PREFIX) {
    //     // Prompts are already replaced in `onSelect()`, so it must be a command prefix
    //   }
    // }

    if (needToCreateChat) {
      setTimeout(() => {
        chatStore.newSession();
        chatStore.onUserInput(input);
        router.push(Routes.Chat);
      }, 10);
    } else {
      chatStore.onUserInput(input);
      setInput("");
    }
  };

  const hasCommands = () =>
    Object.values(commands).some(
      (array) => Array.isArray(array) && array.length > 0,
    );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        px: {
          xs: dashboardPxMultiplier.xs,
          lg: dashboardPxMultiplier.lg,
        },
        pb: 2,
      }}
    >
      {hasCommands() && isFocused && (
        <ChatInputContext.Provider
          value={{ input, setInput, commands, setCommands, inputRef }}
        >
          <ChatCommands />
        </ChatInputContext.Provider>
      )}
      <Textarea
        name="inputValue"
        placeholder="Send a message, / for prompts & commands, @ for bots"
        maxRows={5}
        value={input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChange}
        onKeyDown={onKeyDown}
        sx={{
          display: "flex",
          flexDirection: "row",
          "--Textarea-focusedThickness": "0rem",
          ...sxProps,
        }}
        endDecorator={
          <IconButton sx={{ mt: -1 }} onClick={submit}>
            <Send />
          </IconButton>
        }
        slotProps={{ textarea: { ref: inputRef } }}
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
        overflowY: "scroll",
        px: 3,
        flexDirection: "column-reverse",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Sheet
        variant="plain"
        sx={{
          height: "300px",
          width: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <FormControl sx={{ width: "240px", gap: 1 }}>
          <Typography>Bot</Typography>
          <Autocomplete
            // defaultValue={bots?.[0]?.name}
            placeholder="Select a Bot"
            options={bots.map((b) => b.name)}
            sx={{
              [`& .${selectClasses.indicator}`]: {
                transition: "0.2s",
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
              },
            }}
            slotProps={{
              listbox: {
                sx: {
                  maxHeight: "300px",
                },
              },
            }}
          />
        </FormControl>
      </Sheet>
    </Box>
  );
}

function ChatBubble({ m }: { m: ChatMessage }) {
  const fromUser = m.role === "user";
  return (
    <Stack direction={"row"}>
      {/*TODO: Add custom avatars*/}
      <Avatar size="sm" variant="outlined">
        {fromUser ? "😎" : "✨"}
      </Avatar>
      <Box sx={{ minWidth: "auto", mb: 1.5, ml: 2 }}>
        <Typography
          sx={{
            color: "var(--joy-palette-text-primary)",
          }}
        >
          {m.content}
        </Typography>
      </Box>
    </Stack>
  );
}

export function ChatMessages({ messages }: { messages: ChatMessage[] }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: "scroll",
        px: {
          xs: dashboardPxMultiplier.xs,
          lg: dashboardPxMultiplier.lg,
        },
        flexDirection: "column-reverse",
      }}
    >
      <Stack gap={1.5} sx={{ py: 2 }}>
        {messages.map((m) => (
          <ChatBubble key={m.id} m={m} />
        ))}
      </Stack>
    </Box>
  );
}
