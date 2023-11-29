import { create } from 'zustand';
import { Message as VercelChatMessage } from 'ai';
import { Chat, Persona } from '@/app/(sidebar)/chat/chat-utils';

type ChatState = {
  chat?: Chat;
  persona?: Persona;
  chatHistory: VercelChatMessage[];
  isEmptyChat: boolean;
};

const emptyChatState: ChatState = {
  chat: undefined,
  persona: undefined,
  chatHistory: [],
  isEmptyChat: true,
};

type ChatActions = {
  setNewChat: (chatId?: string, personaId?: string) => void;
  setChat: (id: ChatState['chat']) => void;
  setPersona: (id: ChatState['persona']) => void;
  setChatHistory: (history: ChatState['chatHistory']) => void;
  insertMessage: (m: VercelChatMessage) => void;
  setIsEmptyChat: (b: boolean) => void;
};

export const useChatStore = create<ChatState & ChatActions>((set) => ({
  ...emptyChatState,
  setNewChat: (chatId, personaId) =>
    set(() => ({
      chat: chatId ? { id: chatId } : undefined,
      persona: personaId ? { id: personaId } : undefined,
      chatHistory: [],
      isEmptyChat: !(chatId || personaId),
    })),
  setChat: (chat) => set(() => ({ chat: chat })),
  setPersona: (persona) => set(() => ({ persona: persona })),
  setChatHistory: (messages) => set(() => ({ chatHistory: messages })),
  insertMessage: (m) =>
    set((state) => ({ chatHistory: [...state.chatHistory, m] })),
  setIsEmptyChat: (b) => set(() => ({ isEmptyChat: b })),
}));
