import { create } from 'zustand';
import { Message as VercelChatMessage } from 'ai';
import { Chat, Persona } from '@/app/(sidebar)/chat/chat-utils';

type ChatState = {
  chat?: Chat;
  persona?: Persona;
  chatHistory: VercelChatMessage[];
};

const emptyChatState: ChatState = {
  chat: undefined,
  persona: undefined,
  chatHistory: [],
};

type ChatActions = {
  reset: () => void;
  setChat: (id: ChatState['chat']) => void;
  setPersona: (id: ChatState['persona']) => void;
  setChatHistory: (history: ChatState['chatHistory']) => void;
  insertMessage: (m: VercelChatMessage) => void;
};

export const useChatStore = create<ChatState & ChatActions>((set) => ({
  ...emptyChatState,
  reset: () => set(emptyChatState),
  setChat: (chat) => set(() => ({ chat: chat })),
  setPersona: (persona) => set(() => ({ persona: persona })),
  setChatHistory: (messages) => set(() => ({ chatHistory: messages })),
  insertMessage: (m) =>
    set((state) => ({ chatHistory: [...state.chatHistory, m] })),
}));
