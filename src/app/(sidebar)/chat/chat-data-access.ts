import { ChatError } from '@/app/(sidebar)/chat/chat-utils';
import { supabase } from '@/lib/utils/supabaseClient';
import { Message as VercelChatMessage } from 'ai';
import { Chat, Bot } from './chat-utils';
import React from 'react';

export async function configChatWithChatId(
  chat: Chat,
  setChat: (id: Chat | undefined) => void,
  setBot: (id: Bot | undefined) => void,
  setErrorMsg: React.Dispatch<React.SetStateAction<ChatError | undefined>>
) {
  const { data, error } = await supabase
    .from('bots')
    .select(
      'system_prompt, initial_message, ai_model, model_config, chats!inner(chat_name)'
    )
    .eq('chats.id', chat.id)
    .single();

  if (error) {
    setChat(undefined);
    setErrorMsg(ChatError.INVALID_CHAT);
  } else {
    setChat({ ...chat, chatName: data.chats[0].chat_name });
    setBot({
      aiModel: data.ai_model,
      modelConfig: data.model_config,
      systemPrompt: data.system_prompt,
      initialMessage: data.initial_message,
    });
  }
}

export async function setChatHistoryWithChatId(
  chat: Chat,
  setChatHistory: (history: VercelChatMessage[]) => void,
  setErrorMsg: React.Dispatch<React.SetStateAction<ChatError | undefined>>
) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chat.id);

  if (error) {
    setErrorMsg(ChatError.INVALID_CHAT_HISTORY);
  } else {
    setChatHistory(data);
  }
}

export async function configChatWithBotId(
  bot: Bot,
  setChat: (id: Chat | undefined) => void,
  setBot: (id: Bot | undefined) => void,
  setChatHistory: (history: VercelChatMessage[]) => void,
  setErrorMsg: React.Dispatch<React.SetStateAction<ChatError | undefined>>
) {
  const { data, error } = await supabase
    .from('bots')
    .select('name, system_prompt, initial_message, ai_model, model_config')
    .eq('id', bot.id)
    .single();

  if (error) {
    setBot(undefined);
    setErrorMsg(ChatError.INVALID_BOT);
  } else {
    setChat({ chatName: data.name });
    setBot({
      ...bot,
      aiModel: data.ai_model,
      modelConfig: data.model_config,
      systemPrompt: data.system_prompt,
      initialMessage: data.initial_message,
    });
    setChatHistory([
      {
        content: data.initial_message,
        role: 'assistant',
        id: 'initial-message-id',
      },
    ]);
  }
}

export async function insertNewChat(
  chatName: string,
  botId: string,
  setErrorMsg: React.Dispatch<React.SetStateAction<ChatError | undefined>>
) {
  const { data, error } = await supabase
    .from('chats')
    .insert({ chat_name: chatName, bot_id: botId })
    .select('id');

  if (error) {
    setErrorMsg(ChatError.ERROR_CREATING_NEW_CHAT);
  }
  return data?.[0].id;
}

export async function saveMessageToDb(
  messages: Message[],
  setErrorMsg: React.Dispatch<React.SetStateAction<ChatError | undefined>>
) {
  const { error } = await supabase.from('messages').insert(messages);
  if (error) setErrorMsg(ChatError.ERROR_SAVING_MESSAGES);
}
