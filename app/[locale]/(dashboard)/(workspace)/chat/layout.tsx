import { Box } from "@mui/joy"
import ChatSidebar from "@/app/components/chat/ChatSidebar"

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
