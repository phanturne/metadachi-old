// Source: https://www.nextui.pro/components/ai/prompt-inputs#component-prompt-input-with-suggestions-above

"use client"

import type { TextAreaProps } from "@nextui-org/react"

import React from "react"
import { Textarea } from "@nextui-org/react"
import { cn } from "@/app/lib/utils/utils"

const PromptInput = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ classNames = {}, ...props }, ref) => {
    return (
      <Textarea
        ref={ref}
        aria-label="Prompt"
        className="min-h-[40px]"
        classNames={{
          ...classNames,
          label: cn("hidden", classNames?.label),
          input: cn("py-0", classNames?.input)
        }}
        minRows={1}
        placeholder={`Ask anything. Type "@" for assistants, "/" for prompts, "#" for files, and "!" for tools.`}
        radius="lg"
        variant="bordered"
        {...props}
      />
    )
  }
)

export default PromptInput

PromptInput.displayName = "PromptInput"
