import ChatSidebar from "@/app/[locale]/(dashboard)/(workspace)/chat/components/ChatSidebar"
import { Box } from "@mui/joy"

export default function ChatLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden"
      }}
    >
      <ChatSidebar />
      {children}
    </Box>
  )
}
