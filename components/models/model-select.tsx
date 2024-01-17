import { ChatbotUIContext } from "@/context/context"
import { isModelLocked } from "@/lib/is-model-locked"
import { LLM, LLMID } from "@/types"
import React, { FC, useContext, useEffect, useState } from "react"
import { ModelIcon } from "./model-icon"
import {
  Autocomplete,
  AutocompleteOption,
  ListItemContent,
  Option,
  Select
} from "@mui/joy"

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
  const [isLocked, setIsLocked] = useState<boolean>(true)

  useEffect(() => {
    const checkModelLock = async () => {
      if (SELECTED_MODEL && profile) {
        const locked = await isModelLocked(SELECTED_MODEL.provider, profile)
        setIsLocked(locked as boolean)
      }
    }

    checkModelLock()
  }, [profile])

  const ALL_MODELS = [
    ...hostedModelOptions,
    ...localModelOptions,
    ...availableOpenRouterModels
  ]

  const SELECTED_MODEL = ALL_MODELS.find(
    model => model.modelId === selectedModelId
  )

  if (!SELECTED_MODEL) return null
  if (!profile) return null

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
        sx={{ ml: "-12px", width: "150px" }}
      >
        {MODEL_FILTER_LIST.map(filter => (
          <Option value={filter}>{filter}</Option>
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
      getOptionLabel={option => option.modelName}
      getOptionDisabled={_ => false} // TODO: Fix
      renderOption={(props, option) => (
        <AutocompleteOption {...props}>
          <ModelIcon
            modelId={SELECTED_MODEL?.modelId as LLMID}
            width={26}
            height={26}
          />
          <ListItemContent sx={{ fontSize: "sm" }}>
            {option.modelName}
          </ListItemContent>
        </AutocompleteOption>
      )}
    />
  )
}
