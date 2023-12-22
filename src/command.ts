// Source: https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web/blob/main/app/command.ts

import Locale from './locales';

type Command = (param: string) => void;

interface ChatCommands {
  new?: Command;
  newm?: Command;
  next?: Command;
  prev?: Command;
  clear?: Command;
  del?: Command;
}

// TODO: Move to constants.ts
export const ChatCommandPrefix = ':';

export function useChatCommand(commands: ChatCommands = {}) {
  function extract(userInput: string) {
    return (
      userInput.startsWith(ChatCommandPrefix) ? userInput.slice(1) : userInput
    ) as keyof ChatCommands;
  }

  function search(userInput: string) {
    const input = extract(userInput);
    const desc = Locale.Chat.Commands;
    return Object.keys(commands)
      .filter((c) => c.startsWith(input))
      .map((c) => ({
        title: desc[c as keyof ChatCommands],
        content: ChatCommandPrefix + c,
      }));
  }

  function match(userInput: string) {
    const command = extract(userInput);
    const matched = typeof commands[command] === 'function';

    return {
      matched,
      invoke: () => matched && commands[command]!(userInput),
    };
  }

  return { match, search };
}
