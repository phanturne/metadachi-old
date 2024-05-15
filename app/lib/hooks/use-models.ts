import { useContext, useState, useEffect } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { LLM, LLMID, ModelProvider } from "@/app/lib/types"
import { SYSTEM_LLM_ID_LIST } from "@/app/lib/config"

function useModels() {
  const {
    models,
    availableHostedModels,
    availableLocalModels,
    availableOpenRouterModels
  } = useContext(MetadachiContext)

  const [allModels, setAllModels] = useState<LLM[]>([])
  const [lockedModels, setLockedModels] = useState<LLMID[]>([])

  useEffect(() => {
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

    setAllModels(ALL_MODELS)

    if (SYSTEM_LLM_ID_LIST.length !== 0) {
      const LOCKED_MODELS = ALL_MODELS.filter(
        m => !SYSTEM_LLM_ID_LIST.includes(m.modelId)
      ).map(m => m.modelId)

      setLockedModels(LOCKED_MODELS)
    }
  }, [
    models,
    availableHostedModels,
    availableLocalModels,
    availableOpenRouterModels
  ])

  return { allModels, lockedModels }
}

export default useModels
