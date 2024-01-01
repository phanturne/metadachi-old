import * as React from "react";
import { useAppConfig } from "@/stores";
import { ModelConfigList } from "@/components/ModelConfigList";

export default function ModelSettings() {
  const config = useAppConfig();

  return (
    <ModelConfigList
      modelConfig={config.modelConfig}
      updateConfig={(updater) => {
        const modelConfig = { ...config.modelConfig };
        updater(modelConfig);
        config.update((config) => (config.modelConfig = modelConfig));
      }}
    />
  );
}
