"use client";

import { Box, Textarea } from "@mui/joy";
import * as React from "react";
import { createContext, RefObject, useContext, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { extractPrefix } from "@/utils/utils";
import {
  BOT_PREFIX,
  CHAT_PREFIX,
  dashboardPx,
  PROMPT_PREFIX,
  Routes,
} from "@/constants";
import { useChatStore, usePromptStore } from "@/stores";
import { useRouter } from "next/navigation";
import Typography from "@mui/joy/Typography";
import {
  ChatActionInfo,
  ChatActions,
  CommandInfo,
} from "@/components/ChatActions";
import { SxProps } from "@mui/joy/styles/types";
import Stack from "@mui/joy/Stack";
import Avatar from "@mui/joy/Avatar";
import { ChatMessage, Mask } from "@/typing";
import { Send } from "@mui/icons-material";
import IconButton from "@mui/joy/IconButton";

export const ChatContext = createContext({
  model: "",
  setModel: (_: string) => {},
  agent: undefined as Mask | undefined,
  setAgent: (_: Mask | undefined) => {},
});

export const useChat = () => {
  return useContext(ChatContext);
};

const ChatInputContext = createContext({
  input: "",
  setInput: (_: string) => {},
  actions: [] as ChatActionInfo,
  setActions: (_: ChatActionInfo) => {},
  inputRef: null as RefObject<HTMLTextAreaElement | null> | null,
});

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

  const { model, agent } = useChat();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState("");
  const [actions, setActions] = useState<ChatActionInfo>({});
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
          const commands: CommandInfo[] = [];
          setActions({ command: commands, prompt: prompts });
          break;

        case BOT_PREFIX:
        case CHAT_PREFIX:
          // TODO: Get prompts or chats
          setActions({});
          break;

        default:
          setActions({});
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
    // const { prefix } = extractPrefix(input);
    // let currInput = input;

    // if (prefix) {
    //   const { command, message } = extractCommand(input);
    //
    //   if (prefix === PROMPT_PREFIX) {
    //     // Prompts are already replaced in `onSelect()`, so it must be a command prefix
    //   }
    // }

    if (needToCreateChat) {
      setTimeout(() => {
        // TODO: Pass in model as a parameter for creating new chat sessions
        chatStore.newSession(agent);
        chatStore.onUserInput(input);
        router.push(Routes.Chat);
      }, 10);
    } else {
      chatStore.onUserInput(input);
      setInput("");
    }
  };

  const hasCommands = () =>
    Object.values(actions).some(
      (array) => Array.isArray(array) && array.length > 0,
    );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        px: {
          xs: dashboardPx.xs,
          lg: dashboardPx.lg,
        },
        pb: 2,
      }}
    >
      {hasCommands() && isFocused && (
        <ChatInputContext.Provider
          value={{
            input,
            setInput,
            actions,
            setActions,
            inputRef,
          }}
        >
          <ChatActions />
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
          xs: dashboardPx.xs,
          lg: dashboardPx.lg,
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
