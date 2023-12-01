// Source: https://github.com/Yidadaa/ChatGPT-Next-Web/blob/main/app/typing.ts

export type Updater<T> = (updater: (value: T) => void) => void;
