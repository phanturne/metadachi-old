import Header from "@/components/Header"
import { QuickSettings } from "@/components/chat/quick-settings"
import { ChatSettingsPopup } from "@/components/chat/ChatSettingsPopup"
import { ChatScrollButtons } from "@/components/chat/chat-scroll-buttons"
import { Typography } from "@mui/joy"
import { ChatSecondaryButtons } from "@/components/chat/chat-secondary-buttons"
import { useContext } from "react"
import { ChatbotUIContext } from "@/context/context"
import { useScroll } from "@/lib/hooks/use-scroll"

export default function ChatHeader({ variant }: { variant: "new" | null }) {
  const { selectedChat } = useContext(ChatbotUIContext)

  const { scrollToBottom, isAtTop, isAtBottom, isOverflowing, scrollToTop } =
    useScroll()

  return (
    <>
      {variant === "new" ? (
        <Header
          startContent={<QuickSettings />}
          endContent={<ChatSettingsPopup />}
        />
      ) : (
        <Header
          startContent={
            <ChatScrollButtons
              isAtTop={isAtTop}
              isAtBottom={isAtBottom}
              isOverflowing={isOverflowing}
              scrollToTop={scrollToTop}
              scrollToBottom={scrollToBottom}
            />
          }
          middleContent={
            <Typography noWrap>{selectedChat?.name || "Chat"}</Typography>
          }
          endContent={<ChatSecondaryButtons />}
        />
      )}
    </>
  )
}
