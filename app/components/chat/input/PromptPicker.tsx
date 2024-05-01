import { MetadachiContext } from "@/app/lib/context"
import { Tables } from "@/supabase/types"
import { useContext, useEffect, useRef, useState } from "react"
import { usePromptAndCommand } from "@/app/lib/hooks/use-prompt-and-command"
import { PromptVariableModal } from "@/app/components/chat/input/PromptVariableModal"
import { Listbox, ListboxItem } from "@nextui-org/react"
import { usePickerKeyHandler } from "@/app/lib/hooks/use-keydown-handler"

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

  const handleItemSelect = (prompt: Tables<"prompts">) => {
    const regex = /\{\{.*?}}/g
    const matches = prompt.content.match(regex)

    if (matches) {
      const newPromptVariables = matches.map(match => ({
        promptId: prompt.id,
        name: match.replace(/\{\{|}}/g, ""),
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

  useEffect(() => {
    if (focusPrompt && itemsRef.current[0]) {
      itemsRef.current[0].focus()
    }
  }, [focusPrompt])

  const getKeyDownHandler = usePickerKeyHandler({
    itemsRef,
    filteredItems: filteredPrompts,
    handleItemSelect: handleItemSelect,
    handleOpenChange
  })

  const setItemRef = (ref: HTMLDivElement | null, index: number) => {
    if (ref) {
      itemsRef.current[index] = ref
    }
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
        <Listbox className="p-2">
          {filteredPrompts.length === 0 ? (
            <ListboxItem className="pointer-events-none" key="no-matching">
              No matching prompts.
            </ListboxItem>
          ) : (
            filteredPrompts.map((item: any, index: number) => (
              <ListboxItem
                className="pb-2"
                key={item.id}
                onClick={() => handleItemSelect(item)}
                onKeyDown={getKeyDownHandler(index, item)}
                tabIndex={index}
                // ref={(ref: HTMLDivElement) => setItemRef(ref, index)}
              >
                {/* TODO: Fix refs not working */}
                <div ref={(ref: HTMLDivElement) => setItemRef(ref, index)}>
                  <p className="text-sm">{item.name}</p>
                  <p className="text-xs text-default-500">{item.content}</p>
                </div>
              </ListboxItem>
            ))
          )}
        </Listbox>
      )}
    </>
  )
}
