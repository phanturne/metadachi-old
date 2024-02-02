import { ChatbotUIContext } from "@/context/context"
import { LLM } from "@/types"
import React, { FC, useContext, useEffect, useState } from "react"
import { ModelIcon } from "./model-icon"
import { AutocompleteOption, ListItemContent } from "@mui/joy"
import { GUEST_LLM_LIST } from "@/lib/constants"

interface ModelOptionProps {
  model: LLM
  props: Omit<React.HTMLAttributes<HTMLLIElement>, "color">
}

export const ModelOption: FC<ModelOptionProps> = ({ model, props }) => {
  const { profile } = useContext(ChatbotUIContext)
  const [isLocked, setIsLocked] = useState<Boolean>(true)

  // useEffect(() => {
  //   async function setup() {
  //     if (!profile) {
  //       setIsLocked(!GUEST_LLM_LIST.includes(model.modelId))
  //       return null
  //     }
  //
  //     const isUsingAzure = profile?.use_azure_openai
  //
  //     const locked = await isModelLocked(
  //       model.provider === "openai" && isUsingAzure ? "azure" : model.provider,
  //       profile
  //     )
  //
  //     setIsLocked(locked)
  //   }
  //   setup()
  // }, [model, profile])

  return (
    <AutocompleteOption {...props}>
      <ModelIcon provider={model.provider} width={28} height={28} />
      <ListItemContent sx={{ fontSize: "sm" }}>
        {model.modelName}
      </ListItemContent>
    </AutocompleteOption>
  )
}
