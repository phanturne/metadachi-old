import { ChatbotUIContext } from "@/context/context"
import { LLMID, ModelProvider } from "@/types"
import React, { FC, useContext, useState } from "react"
import { ModelIcon } from "./model-icon"
import { Autocomplete, Box } from "@mui/joy"
import { ModelOption } from "@/components/models/ModelOption"
import { ModelFilterDropdown } from "@/components/models/ModelFilterDropdown"

interface ModelSelectProps {
  disabled?: boolean
  selectedModelId: string
  onSelectModel: (modelId: LLMID) => void
}

const MODEL_FILTERS = {
  All: "All",
  Local: "Local",
  Hosted: "Hosted",
  OpenAI: "OpenAI",
  Google: "Google",
  Mistral: "Mistral",
  Perplexity: "Perplexity",
  Anthropic: "Anthropic",
  OpenRouter: "OpenRouter",
  Ollama: "Ollama"
} as const

type ModelFilter = (typeof MODEL_FILTERS)[keyof typeof MODEL_FILTERS]
export const MODEL_FILTER_LIST = Object.keys(MODEL_FILTERS) as ModelFilter[]

export const ModelSelect: FC<ModelSelectProps> = ({
  disabled,
  selectedModelId,
  onSelectModel
}) => {
  const {
    profile,
    models,
    availableHostedModels,
    availableLocalModels,
    availableOpenRouterModels
  } = useContext(ChatbotUIContext)

  const [modelFilter, setModelFilter] = useState<string>(MODEL_FILTER_LIST[0])
  // const [isLocked, setIsLocked] = useState<boolean>(true)
  const [lockedModels, setLockedModels] = useState<LLMID[]>([])

  const ALL_MODELS = [
    ...models.map(model => ({
      modelId: model.model_id as LLMID,
      modelName: model.name,
      provider: "custom" as ModelProvider,
      hostedId: model.id,
      platformLink: "",
      imageInput: false
    })),
    ...availableHostedModels,
    ...availableLocalModels,
    ...availableOpenRouterModels
  ]

  const ALL_MODEL_IDS = ALL_MODELS.map(model => model.modelId)

  // useEffect(() => {
  //   const checkModelLock = async () => {
  //     const isUsingAzure = profile?.use_azure_openai
  //
  //     // If the user is not logged in, lock all models except the guest models
  //     if (!profile) {
  //       setLockedModels(
  //         ALL_MODEL_IDS.filter(id => !GUEST_LLM_LIST.includes(id))
  //       )
  //       return null
  //     }
  //
  //     // Set which autocomplete options are locked
  //     const tempLockedModels: string[] = []
  //     for (const model of ALL_MODELS) {
  //       const locked = await isModelLocked(
  //         model.provider === "openai" && isUsingAzure
  //           ? "azure"
  //           : model.provider,
  //         profile
  //       )
  //       if (locked) tempLockedModels.push(model.modelId)
  //     }
  //     setLockedModels(tempLockedModels as LLMID[])
  //
  //     // if (SELECTED_MODEL) {
  //     //   setIsLocked(tempLockedModels.includes(SELECTED_MODEL.modelId))
  //     // }
  //   }
  //
  //   checkModelLock()
  // }, [profile, ALL_MODELS])

  const selectedModel = ALL_MODELS.find(
    model => model.modelId === selectedModelId
  )

  if (!selectedModel) return null

  const filteredModels = ALL_MODELS.filter(model => {
    const filter = modelFilter.toLowerCase()
    if (filter === MODEL_FILTERS.All.toLowerCase()) {
      return true
    }
    if (filter === MODEL_FILTERS.Hosted.toLowerCase()) {
      return model.provider !== MODEL_FILTERS.Ollama.toLowerCase()
    }
    if (filter === MODEL_FILTERS.Local) {
      return model.provider === MODEL_FILTERS.Ollama.toLowerCase()
    }
    return model.provider === filter
  })

  return (
    <Autocomplete
      disabled={disabled}
      defaultValue={selectedModel}
      value={selectedModel}
      onChange={(_, value) => onSelectModel(value?.modelId as LLMID)}
      options={filteredModels}
      groupBy={option => option.provider}
      startDecorator={
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            alignItems: "center",
            ml: "-12px"
          }}
        >
          <ModelFilterDropdown
            disabled={disabled}
            modelFilter={modelFilter}
            setModelFilter={setModelFilter}
          />
          <ModelIcon
            provider={selectedModel?.provider}
            width={26}
            height={26}
          />
        </Box>
      }
      autoHighlight
      getOptionLabel={model => model.modelName}
      getOptionDisabled={model => lockedModels.includes(model.modelId)}
      renderOption={(props, model) => (
        <ModelOption model={model} props={props} />
      )}
    />
  )
}
