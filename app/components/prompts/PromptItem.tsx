import { PROMPT_NAME_MAX } from "@/app/lib/db/limits"
import { Tables } from "@/supabase/types"
import React, { FC, useState } from "react"
import { DataListItem } from "@/app/components/ui/data-list/DataListItem"
import { DATA_LIST_ITEM_ICON_STYLE } from "@/app/lib/constants"
import { EditRounded } from "@mui/icons-material"
import { Input, Textarea } from "@nextui-org/react"

interface PromptItemProps {
  prompt: Tables<"prompts">
}

export const PromptItem: FC<PromptItemProps> = ({ prompt }) => {
  const [name, setName] = useState(prompt.name)
  const [content, setContent] = useState(prompt.content)
  const [isTyping, setIsTyping] = useState(false)

  return (
    <DataListItem
      item={prompt}
      isTyping={isTyping}
      contentType="prompts"
      icon={<EditRounded sx={DATA_LIST_ITEM_ICON_STYLE} />}
      updateState={{ name, content }}
      renderInputs={() => (
        <>
          <Input
            isRequired
            label="Name"
            labelPlacement="outside"
            placeholder="Prompt name..."
            value={name}
            onValueChange={setName}
            maxLength={PROMPT_NAME_MAX}
            description={`${name.length}/${PROMPT_NAME_MAX}`}
            onCompositionStart={() => setIsTyping(true)}
            onCompositionEnd={() => setIsTyping(false)}
          />

          <Textarea
            label="Prompt"
            labelPlacement="outside"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Prompt content..."
            maxRows={20}
            onCompositionStart={() => setIsTyping(true)}
            onCompositionEnd={() => setIsTyping(false)}
          />
        </>
      )}
    />
  )
}
