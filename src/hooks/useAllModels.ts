// Source: https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web/blob/main/app/utils/hooks.ts

import { useMemo } from 'react';
import { useAccessStore, useAppConfig } from '@/stores';
import { collectModels } from '@/utils/model';

export function useAllModels() {
  const accessStore = useAccessStore();
  const configStore = useAppConfig();
  const models = useMemo(() => {
    return collectModels(
      configStore.models,
      [configStore.customModels, accessStore.customModels].join(',')
    );
  }, [accessStore.customModels, configStore.customModels, configStore.models]);

  return models;
}
