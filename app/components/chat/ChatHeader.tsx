import Header from "@/app/components/ui/Header"
import { ScrollButtons } from "@/app/components/buttons/ScrollButtons"
import { Box, Typography } from "@mui/joy"
import { useContext } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { useScroll } from "@/app/lib/hooks/use-scroll"
import { ChatSettingsPopup } from "@/app/components/chat/ChatSettingsPopup"
import { ChatInfoButton } from "@/app/components/chat/ChatInfoButton"

export default function ChatHeader({ variant }: { variant: "new" | null }) {
  const { selectedChat } = useContext(MetadachiContext)

  const { scrollToBottom, isAtTop, isAtBottom, isOverflowing, scrollToTop } =
    useScroll()

  return (
    <>
      {variant === "new" ? (
        <Header
          // startContent={<QuickSettings />}
          endContent={<ChatSettingsPopup />}
        />
      ) : (
        <Header
          startContent={
            <ScrollButtons
              isAtTop={isAtTop}
              isAtBottom={isAtBottom}
              isOverflowing={isOverflowing}
              scrollToTop={scrollToTop}
              scrollToBottom={scrollToBottom}
            />
          }
          middleContent={
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Typography noWrap>{selectedChat?.name || "Chat"}</Typography>
              <ChatInfoButton />
            </Box>
          }
          // endContent={<ChatInfoButton />}
        />
      )}
    </>
  )
}
