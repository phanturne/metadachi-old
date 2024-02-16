import { FC } from "react"
import { Box, IconButton } from "@mui/joy"
import { ArrowDownwardRounded, ArrowUpwardRounded } from "@mui/icons-material"

interface ScrollButtonsProps {
  isAtTop: boolean
  isAtBottom: boolean
  isOverflowing: boolean
  scrollToTop: () => void
  scrollToBottom: () => void
}

export const ScrollButtons: FC<ScrollButtonsProps> = ({
  isAtTop,
  isAtBottom,
  isOverflowing,
  scrollToTop,
  scrollToBottom
}) => {
  return (
    <Box sx={{ display: "flex" }}>
      {!isAtTop && isOverflowing && (
        <IconButton onClick={scrollToTop}>
          <ArrowUpwardRounded />
        </IconButton>
      )}

      {!isAtBottom && isOverflowing && (
        <IconButton onClick={scrollToBottom}>
          <ArrowDownwardRounded />
        </IconButton>
      )}
    </Box>
  )
}
