import Header from "@/components/ui/Header"
import { ChatSettingsPopup } from "@/app/[locale]/(dashboard)/(workspace)/chat/_components/ChatSettingsPopup"
import { ScrollButtons } from "@/components/buttons/ScrollButtons"
import { Typography } from "@mui/joy"
import { ChatInfoButton } from "@/app/[locale]/(dashboard)/(workspace)/chat/_components/ChatInfoButton"
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
            <Typography noWrap>{selectedChat?.name || "Chat"}</Typography>
          }
          endContent={<ChatInfoButton />}
        />
      )}
    </>
  )
}
