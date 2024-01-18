import { ChatbotUIContext } from "@/context/context"
import { isModelLocked } from "@/lib/is-model-locked"
import { LLM, LLMID } from "@/types"
import { IconLock } from "@tabler/icons-react"
import React, { FC, useContext, useEffect, useState } from "react"
import { WithTooltip } from "../ui/with-tooltip"
import { ModelIcon } from "./model-icon"
import { AutocompleteOption, ListItemContent } from "@mui/joy"

interface ModelOptionProps {
  model: LLM
  props: Omit<React.HTMLAttributes<HTMLLIElement>, "color">
}

export const ModelOption: FC<ModelOptionProps> = ({ model, props }) => {
  const { profile } = useContext(ChatbotUIContext)
  const [isLocked, setIsLocked] = useState<Boolean>(true)

  useEffect(() => {
    async function setup() {
      if (!profile) return null

      const isUsingAzure = profile?.use_azure_openai

      const locked = await isModelLocked(
        model.provider === "openai" && isUsingAzure ? "azure" : model.provider,
        profile
      )

      setIsLocked(locked)
    }
    setup()
  }, [model, profile])

  if (!profile) return null

  return (
    <AutocompleteOption {...props}>
      {isLocked ? (
        <WithTooltip
          display={
            <div>
              Save {model.provider} API key in profile settings to unlock.
            </div>
          }
          trigger={<IconLock className="mr-2" size={26} />}
        />
      ) : (
        <ModelIcon modelId={model.modelId as LLMID} width={28} height={28} />
      )}
      <ListItemContent sx={{ fontSize: "sm" }}>
        {model.modelName}
      </ListItemContent>
    </AutocompleteOption>
  )
}
