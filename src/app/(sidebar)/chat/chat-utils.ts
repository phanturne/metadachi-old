import { Message as VercelChatMessage } from 'ai/react';

export class ChatError {
  static INVALID_CHAT =
    'Error fetching chat messages: chat does not exist or is private.';
  static INVALID_CHAT_HISTORY = 'Error fetching chat history.';
  static INVALID_PERSONA =
    'Error fetching persona: persona does not exist or is private.';
}

export interface ChatInfo {
  personaId?: string;
  chatId?: string;
  chatName: string;
  chatHistory?: VercelChatMessage[];
  aiModel?: string;
  modelConfig?: any;
  systemPrompt?: string;
  initialMessage?: string;
  aiAvatar?: string;
}
