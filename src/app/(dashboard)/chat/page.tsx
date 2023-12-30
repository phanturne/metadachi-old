"use client";
import {
  ChatContext,
  ChatInput,
  ChatMessages,
  useChat,
} from "@/components/Chat";
import React, { useMemo, useState } from "react";
import { useChatStore, useMaskStore } from "@/stores";
import Header from "@/components/Header";
import { ChatListDropdown } from "@/components/ChatList";
import Typography from "@mui/joy/Typography";
import { useAllModels } from "@/hooks/useAllModels";
import { Autocomplete, Box, FormControl, selectClasses } from "@mui/joy";
import { AutoAwesomeRounded } from "@mui/icons-material";
import Sheet from "@mui/joy/Sheet";
import { Mask } from "@/types";

export default function ChatPage() {
  const chatStore = useChatStore();
  const currentChat = chatStore.currentSession();
  const session = chatStore.currentSession();
  const messages = session.messages;

  const [model, setModel] = useState<string>("");
  const [agent, setAgent] = useState<Mask | undefined>(undefined);

  return (
    <>
      <Header
        startContent={<ChatListDropdown />}
        middleContent={
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
            }}
          >
            {currentChat.topic}
          </Typography>
        }
      />
      <ChatContext.Provider value={{ model, setModel, agent, setAgent }}>
        {messages.length === 0 && <NewChatConfig />}
        {messages.length > 0 && <ChatMessages messages={messages} />}
        <ChatInput />
      </ChatContext.Provider>
    </>
  );
}

function NewChatConfig() {
  const botStore = useMaskStore();
  const bots = botStore.getAll();

  const allModels = useAllModels();
  const models = useMemo(
    () => allModels.filter((m) => m.available),
    [allModels],
  );

  const { setModel, setAgent } = useChat();

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
      <Box
        sx={{
          height: "300px",
          width: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <AutoAwesomeRounded />
        <Typography level="h4" sx={{ mt: 2, mb: 5 }}>
          How may I help you?
        </Typography>
        <FormControl sx={{ width: "350px", gap: 2 }}>
          <AutocompleteConfigOption
            name="Model"
            defaultValue="gpt-3.5-turbo"
            placeholder="N/A"
            options={models.map((m) => m.displayName)}
            onChange={(_, v) => setModel(v ?? "")}
          />

          <AutocompleteConfigOption
            name="Agent"
            placeholder="N/A"
            options={bots}
            getOptionLabel={(b: Mask) => b.name}
            onChange={(_, v) => setAgent(v)}
          />

          <AutocompleteConfigOption
            name="Plugins"
            placeholder="Coming Soon"
            options={[]}
            onChange={() => {}}
            disabled
          />
        </FormControl>
      </Box>
    </Box>
  );
}

function AutocompleteConfigOption({
  name,
  placeholder,
  defaultValue,
  options,
  getOptionLabel,
  onChange,
  disabled,
}: {
  name: string;
  placeholder: string;
  defaultValue?: string;
  options: any[];
  getOptionLabel?: (_: any) => any;
  onChange: (...args: any[]) => void;
  disabled?: boolean;
}) {
  return (
    <Sheet
      variant="soft"
      sx={{
        py: 1,
        px: 2,
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography level="body-md">{name}</Typography>
      <Autocomplete
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        options={options}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        sx={{
          width: "200px",
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
        onChange={onChange}
      />
    </Sheet>
  );
}
