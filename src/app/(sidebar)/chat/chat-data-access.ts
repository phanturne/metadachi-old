import { ChatError } from '@/app/(sidebar)/chat/chat-utils';
import { supabase } from '@/lib/utils/supabaseClient';
import { Message as VercelChatMessage } from 'ai';
import { Bot, Chat } from './chat-utils';
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

export async function getAllChats(
  userId: string,
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>
) {
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching list of chats');
  } else {
    setChats(
      data.map((row) => ({
        id: row.id,
        createdAt: row.created_at,
        chatName: row.chat_name,
        botId: row.bot_id,
        public: row.public,
        userId: row.userId,
      }))
    );
  }
}

export async function getAllBots(): Promise<Bot[]> {
  const { data, error } = await supabase.from('bots').select('*');

  if (error) {
    console.error('Error fetching list of bots');
    return [];
  }

  return data.map((row) => ({
    ...row,
    systemPrompt: row.system_prompt,
    initialMessage: row.initial_message,
    aiModel: row.ai_model,
    modelConfig: row.model_config,
    userId: row.user_id,
    createdAt: row.created_at,
  }));
}
