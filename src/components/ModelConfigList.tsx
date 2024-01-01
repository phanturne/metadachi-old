import { ModalConfigValidator, ModelConfig, useAppConfig } from "@/stores";
import { useAllModels } from "@/hooks/useAllModels";
import * as React from "react";
import { useMemo } from "react";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import { Autocomplete } from "@/components/Autocomplete";
import Typography from "@mui/joy/Typography";

export function ModelConfigList(props: {
  modelConfig: ModelConfig;
  updateConfig: (updater: (config: ModelConfig) => void) => void;
}) {
  const allModels = useAllModels();
  const models = useMemo(
    () => allModels.filter((m) => m.available),
    [allModels],
  );

  const config = useAppConfig(); // todo: remove
  return (
    <Stack
      spacing={4}
      sx={{
        display: "flex",
        maxWidth: "800px",
        mx: "auto",
        px: { xs: 2, md: 6 },
        py: { xs: 2, md: 3 },
      }}
    >
      <Card>
        <Typography level="body-md">
          Note: Default model configs are tied to each model.
        </Typography>
        <Autocomplete
          variant="box"
          name="Default Model"
          defaultValue={props.modelConfig.model}
          placeholder="N/A"
          options={models.map((m) => m.displayName)}
          onChange={(_, v) => {
            props.updateConfig(
              (config) => (config.model = ModalConfigValidator.model(v)),
            );
          }}
          textLevel={"title-md"}
        />
      </Card>
    </Stack>
  );
}
