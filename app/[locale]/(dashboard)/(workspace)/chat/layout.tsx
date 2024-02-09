import ChatSidebar from "@/components/chat/ChatSidebar"
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
