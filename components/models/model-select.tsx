import { ChatbotUIContext } from "@/context/context"
import { isModelLocked } from "@/lib/is-model-locked"
import { LLM, LLMID } from "@/types"
import React, { FC, useContext, useEffect, useMemo, useState } from "react"
import { ModelIcon } from "./model-icon"
import { Autocomplete, Option, Select } from "@mui/joy"
import { ModelOption } from "@/components/models/model-option"

interface ModelSelectProps {
  hostedModelOptions: LLM[]
  localModelOptions: LLM[]
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
const MODEL_FILTER_LIST = Object.keys(MODEL_FILTERS) as ModelFilter[]

export const ModelSelect: FC<ModelSelectProps> = ({
  hostedModelOptions,
  localModelOptions,
  selectedModelId,
  onSelectModel
}) => {
  const { profile, availableOpenRouterModels } = useContext(ChatbotUIContext)

  const [modelFilter, setModelFilter] = useState<string>(MODEL_FILTER_LIST[0])
  // const [isLocked, setIsLocked] = useState<boolean>(true)
  const [lockedModels, setLockedModels] = useState<string[]>([])

  const ALL_MODELS = useMemo(
    () => [
      ...hostedModelOptions,
      ...localModelOptions,
      ...availableOpenRouterModels
    ],
    [hostedModelOptions, localModelOptions, availableOpenRouterModels]
  )

  useEffect(() => {
    const checkModelLock = async () => {
      const isUsingAzure = profile?.use_azure_openai

      if (!profile) return null

      // Set which autocomplete options are locked
      const tempLockedModels: string[] = []
      for (const model of ALL_MODELS) {
        const locked = await isModelLocked(
          model.provider === "openai" && isUsingAzure
            ? "azure"
            : model.provider,
          profile
        )
        if (locked) tempLockedModels.push(model.modelId)
      }
      setLockedModels(tempLockedModels)

      // if (SELECTED_MODEL) {
      //   setIsLocked(tempLockedModels.includes(SELECTED_MODEL.modelId))
      // }
    }

    checkModelLock()
  }, [profile, ALL_MODELS])

  const SELECTED_MODEL = ALL_MODELS.find(
    model => model.modelId === selectedModelId
  )

  if (!SELECTED_MODEL || !profile) return null

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

  const ModelFilterDropdown = () => {
    return (
      <Select
        variant="soft"
        defaultValue={MODEL_FILTER_LIST[0]}
        value={modelFilter}
        onChange={(_, v) => {
          console.log("v", v)
          setModelFilter(v ?? MODEL_FILTERS.All)
        }}
        sx={{ ml: "-12px", width: "150px", mr: 1 }}
      >
        {MODEL_FILTER_LIST.map(filter => (
          <Option value={filter} key={`model-filter-${filter}`}>
            {filter}
          </Option>
        ))}
      </Select>
    )
  }

  return (
    <Autocomplete
      defaultValue={SELECTED_MODEL}
      value={SELECTED_MODEL}
      onChange={(_, value) => onSelectModel(value?.modelId as LLMID)}
      options={filteredModels}
      groupBy={option => option.provider}
      startDecorator={
        <>
          <ModelFilterDropdown />
          <ModelIcon
            modelId={SELECTED_MODEL?.modelId as LLMID}
            width={26}
            height={26}
          />
        </>
      }
      autoHighlight
      getOptionLabel={model => model.modelName}
      getOptionDisabled={model => lockedModels.includes(model.modelId)} // TODO: Fix
      renderOption={(props, model) => (
        <ModelOption model={model} props={props} />
      )}
    />
  )
}
