'use client';

import { useChat } from 'ai/react';
import Header from '@/ui/header/Header';
import Typography from '@mui/joy/Typography';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ChatError, ChatInfo } from '@/app/(sidebar)/chat/chat-utils';
import {
  fetchChatHistoryWithChatId,
  fetchChatInfoWithChatId,
  fetchChatInfoWithPersonaId,
  insertInitialMessages,
  insertNewChat,
} from '@/app/(sidebar)/chat/chat-data-access';
import { Message as VercelChatMessage } from 'ai';
import { useRouter } from 'next/navigation';
import { Box, Snackbar } from '@mui/joy';
import { ChatInput, ChatMessages } from '@/app/(sidebar)/chat/ChatComponents';
import { useChatStore } from '@/lib/stores/chat';
import { ExpandMoreRounded } from '@mui/icons-material';
import IconButton from '@mui/joy/IconButton';

export default function ChatPage({
  searchParams,
}: {
  searchParams: { [_: string]: string | string[] | undefined };
}) {
  // TODO: Validate user session

  const [errorMsg, setErrorMsg] = useState<ChatError | undefined>(undefined);
  const [chatHistory, setChatHistory] = useState<VercelChatMessage[]>([]);
  const router = useRouter();
  const chatState = useChatStore();

  // [Web] Get the chat_id and persona_id from the url, if they exist
  let chatIdFromUrl = undefined;
  let personaIdFromUrl = undefined;
  if (process.env.NEXT_PUBLIC_BUILD_MODE != 'export') {
    chatIdFromUrl = Array.isArray(searchParams?.c)
      ? searchParams.c[0]
      : searchParams.c;
    personaIdFromUrl = Array.isArray(searchParams?.p)
      ? searchParams.p[0]
      : searchParams.p;
    if (chatState.chatId != chatIdFromUrl) chatState.setChatId(chatIdFromUrl);
    if (chatState.personaId != personaIdFromUrl)
      chatState.setPersonaId(personaIdFromUrl);
  }

  const [chatInfo, setChatInfo] = useState<ChatInfo>({
    chatId: chatIdFromUrl ?? chatState.chatId,
    personaId: personaIdFromUrl ?? chatState.personaId,
    chatName: 'New Chat',
  });

  // Fetch the chat or persona details
  useEffect(() => {
    (async () => {
      // If a chatId is provided, fetch the chat info with the chatId
      if (chatInfo.chatId) {
        setErrorMsg(await fetchChatInfoWithChatId(chatInfo, setChatInfo));

        // If the chat is valid, fetch the chat history
        if (!errorMsg) {
          await fetchChatHistoryWithChatId(chatInfo, setChatHistory);
        }
      } else if (chatInfo.personaId) {
        // Else if a personaId is provided, fetch the chat info with the personaId
        await fetchChatInfoWithPersonaId(chatInfo, setChatInfo, setChatHistory);
      }

      // If no chatId or personaId is provided or if any previous fetch failed, use the user's default chat info
      if (!(chatInfo.chatId || chatInfo.personaId) || errorMsg) {
        chatInfo.personaId = '1'; // TODO: Remove hardcoded value
        await fetchChatInfoWithPersonaId(chatInfo, setChatInfo, setChatHistory);
      }

      // Update the chat state
      if (chatInfo.chatId != chatState.chatId)
        chatState.setChatId(chatInfo.chatId);
      if (chatInfo.personaId != chatState.personaId)
        chatState.setPersonaId(chatInfo.personaId);
    })();
  }, []);

  const createNewChatWithMessages = async (aiResponse: VercelChatMessage) => {
    // Make sure the personaId exists
    if (!chatInfo.personaId) return;

    // Create a new chat
    const newChatId = await insertNewChat(
      chatInfo.chatName,
      chatInfo.personaId
    );

    // Insert the messages (initialMessage, input, aiResponse)
    const messagesToInsert: Message[] = [];
    if (chatInfo.initialMessage) {
      messagesToInsert.push({
        content: chatInfo.initialMessage,
        role: 'assistant',
        chat_id: newChatId,
      });
    }
    messagesToInsert.push({ content: input, role: 'user', chat_id: newChatId });
    messagesToInsert.push({
      content: aiResponse.content,
      role: 'assistant',
      chat_id: newChatId,
    });

    const error = await insertInitialMessages(messagesToInsert);

    // Redirect to chat/[chatId]
    chatState.setChatId(newChatId);
    router.push(`/chat/?c=${newChatId}`);
  };

  const insertMessages = async (aiResponse: VercelChatMessage) => {
    const messagesToInsert: Message[] = [
      { content: input, role: 'user', chat_id: chatInfo.chatId },
      {
        content: aiResponse.content,
        role: 'assistant',
        chat_id: chatInfo.chatId,
      },
    ];

    const error = await insertInitialMessages(messagesToInsert);
  };

  const [currAiModel, setCurrAiModel] = useState(chatInfo.aiModel);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: process.env.NEXT_PUBLIC_CHAT_ENDPOINT ?? '/api/chat',
    initialMessages: chatHistory,
    id: chatInfo.chatId,
    body: {
      customChatConfig: chatInfo.modelConfig,
      systemPrompt: chatInfo.systemPrompt,
      chatModel: currAiModel,
      isNewChat: chatInfo.chatId === null,
    },
    onFinish: chatInfo.chatId ? insertMessages : createNewChatWithMessages,
  });

  // Initialize new chats with an initial message
  if (messages.length === 0 && chatInfo.initialMessage) {
    messages.push({
      id: 'id',
      content: chatInfo.initialMessage,
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
            <Typography level='title-lg'>{chatInfo.chatName}</Typography>
            <IconButton color='neutral' size='sm'>
              <ExpandMoreRounded />
            </IconButton>
          </Box>
        }
      />
      <ChatMessages messages={messages} />
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
