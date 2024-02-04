import ChatSidebar from "@/components/chat/ChatSidebar"

export default function ChatLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        overflow: "hidden"
      }}
    >
      <ChatSidebar />
      {children}
    </div>
  )
}
