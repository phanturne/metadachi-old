// Source: https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web/blob/main/app/masks/typing.ts

import { ModelConfig } from '@/stores';
import { Mask } from '@/types';

export type BuiltinMask = Omit<Mask, 'id' | 'modelConfig'> & {
  builtin: Boolean;
  modelConfig: Partial<ModelConfig>;
};
