import { PROMPT_NAME_MAX } from "@/app/lib/db/limits"
import { Tables } from "@/supabase/types"
import { FC, useState } from "react"
import { DataListItem } from "@/app/components/data-list/shared/DataListItem"
import { DATA_LIST_ITEM_ICON_STYLE } from "@/app/lib/constants"
import { EditRounded } from "@mui/icons-material"
import { FormControl, FormLabel, Input, Textarea } from "@mui/joy"

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
          <FormControl>
            <FormLabel>Name</FormLabel>

            <Input
              placeholder="Prompt name..."
              value={name}
              onChange={e => setName(e.target.value)}
              slotProps={{ input: { maxLength: PROMPT_NAME_MAX } }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Prompt</FormLabel>

            <Textarea
              placeholder="Prompt..."
              value={content}
              onChange={e => setContent(e.target.value)}
              minRows={6}
              maxRows={20}
            />
          </FormControl>
        </>
      )}
    />
  )
}
