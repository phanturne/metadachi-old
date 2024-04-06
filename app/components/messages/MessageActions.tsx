import { MetadachiContext } from "@/app/lib/context"
import React, { FC, useContext, useEffect, useState } from "react"
import { Button, Tooltip } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

interface MessageActionsProps {
  isAssistant: boolean
  isLast: boolean
  isEditing: boolean
  isHovering: boolean
  onCopy: () => void
  onEdit: () => void
  onRegenerate: () => void
}

export const MessageActions: FC<MessageActionsProps> = ({
  isAssistant,
  isLast,
  isEditing,
  isHovering,
  onCopy,
  onEdit,
  onRegenerate
}) => {
  const { isGenerating } = useContext(MetadachiContext)

  const [showCheckmark, setShowCheckmark] = useState(false)

  const handleCopy = () => {
    onCopy()
    setShowCheckmark(true)
  }

  const handleForkChat = async () => {}

  // TODO: Remove duplicate logic since `use-copy-to-clipboard` already exists
  useEffect(() => {
    if (showCheckmark) {
      const timer = setTimeout(() => {
        setShowCheckmark(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [showCheckmark])

  return (isLast && isGenerating) || isEditing ? null : (
    <div className="flex gap-1">
      {/* Edit User Message Button */}
      {!isAssistant && isHovering && (
        <Tooltip content="Edit">
          <Button
            isIconOnly
            onClick={onEdit}
            size="sm"
            className="bg-transparent"
          >
            <Icon icon="solar:pen-linear" className="text-base" />
          </Button>
        </Tooltip>
      )}

      {/* Copy to Clipboard Button */}
      {(isHovering || isLast) && (
        <Tooltip content="Copy">
          <Button
            isIconOnly
            onClick={handleCopy}
            size="sm"
            className="bg-transparent"
          >
            {showCheckmark ? (
              <Icon icon="solar:check-circle-linear" className="text-base" />
            ) : (
              <Icon icon="solar:copy-linear" className="text-base" />
            )}
          </Button>
        </Tooltip>
      )}

      {/* Regenerate Message Button */}
      {isLast && (
        <Tooltip content="Regenerate">
          <Button
            isIconOnly
            onClick={onRegenerate}
            size="sm"
            className="bg-transparent"
          >
            <Icon icon="solar:refresh-linear" className="text-base" />
          </Button>
        </Tooltip>
      )}

      {/* {1 > 0 && isAssistant && <MessageReplies />} */}
    </div>
  )
}
