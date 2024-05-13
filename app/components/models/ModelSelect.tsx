import { MetadachiContext } from "@/app/lib/context"
import { LLM, LLMID, ModelProvider } from "@/app/lib/types"
import React, { FC, useContext, useState } from "react"
import { ModelIcon } from "./ModelIcon"
import {
  MODEL_FILTERS,
  MODEL_PROVIDERS,
  ModelFilterDropdown
} from "@/app/components/models/ModelFilterDropdown"
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
  Tooltip
} from "@nextui-org/react"
import { SHOW_MODEL_COST } from "@/app/lib/config"

interface ModelSelectProps {
  isDisabled?: boolean
  selectedModelId?: string
  onSelectModel?: (modelId: LLMID) => void
  showModelFilter?: boolean
  size?: "sm" | "md" | "lg"
  label?: string
  labelPlacement?: "outside" | "inside"
}

export const ModelSelect: FC<ModelSelectProps> = ({
  isDisabled,
  selectedModelId,
  onSelectModel,
  showModelFilter,
  size,
  label,
  labelPlacement = "outside"
}) => {
  const {
    models,
    availableHostedModels,
    availableLocalModels,
    availableOpenRouterModels
  } = useContext(MetadachiContext)

  const [modelFilter, setModelFilter] = useState<string>(MODEL_FILTERS.All)
  // const [filteredModels, setFilteredModels] = useState<LLM[]>([])
  // const [isLocked, setIsLocked] = useState<boolean>(true)
  // const [lockedModels, setLockedModels] = useState<LLMID[]>([])

  const ALL_MODELS: LLM[] = [
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

  const getModelPricingTooltipText = (model: LLM) => {
    let result = ""
    if (model.provider !== "ollama" && model.pricing) {
      result += `Input: ${model.pricing.inputCost} ${model.pricing.currency} / ${model.pricing.unit}`
      if (model.pricing.inputCost && model.pricing.outputCost) {
        result += "; "
      }
      if (model.pricing.outputCost) {
        result += `Output: ${model.pricing.outputCost} ${model.pricing.currency} / ${model.pricing.unit}`
      }
    }
    return result
  }

  return (
    <Autocomplete
      isDisabled={isDisabled}
      label={label ?? "Model"}
      labelPlacement={labelPlacement}
      size={size}
      placeholder="Select a model"
      defaultSelectedKey={selectedModel?.modelId}
      defaultItems={filteredModels}
      value={selectedModel?.modelId}
      onSelectionChange={id => onSelectModel?.(id as LLMID)}
      startContent={
        labelPlacement === "outside" && (
          <div className="flex flex-row items-center space-x-2">
            {showModelFilter && (
              <ModelFilterDropdown
                isDisabled={isDisabled}
                modelFilter={modelFilter}
                setModelFilter={setModelFilter}
                className="-ml-3"
              />
            )}
            <ModelIcon provider={selectedModel?.provider} size="xs" />
          </div>
        )
      }
    >
      {Object.keys(MODEL_PROVIDERS).map(provider => (
        <AutocompleteSection key={provider} title={provider}>
          {filteredModels
            .filter(model => model.provider === provider.toLowerCase())
            .map(model => (
              <AutocompleteItem key={model.modelId} textValue={model.modelName}>
                {" "}
                {SHOW_MODEL_COST && model.pricing ? (
                  <Tooltip content={getModelPricingTooltipText(model)}>
                    <div className="flex items-center gap-2">
                      <ModelIcon provider={model.provider} size="xs" />
                      {model.modelName}
                    </div>
                  </Tooltip>
                ) : (
                  <div className="flex items-center gap-2">
                    <ModelIcon provider={model.provider} size="xs" />
                    {model.modelName}
                  </div>
                )}
              </AutocompleteItem>
            ))}
        </AutocompleteSection>
      ))}
    </Autocomplete>
  )
}
