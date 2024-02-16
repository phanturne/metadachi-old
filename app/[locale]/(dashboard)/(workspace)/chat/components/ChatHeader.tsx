import Header from "@/app/components/ui/Header"
import { ChatSettingsPopup } from "@/app/[locale]/(dashboard)/(workspace)/chat/components/ChatSettingsPopup"
import { ScrollButtons } from "@/app/components/buttons/ScrollButtons"
import { Typography } from "@mui/joy"
import { ChatInfoButton } from "@/app/[locale]/(dashboard)/(workspace)/chat/components/ChatInfoButton"
import { useContext } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { useScroll } from "@/app/lib/hooks/use-scroll"

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
            <Typography noWrap>{selectedChat?.name || "Chat"}</Typography>
          }
          endContent={<ChatInfoButton />}
        />
      )}
    </>
  )
}
