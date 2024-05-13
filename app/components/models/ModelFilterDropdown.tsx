import React from "react"
import { Select, SelectItem } from "@nextui-org/react"

export const MODEL_PROVIDERS = {
  Local: "Local",
  Hosted: "Hosted",
  OpenAI: "OpenAI",
  Google: "Google",
  Groq: "Groq",
  Mistral: "Mistral",
  Perplexity: "Perplexity",
  Anthropic: "Anthropic",
  OpenRouter: "OpenRouter",
  Ollama: "Ollama"
} as const

export const MODEL_FILTERS = {
  ...MODEL_PROVIDERS,
  All: "All"
} as const

export function ModelFilterDropdown({
  modelFilter,
  setModelFilter,
  isDisabled,
  className
}: {
  modelFilter: string
  setModelFilter: (v: string) => void
  isDisabled?: boolean
  className?: string
}) {
  return (
    <Select
      variant="faded"
      isDisabled={isDisabled}
      defaultSelectedKeys={[MODEL_FILTERS.All]}
      value={modelFilter}
      onChange={e => {
        setModelFilter(e.target.value ?? MODEL_FILTERS.All)
      }}
      className={`w-36 ${className}`}
    >
      {Object.keys(MODEL_FILTERS).map(filter => (
        <SelectItem value={filter} key={filter}>
          {filter}
        </SelectItem>
      ))}
    </Select>
  )
}
