import { create } from 'zustand';
import { Message as VercelChatMessage } from 'ai';
import { Chat, Bot } from '@/app/(sidebar)/chat/chat-utils';

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

type ChatActions = {
  setNewChat: (chatId?: string, botId?: string) => void;
  setChat: (id: ChatState['chat']) => void;
  setBot: (id: ChatState['bot']) => void;
  setChatHistory: (history: ChatState['chatHistory']) => void;
  insertMessage: (m: VercelChatMessage) => void;
  setIsEmptyChat: (b: boolean) => void;
};

export const useChatStore = create<ChatState & ChatActions>((set) => ({
  ...emptyChatState,
  setNewChat: (chatId, botId) =>
    set(() => ({
      chat: chatId ? { id: chatId } : undefined,
      bot: botId ? { id: botId } : undefined,
      chatHistory: [],
      isEmptyChat: !(chatId || botId),
    })),
  setChat: (chat) => set(() => ({ chat: chat })),
  setBot: (bot) => set(() => ({ bot: bot })),
  setChatHistory: (messages) => set(() => ({ chatHistory: messages })),
  insertMessage: (m) =>
    set((state) => ({ chatHistory: [...state.chatHistory, m] })),
  setIsEmptyChat: (b) => set(() => ({ isEmptyChat: b })),
}));
