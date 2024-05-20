import { DEFAULT_CHAT_SETTINGS, LLM, LLMID } from "@/app/lib/types"
import React, { FC, useState } from "react"
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
import useModels from "@/app/lib/hooks/use-models"

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
  const { allModels, lockedModels } = useModels()

  const [modelFilter, setModelFilter] = useState<string>(MODEL_FILTERS.All)

  const selectedModel = allModels.find(
    model => model.modelId === selectedModelId
  )

  const filteredModels = allModels.filter(model => {
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

  const isLocked = (model: LLM) => {
    return lockedModels.includes(model.modelId)
  }

  return (
    <Autocomplete
      isDisabled={isDisabled}
      label={label ?? "Model"}
      labelPlacement={labelPlacement}
      size={size}
      placeholder="Select a model"
      defaultSelectedKey={selectedModel?.modelId ?? DEFAULT_CHAT_SETTINGS.model}
      defaultItems={filteredModels}
      value={selectedModel?.modelId}
      onSelectionChange={id => onSelectModel?.(id as LLMID)}
      disabledKeys={lockedModels}
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
                {SHOW_MODEL_COST && model.pricing ? (
                  <Tooltip content={getModelPricingTooltipText(model)}>
                    <div className="flex items-center gap-2">
                      <ModelIcon
                        provider={model.provider}
                        size="xs"
                        isLocked={isLocked(model)}
                      />
                      {model.modelName}
                    </div>
                  </Tooltip>
                ) : (
                  <div className="flex items-center gap-2">
                    <ModelIcon
                      provider={model.provider}
                      size="xs"
                      isLocked={isLocked(model)}
                    />
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
