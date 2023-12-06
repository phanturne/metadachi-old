'use client';

import { useChat } from 'ai/react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Bot, ChatError } from '@/app/(sidebar)/chat/chat-utils';
import {
  configChatWithChatId,
  configChatWithBotId,
  insertNewChat,
  saveMessageToDb,
  setChatHistoryWithChatId,
  getAllBots,
} from '@/app/(sidebar)/chat/chat-data-access';
import { Message as VercelChatMessage } from 'ai';
import { useRouter } from 'next/navigation';
import { Box, IconButton, Snackbar, Typography } from '@mui/joy';
import { useChatStore } from '@/lib/stores/chat';
import Header from '@/ui/header/Header';
import {
  ChatHistoryDropdown,
  ChatInput,
  ChatMessages,
  EmptyChatConfig,
} from '@/app/(sidebar)/chat/ChatComponents';
import { ExpandMoreRounded } from '@mui/icons-material';

// An "Empty Chat" is one where no valid Chat/Bot ID is provided
export default function ChatPage({
  searchParams,
}: {
  searchParams: { [_: string]: string | string[] | undefined };
}) {
  const [errorMsg, setErrorMsg] = useState<ChatError | undefined>(undefined);
  const router = useRouter();
  const {
    chat,
    bot,
    chatHistory,
    setChat,
    setBot,
    setChatHistory,
    isEmptyChat,
    setIsEmptyChat,
  } = useChatStore();

  const [bots, setBots] = useState<Bot[]>([]);
  useEffect(() => {
    (async () => {
      const botsData = await getAllBots();
      setBots(botsData);
    })();
  }, []);

  // [WEB ONLY] Get the chat_id and bot_id from the url
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_BUILD_MODE !== 'export') {
      let chatIdFromUrl = Array.isArray(searchParams?.c)
        ? searchParams.c[0]
        : searchParams.c;
      let botIdFromUrl = Array.isArray(searchParams?.p)
        ? searchParams.p[0]
        : searchParams.p;

      if (chatIdFromUrl && chatIdFromUrl !== chat?.id) {
        setChat({ id: chatIdFromUrl });
      }
      if (botIdFromUrl && botIdFromUrl !== bot?.id) {
        setBot({ id: botIdFromUrl });
      }

      if (chatIdFromUrl || botIdFromUrl) setIsEmptyChat(false);
    }
  }, []);

  // Fetch the chat or bot details
  useEffect(() => {
    (async () => {
      // If a chatId is provided, fetch the chat info with the chatId
      if (chat?.id) {
        await configChatWithChatId(chat, setChat, setBot, setErrorMsg);

        // If the chat is valid, fetch the chat history
        if (!errorMsg) {
          await setChatHistoryWithChatId(chat, setChatHistory, setErrorMsg);
        }
      } else if (bot?.id) {
        // Else if a botId is provided, fetch the chat info with the botId
        await configChatWithBotId(
          bot,
          setChat,
          setBot,
          setChatHistory,
          setErrorMsg
        );
      }

      // Use the user's default bot config for new chats, missing IDs, or failed fetches
      if (!(chat?.id || bot?.id) || errorMsg) {
        const defaultBotId = '1'; // TODO: Remove hardcoded value
        setBot({ id: defaultBotId });

        // Trigger [EmptyChatConfig] Component
        if (!isEmptyChat) setIsEmptyChat(true);
      }
    })();
  }, [chat?.id, bot?.id]);

  const createNewChatWithMessages = async (aiResponse: VercelChatMessage) => {
    // Make sure the botId exists
    if (!bot?.id) {
      throw new Error('No bot ID was provided when creating a new chat.');
    }

    // Insert a new chat entry into the database
    const newChatId = await insertNewChat(
      chat?.chatName ?? 'New Chat',
      bot.id,
      setErrorMsg
    );

    // Insert the messages (initialMessage, input, aiResponse)
    const messagesToInsert: Message[] = [
      bot.initialMessage && {
        content: bot.initialMessage,
        role: 'assistant',
        chat_id: newChatId,
      },
      { content: input, role: 'user', chat_id: newChatId },
      { content: aiResponse.content, role: 'assistant', chat_id: newChatId },
    ];

    await saveMessageToDb(messagesToInsert, setErrorMsg);

    // Redirect to chat/[chatId]
    setChat({ ...chat, id: newChatId });
    router.push(`/chat/?c=${newChatId}`);
  };

  const insertMessages = async (aiResponse: VercelChatMessage) => {
    const messagesToInsert: Message[] = [
      { content: input, role: 'user', chat_id: chat?.id },
      {
        content: aiResponse.content,
        role: 'assistant',
        chat_id: chat?.id,
      },
    ];

    await saveMessageToDb(messagesToInsert, setErrorMsg);
  };

  // TODO: Add functionality to swap the AI model
  const [currAiModel, setCurrAiModel] = useState(bot?.aiModel);
  // TODO: Get the user's API key. If it's undefined, the default one will be used
  const apiKey = undefined;

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: process.env.NEXT_PUBLIC_CHAT_ENDPOINT ?? '/api/chat',
    initialMessages: chatHistory,
    id: !isEmptyChat && chat?.id ? chat?.id : (Date.now() as unknown as string),
    body: {
      customChatConfig: bot?.modelConfig,
      systemPrompt: bot?.systemPrompt,
      chatModel: currAiModel,
      apiKey: apiKey,
    },
    onFinish:
      !isEmptyChat && chat?.id ? insertMessages : createNewChatWithMessages,
  });

  // Initialize new chats with an initial message
  if (messages.length === 0 && bot?.initialMessage) {
    messages.push({
      id: 'id',
      content: bot?.initialMessage,
      role: 'assistant',
    });
  }

  function customHandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (isEmptyChat) setIsEmptyChat(false);
    handleSubmit(e);
  }

  return (
    <>
      <Snackbar
        variant='soft'
        color='danger'
        autoHideDuration={5000}
        open={errorMsg !== undefined}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => {
          setErrorMsg(undefined);
        }}
      >
        {errorMsg as string}
      </Snackbar>
      {/*Fix Hydration Fail Error*/}
      <Header
        startContent={<ChatHistoryDropdown />}
        middleContent={
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography level='title-lg'>{chat?.chatName}</Typography>
            <IconButton color='neutral' size='sm'>
              <ExpandMoreRounded />
            </IconButton>
          </Box>
        }
      />
      {isEmptyChat && <EmptyChatConfig bots={bots} />}
      {!isEmptyChat && <ChatMessages messages={messages} />}
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={customHandleSubmit}
      />
    </>
  );
}
