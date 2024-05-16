// Source: https://github.com/mckaywrigley/chatbot-ui/blob/main/components/chat/prompt-picker.tsx

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea
} from "@nextui-org/react"
import * as React from "react"

interface PromptVariableModalProps {
  showPromptVariables: boolean
  setShowPromptVariables: (showPromptVariables: boolean) => void
  promptVariables: {
    promptId: string
    name: string
    value: string
  }[]
  setPromptVariables: (
    promptVariables: {
      promptId: string
      name: string
      value: string
    }[]
  ) => void
  handleSubmitPromptVariables: () => void
}

export function PromptVariableModal({
  showPromptVariables,
  setShowPromptVariables,
  promptVariables,
  setPromptVariables,
  handleSubmitPromptVariables
}: PromptVariableModalProps) {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmitPromptVariables()
  }

  // Create a ref for each textarea
  const textAreaRefs = promptVariables.map(() =>
    React.createRef<HTMLTextAreaElement>()
  )

  // Focus on the first textarea when the modal opens
  React.useEffect(() => {
    if (showPromptVariables && textAreaRefs[0].current) {
      textAreaRefs[0].current.focus()
    }
  }, [showPromptVariables])

  return (
    <Modal
      isOpen={showPromptVariables}
      onOpenChange={() => setShowPromptVariables(false)}
    >
      <ModalContent>
        <ModalHeader>Enter Prompt Variables</ModalHeader>
        <form onSubmit={handleFormSubmit}>
          <ModalBody>
            {promptVariables.map((variable, index) => (
              <Textarea
                size="sm"
                key={`prompt-var-${variable}`}
                label={variable.name}
                placeholder={`Enter a value for ${variable.name}...`}
                value={variable.value}
                onChange={e => {
                  const newPromptVariables = [...promptVariables]
                  newPromptVariables[index].value = e.target.value
                  setPromptVariables(newPromptVariables)
                }}
                minRows={1}
                maxRows={5}
                ref={textAreaRefs[index]} // Assign the ref to the textarea
              />
            ))}
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              onClick={() => setShowPromptVariables(false)}
            >
              Cancel
            </Button>

            <Button color="primary" type="submit">
              Submit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
