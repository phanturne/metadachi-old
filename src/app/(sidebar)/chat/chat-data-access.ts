import { ChatError, ChatInfo } from '@/app/(sidebar)/chat/chat-utils';
import { supabase } from '@/utils/supabaseClient';

export async function fetchChatInfoWithChatId(chatInfo: ChatInfo) {
  const { data, error } = await supabase
    .from('personas')
    .select(
      'avatar, system_prompt, initial_message, ai_model, model_config, chats!inner(chat_name)'
    )
    .eq('chats.id', chatInfo.chatId)
    .single();

  if (error) {
    chatInfo.chatId = undefined;
    return ChatError.INVALID_CHAT;
  } else {
    chatInfo.chatName = data.chats[0].chat_name;
    chatInfo.aiModel = data.ai_model;
    chatInfo.modelConfig = data.model_config;
    chatInfo.aiAvatar = data.avatar;
    chatInfo.systemPrompt = data.system_prompt;
    chatInfo.initialMessage = data.initial_message;
  }
}

export async function fetchChatHistoryWithChatId(chatInfo: ChatInfo) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatInfo.chatId);

  if (error) {
    return ChatError.INVALID_CHAT_HISTORY;
  } else {
    chatInfo.chatHistory = data;
  }
}

export async function fetchChatInfoWithPersonaId(chatInfo: ChatInfo) {
  const { data, error } = await supabase
    .from('personas')
    .select(
      'name, avatar, system_prompt, initial_message, ai_model, model_config'
    )
    .eq('id', chatInfo.personaId)
    .single();

  if (error) {
    return ChatError.INVALID_PERSONA;
  } else {
    chatInfo.chatName = data.name;
    chatInfo.aiModel = data.ai_model;
    chatInfo.modelConfig = data.model_config;
    chatInfo.aiAvatar = data.avatar;
    chatInfo.systemPrompt = data.system_prompt;
    chatInfo.initialMessage = data.initial_message;
  }
}

export async function insertNewChat(chatName: string, personaId: string) {
  const { data } = await supabase
    .from('chats')
    .insert({ chat_name: chatName, persona_id: personaId })
    .select('id');

  return data?.[0].id;
}

export async function insertInitialMessages(messages: Message[]) {
  const { error } = await supabase.from('messages').insert(messages);
  return error;
}
