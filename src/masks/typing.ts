// Source: https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web/blob/main/app/masks/typing.ts

import { ModelConfig } from '@/stores';
import { type Mask } from '@/stores/mask';

export type BuiltinMask = Omit<Mask, 'id' | 'modelConfig'> & {
  builtin: Boolean;
  modelConfig: Partial<ModelConfig>;
};
