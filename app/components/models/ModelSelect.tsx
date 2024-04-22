import { MetadachiContext } from "@/app/lib/context"
import { LLMID, ModelProvider } from "@/app/lib/types"
import React, { FC, useContext, useState } from "react"
import { ModelIcon } from "./ModelIcon"
import { ModelFilterDropdown } from "@/app/components/models/ModelFilterDropdown"
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection
} from "@nextui-org/react"

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
export const MODEL_PROVIDERS = Object.keys(MODEL_FILTERS) as ModelFilter[]

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
  } = useContext(MetadachiContext)

  const [modelFilter, setModelFilter] = useState<string>(MODEL_PROVIDERS[0])
  // const [filteredModels, setFilteredModels] = useState<LLM[]>([])
  // const [isLocked, setIsLocked] = useState<boolean>(true)
  // const [lockedModels, setLockedModels] = useState<LLMID[]>([])

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

  // const ALL_MODEL_IDS = ALL_MODELS.map(model => model.modelId)
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

  // if (!selectedModel) return null

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
      label="Model"
      labelPlacement="outside"
      placeholder="Select a model"
      defaultSelectedKey={selectedModel?.modelId}
      defaultItems={filteredModels}
      value={selectedModel?.modelId}
      onSelectionChange={id => onSelectModel(id as LLMID)}
      startContent={
        <div className="-ml-3 flex flex-row items-center space-x-2">
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
        </div>
      }
    >
      {MODEL_PROVIDERS.map(provider => (
        <AutocompleteSection key={provider} title={provider}>
          {filteredModels
            .filter(model => model.provider === provider.toLowerCase())
            .map(model => (
              <AutocompleteItem key={model.modelId} textValue={model.modelName}>
                <div className="flex items-center space-x-2">
                  <ModelIcon provider={model.provider} width={28} height={28} />
                  <span className="pl-2 text-small">{model.modelName}</span>
                </div>
              </AutocompleteItem>
            ))}
        </AutocompleteSection>
      ))}
    </Autocomplete>
  )
}
