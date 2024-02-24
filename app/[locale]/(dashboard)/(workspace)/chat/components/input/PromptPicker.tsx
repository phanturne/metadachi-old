import { MetadachiContext } from "@/app/lib/context"
import { Tables } from "@/supabase/types"
import { useContext, useEffect, useRef, useState } from "react"
import { usePromptAndCommand } from "@/app/lib/hooks/use-prompt-and-command"
import { PromptVariableModal } from "@/app/[locale]/(dashboard)/(workspace)/chat/components/input/PromptVariableModal"
import { ChatCommandsList } from "@/app/[locale]/(dashboard)/(workspace)/chat/components/input/ChatCommandsList"
import { Typography } from "@mui/joy"

export function PromptPicker() {
  const {
    prompts,
    isPromptPickerOpen,
    setIsPromptPickerOpen,
    focusPrompt,
    slashCommand
  } = useContext(MetadachiContext)

  const { handleSelectPrompt } = usePromptAndCommand()

  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  const [promptVariables, setPromptVariables] = useState<
    {
      promptId: string
      name: string
      value: string
    }[]
  >([])
  const [showPromptVariables, setShowPromptVariables] = useState(false)

  useEffect(() => {
    if (focusPrompt && itemsRef.current[0]) {
      itemsRef.current[0].focus()
    }
  }, [focusPrompt])

  const filteredPrompts = prompts.filter(prompt =>
    prompt.name.toLowerCase().includes(slashCommand.toLowerCase())
  )

  const handleOpenChange = (isOpen: boolean) => {
    setIsPromptPickerOpen(isOpen)
  }

  const callSelectPrompt = (prompt: Tables<"prompts">) => {
    const regex = /\{\{.*?\}\}/g
    const matches = prompt.content.match(regex)

    if (matches) {
      const newPromptVariables = matches.map(match => ({
        promptId: prompt.id,
        name: match.replace(/\{\{|\}\}/g, ""),
        value: ""
      }))

      setPromptVariables(newPromptVariables)
      setShowPromptVariables(true)
    } else {
      handleSelectPrompt(prompt)
      handleOpenChange(false)
    }
  }

  const handleSubmitPromptVariables = () => {
    const newPromptContent = promptVariables.reduce(
      (prevContent, variable) =>
        prevContent.replace(
          new RegExp(`\\{\\{${variable.name}\\}\\}`, "g"),
          variable.value
        ),
      prompts.find(prompt => prompt.id === promptVariables[0].promptId)
        ?.content || ""
    )

    const newPrompt: any = {
      ...prompts.find(prompt => prompt.id === promptVariables[0].promptId),
      content: newPromptContent
    }

    handleSelectPrompt(newPrompt)
    handleOpenChange(false)
    setShowPromptVariables(false)
    setPromptVariables([])
  }

  const getPromptItemContent = (item: Tables<"prompts">) => {
    return (
      <>
        <Typography level="title-sm" fontWeight="md">
          {item.name}
        </Typography>
        <Typography level="body-sm" noWrap>
          {item.content}
        </Typography>
      </>
    )
  }

  if (!isPromptPickerOpen) return

  return (
    <>
      {showPromptVariables ? (
        <PromptVariableModal
          showPromptVariables={showPromptVariables}
          setShowPromptVariables={setShowPromptVariables}
          promptVariables={promptVariables}
          setPromptVariables={setPromptVariables}
          handleSubmitPromptVariables={handleSubmitPromptVariables}
        />
      ) : (
        <ChatCommandsList
          commandType="prompt"
          filteredItems={filteredPrompts}
          focusItem={focusPrompt}
          setIsPickerOpen={setIsPromptPickerOpen}
          handleItemSelect={callSelectPrompt}
          getItemContent={getPromptItemContent}
        />
      )}
    </>
  )
}
