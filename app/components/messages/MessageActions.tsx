import { MetadachiContext } from "@/app/lib/context"
import React, { FC, useContext, useEffect, useState } from "react"
import { Box, IconButton, Tooltip } from "@mui/joy"
import {
  CheckRounded,
  ContentCopyRounded,
  EditRounded,
  RepeatRounded
} from "@mui/icons-material"

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

  useEffect(() => {
    if (showCheckmark) {
      const timer = setTimeout(() => {
        setShowCheckmark(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [showCheckmark])

  return (isLast && isGenerating) || isEditing ? null : (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {/* Edit User Message Button */}
      {!isAssistant && isHovering && (
        <Tooltip title="Edit" variant="outlined">
          <IconButton
            onClick={onEdit}
            size="sm"
            sx={{ "&:hover": { backgroundColor: "transparent" } }}
          >
            <EditRounded />
          </IconButton>
        </Tooltip>
      )}

      {/* Copy to Clipboard Button */}
      {(isHovering || isLast) && (
        <Tooltip title="Copy" variant="outlined">
          <IconButton
            onClick={handleCopy}
            size="sm"
            sx={{ "&:hover": { backgroundColor: "transparent" } }}
          >
            {showCheckmark ? <CheckRounded /> : <ContentCopyRounded />}
          </IconButton>
        </Tooltip>
      )}

      {/* Regenerate Message Button */}
      {isLast && (
        <Tooltip title="Regenerate" variant="outlined">
          <IconButton
            onClick={onRegenerate}
            size="sm"
            sx={{ "&:hover": { backgroundColor: "transparent" } }}
          >
            <RepeatRounded />
          </IconButton>
        </Tooltip>
      )}

      {/* {1 > 0 && isAssistant && <MessageReplies />} */}
    </Box>
  )
}
