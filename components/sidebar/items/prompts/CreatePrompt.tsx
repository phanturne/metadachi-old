import { CreateItemModal } from "@/components/sidebar/items/all/CreateItemModal"
import { ChatbotUIContext } from "@/context/context"
import { PROMPT_NAME_MAX } from "@/db/limits"
import { TablesInsert } from "@/supabase/types"
import { FC, useContext, useState } from "react"
import { FormControl, FormLabel, Input, Textarea } from "@mui/joy"

interface CreatePromptProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const CreatePrompt: FC<CreatePromptProps> = ({
  isOpen,
  onOpenChange
}) => {
  const { profile, selectedWorkspace } = useContext(ChatbotUIContext)
  const [isTyping, setIsTyping] = useState(false)
  const [name, setName] = useState("")
  const [content, setContent] = useState("")

  if (!profile) return null
  if (!selectedWorkspace) return null

  return (
    <CreateItemModal
      contentType="prompts"
      isOpen={isOpen}
      isTyping={isTyping}
      onOpenChange={onOpenChange}
      createState={
        {
          user_id: profile.user_id,
          name,
          content
        } as TablesInsert<"prompts">
      }
      renderInputs={() => (
        <>
          <FormControl>
            <FormLabel>Name</FormLabel>

            <Input
              required
              placeholder="Prompt name..."
              value={name}
              onChange={e => setName(e.target.value)}
              slotProps={{ input: { maxLength: PROMPT_NAME_MAX } }}
              onCompositionStart={() => setIsTyping(true)}
              onCompositionEnd={() => setIsTyping(false)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Prompt</FormLabel>

            <Textarea
              placeholder="Prompt content..."
              value={content}
              onChange={e => setContent(e.target.value)}
              minRows={6}
              maxRows={20}
              onCompositionStart={() => setIsTyping(true)}
              onCompositionEnd={() => setIsTyping(false)}
            />
          </FormControl>
        </>
      )}
    />
  )
}
