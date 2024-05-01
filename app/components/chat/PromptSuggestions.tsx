import { Button, ScrollShadow } from "@nextui-org/react"
import * as React from "react"
import { usePromptAndCommand } from "@/app/lib/hooks/use-prompt-and-command"

const ideas = [
  "Summarize the following text",
  "Create a list of healthy recipes for lunch",
  "Write a poem about nature",
  "Check this text for grammar errors and typos",
  "Brainstorm business names for a new company"
]

export default function PromptSuggestions() {
  const { handleInputChange } = usePromptAndCommand()

  return (
    <ScrollShadow
      hideScrollBar
      className="flex flex-nowrap gap-2"
      orientation="horizontal"
    >
      <div className="flex gap-2">
        {ideas.map((idea, index) => (
          <Button
            key={index}
            variant="flat"
            onClick={() => handleInputChange(idea)}
          >
            {idea}
          </Button>
        ))}
      </div>
    </ScrollShadow>
  )
}
