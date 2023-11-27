import { ChatError } from '@/app/(sidebar)/chat/chat-utils';
import { supabase } from '@/lib/utils/supabaseClient';
import { Message as VercelChatMessage } from 'ai';
import { Chat, Persona } from './chat-utils';

export async function configChatWithChatId(
  chat: Chat,
  setChat: (id: Chat | undefined) => void,
  setPersona: (id: Persona | undefined) => void
) {
  const { data, error } = await supabase
    .from('personas')
    .select(
      'avatar, system_prompt, initial_message, ai_model, model_config, chats!inner(chat_name)'
    )
    .eq('chats.id', chat.id)
    .single();

  if (error) {
    setChat(undefined);
    return ChatError.INVALID_CHAT;
  } else {
    setChat({ ...chat, chatName: data.chats[0].chat_name });
    setPersona({
      aiModel: data.ai_model,
      modelConfig: data.model_config,
      avatar: data.avatar,
      systemPrompt: data.system_prompt,
      initialMessage: data.initial_message,
    });
  }
}

export async function setChatHistoryWithChatId(
  chat: Chat,
  setChatHistory: (history: VercelChatMessage[]) => void
) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chat.id);

  if (error) {
    return ChatError.INVALID_CHAT_HISTORY;
  } else {
    setChatHistory(data);
  }
}

export async function configChatWithPersonaId(
  persona: Persona,
  setChat: (id: Chat | undefined) => void,
  setPersona: (id: Persona | undefined) => void,
  setChatHistory: (history: VercelChatMessage[]) => void
) {
  const { data, error } = await supabase
    .from('personas')
    .select(
      'name, avatar, system_prompt, initial_message, ai_model, model_config'
    )
    .eq('id', persona.id)
    .single();

  if (error) {
    setPersona(undefined);
    return ChatError.INVALID_PERSONA;
  } else {
    setChat({ chatName: data.name });
    setPersona({
      ...persona,
      aiModel: data.ai_model,
      modelConfig: data.model_config,
      avatar: data.avatar,
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

export async function insertNewChat(chatName: string, personaId: string) {
  const { data, error } = await supabase
    .from('chats')
    .insert({ chat_name: chatName, persona_id: personaId })
    .select('id');

  return data?.[0].id;
}

export async function saveMessageToDb(messages: Message[]) {
  const { error } = await supabase.from('messages').insert(messages);
  if (error) return ChatError.ERROR_SAVING_MESSAGES;
}
