import { Message as VercelChatMessage } from 'ai';
import { Bot, Chat } from '@/app/(sidebar)/chat/chat-utils';
import { createPersistStore } from '@/lib/utils/store';
import { StoreKey } from '@/lib/config';

type ChatState = {
  chat?: Chat;
  bot?: Bot;
  chatHistory: VercelChatMessage[];
  isEmptyChat: boolean;
};

const emptyChatState: ChatState = {
  chat: undefined,
  bot: undefined,
  chatHistory: [],
  isEmptyChat: true,
};

export const useChatStore = createPersistStore(
  emptyChatState,
  (set) => ({
    setNewChat: (chatId?: string, botId?: string) =>
      set(() => ({
        chat: chatId ? { id: chatId } : undefined,
        bot: botId ? { id: botId } : undefined,
        chatHistory: [],
        isEmptyChat: !(chatId || botId),
      })),
    setChat: (chat?: Chat) => set(() => ({ chat: chat })),
    setBot: (bot?: Bot) => set(() => ({ bot: bot })),
    setChatHistory: (messages: VercelChatMessage[]) =>
      set(() => ({ chatHistory: messages })),
    insertMessage: (m: VercelChatMessage) =>
      set((state) => ({ chatHistory: [...state.chatHistory, m] })),
    setIsEmptyChat: (b: boolean) => set(() => ({ isEmptyChat: b })),
  }),
  { name: StoreKey.Chat, version: 1.0 }
);
