'use client';

import { useChat } from 'ai/react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ChatError } from '@/app/(sidebar)/chat/chat-utils';
import {
  configChatWithChatId,
  configChatWithPersonaId,
  insertNewChat,
  saveMessageToDb,
  setChatHistoryWithChatId,
} from '@/app/(sidebar)/chat/chat-data-access';
import { Message as VercelChatMessage } from 'ai';
import { useRouter } from 'next/navigation';
import { Box, IconButton, Snackbar, Typography } from '@mui/joy';
import { useChatStore } from '@/lib/stores/chat';
import Header from '@/ui/header/Header';
import {
  ChatInput,
  ChatMessages,
  NewChatConfig,
} from '@/app/(sidebar)/chat/ChatComponents';
import { ExpandMoreRounded } from '@mui/icons-material';

export default function ChatPage({
  searchParams,
}: {
  searchParams: { [_: string]: string | string[] | undefined };
}) {
  const [errorMsg, setErrorMsg] = useState<ChatError | undefined>(undefined);
  const router = useRouter();
  const { chat, persona, chatHistory, setChat, setPersona, setChatHistory } =
    useChatStore();

  // Render `NewChatConfig` if the user clicked a "New Chat" button
  // TODO: Use a `isNewChatPage` attribute in [ChatStore] instead of a searchParam since it doesn't work w/ TAURI
  const isNewChatPage = 'new' in searchParams;

  // [WEB ONLY] Get the chat_id and persona_id from the url
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_BUILD_MODE !== 'export') {
      let chatIdFromUrl = Array.isArray(searchParams?.c)
        ? searchParams.c[0]
        : searchParams.c;
      let personaIdFromUrl = Array.isArray(searchParams?.p)
        ? searchParams.p[0]
        : searchParams.p;

      if (chatIdFromUrl && chatIdFromUrl !== chat?.id) {
        setChat({ id: chatIdFromUrl });
      }
      if (personaIdFromUrl && personaIdFromUrl !== persona?.id) {
        setPersona({ id: personaIdFromUrl });
      }
    }
  }, []);

  // Fetch the chat or persona details
  useEffect(() => {
    (async () => {
      // If a chatId is provided, fetch the chat info with the chatId
      if (chat?.id) {
        setErrorMsg(await configChatWithChatId(chat, setChat, setPersona));

        // If the chat is valid, fetch the chat history
        if (!errorMsg) {
          await setChatHistoryWithChatId(chat, setChatHistory);
        }
      } else if (persona?.id) {
        // Else if a personaId is provided, fetch the chat info with the personaId
        await configChatWithPersonaId(
          persona,
          setChat,
          setPersona,
          setChatHistory
        );
      }

      // Use the user's default chat persona for new chats, missing IDs, or failed fetches
      if (!(chat?.id || persona?.id) || errorMsg) {
        const defaultPersonaId = '1'; // TODO: Remove hardcoded value
        setPersona({ id: defaultPersonaId });
      }
    })();
  }, [chat?.id, persona?.id]);

  const createNewChatWithMessages = async (aiResponse: VercelChatMessage) => {
    // Make sure the personaId exists
    if (!persona?.id) return;

    // Create a new chat
    const newChatId = await insertNewChat(
      chat?.chatName ?? 'New Chat',
      persona.id
    );

    // Insert the messages (initialMessage, input, aiResponse)
    const messagesToInsert: Message[] = [
      persona.initialMessage && {
        content: persona.initialMessage,
        role: 'assistant',
        chat_id: newChatId,
      },
      { content: input, role: 'user', chat_id: newChatId },
      { content: aiResponse.content, role: 'assistant', chat_id: newChatId },
    ];

    setErrorMsg(await saveMessageToDb(messagesToInsert));

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

    setErrorMsg(await saveMessageToDb(messagesToInsert));
  };

  // TODO: Add functionality to swap the AI model
  const [currAiModel, setCurrAiModel] = useState(persona?.aiModel);
  // TODO: Get the user's API key. If it's undefined, the default one will be used
  const apiKey = undefined;

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: process.env.NEXT_PUBLIC_CHAT_ENDPOINT ?? '/api/chat',
    initialMessages: chatHistory,
    id: !isNewChatPage && chat?.id ? chat?.id : undefined,
    body: {
      customChatConfig: persona?.modelConfig,
      systemPrompt: persona?.systemPrompt,
      chatModel: currAiModel,
      apiKey: apiKey,
    },
    onFinish:
      !isNewChatPage && chat?.id ? insertMessages : createNewChatWithMessages,
  });

  // Initialize new chats with an initial message
  if (messages.length === 0 && persona?.initialMessage) {
    messages.push({
      id: 'id',
      content: persona?.initialMessage,
      role: 'assistant',
    });
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
      <Header
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
      {isNewChatPage && <NewChatConfig />}
      {!isNewChatPage && <ChatMessages messages={messages} />}
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
