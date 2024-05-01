import { CreateItemModal } from "@/app/components/ui/data-list/CreateItemModal"
import { MetadachiContext } from "@/app/lib/context"
import { PROMPT_NAME_MAX } from "@/app/lib/db/limits"
import { TablesInsert } from "@/supabase/types"
import React, { FC, useContext, useState } from "react"
import { Input, Textarea } from "@nextui-org/react"

interface CreatePromptProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const CreatePrompt: FC<CreatePromptProps> = ({
  isOpen,
  onOpenChange
}) => {
  const { profile, selectedWorkspace } = useContext(MetadachiContext)
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
      subtitle="Add prompt variables with double braces: {{variable}}"
      createState={
        {
          user_id: profile.user_id,
          name,
          content
        } as TablesInsert<"prompts">
      }
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
