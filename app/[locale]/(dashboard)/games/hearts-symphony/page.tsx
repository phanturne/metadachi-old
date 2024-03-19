import ChatSidebar from "@/app/[locale]/(dashboard)/(workspace)/chat/components/ChatSidebar"
import { Box, Typography } from "@mui/joy"
import HeartsSymphonySidebar from "@/app/[locale]/(dashboard)/games/hearts-symphony/HeartsSymphonySidebar"
import Header from "@/app/components/ui/Header"

export default function HeartsSymphonyGamePage() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden"
      }}
    >
      <HeartsSymphonySidebar />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center"
        }}
      >
        <Header
          startContent={
            <Typography level="title-lg">{"Heart's Symphony"}</Typography>
          }
        />
      </Box>
    </Box>
  )
}
