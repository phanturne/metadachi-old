export class ChatError {
  static INVALID_CHAT =
    'Error fetching chat messages: chat does not exist or is private.';
  static INVALID_CHAT_HISTORY = 'Error fetching chat history.';
  static INVALID_BOT = 'Error fetching bot: bot does not exist or is private.';
  static ERROR_CREATING_NEW_CHAT = 'Error creating new chat.';
  static ERROR_SAVING_MESSAGES = 'Error saving messages into the database.';
}

export interface Chat {
  id?: string;
  createdAt?: string;
  chatName?: string;
  botId?: string;
  public?: boolean;
  userId?: string;
}

export interface Bot {
  id?: string;
  name?: string;
  systemPrompt?: string;
  initialMessage?: string;
  description?: string;
  tags?: string[];
  aiModel?: string;
  modelConfig?: any;
  userId?: string;
  createdAt?: string;
  public?: boolean;
}
