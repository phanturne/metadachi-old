import { create } from 'zustand';

type ChatState = {
  chatId: string | undefined;
  personaId: string | undefined;
  setChatId: (id: string | undefined) => void;
  setPersonaId: (id: string | undefined) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  chatId: undefined,
  personaId: undefined,
  setChatId: (id: string | undefined) => set({ chatId: id }),
  setPersonaId: (id: string | undefined) => set({ personaId: id }),
}));
