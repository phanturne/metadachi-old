// Source: https://www.nextui.pro/components/ai/prompt-inputs#component-prompt-input-with-suggestions-above

"use client"

import type { TextAreaProps } from "@nextui-org/react"

import React from "react"
import { Textarea } from "@nextui-org/react"
import { cn } from "@/app/lib/utils/utils"
import { t } from "i18next"
import { useWindowSize } from "usehooks-ts"

const PromptInput = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ classNames = {}, ...props }, ref) => {
    const { width } = useWindowSize()

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
        placeholder={
          width > 800
            ? `Ask anything. Type "@" for assistants, "/" for prompts, "#" for files, and "!" for tools.`
            : `Ask anything. Type @  /  #  !`
        }
        radius="lg"
        variant="bordered"
        {...props}
      />
    )
  }
)

export default PromptInput

PromptInput.displayName = "PromptInput"
