import { Box, Typography } from "@mui/joy"
import Image from "next/image"
import * as React from "react"

export const NewChatContent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Image src="/metadachi.svg" alt="Metadachi Icon" width={50} height={50} />
      <Typography level="title-lg" sx={{ mt: 2, mb: 5 }}>
        How may I help you today?
      </Typography>
    </Box>
  )
}
